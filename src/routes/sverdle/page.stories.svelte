<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Page from './+page.svelte';
	import type { ActionData, PageData } from './$types';
	import { expect, fn, userEvent } from 'storybook/test';
	import { Game } from './game';
	import Layout from '../+layout.svelte';

	const words = [
		'admin',
		'barca',
		'books',
		'barca',
		'ducks',
		'earth',
		'event',
		'grape',
		'glory',
		'habit',
		'jeppe',
		'props',
		'runes',
		'state',
		'store',
		'story',
		'table',
		'tyros'
	];

	let form: NonNullable<ActionData> = $state({
		badGuess: false
	});
	let data: PageData = $state({
		guesses: ['', '', '', '', '', ''],
		answers: [],
		answer: null
	});
	let navigateFn = fn().mockName('navigate');

	// mimic the server-side action (+page.server.ts) that usually handles the form submission
	let handleSubmit = fn((event: SubmitEvent) => {
		const formElement = event.target as HTMLFormElement;
		const formData = new FormData(formElement, event.submitter);
		const action =
			event.submitter?.getAttribute('formaction') ?? new URL(formElement.action).search;

		switch (action) {
			case '?/enter': {
				const guess = formData.getAll('guess') as string[];
				let game = new Game({
					serialized: Game.serialize({
						...data,
						index: words.indexOf(data.answer ?? 'story')
					}),
					words: words,
					allowed: new Set(words)
				});
				if (!game.enter(guess)) {
					form.badGuess = true;
				}
				data = {
					guesses: game.guesses,
					answers: game.answers,
					answer: game.answers.length >= 6 ? game.answer : null
				};
				break;
			}
			case '?/restart': {
				data = {
					guesses: ['', '', '', '', '', ''],
					answers: [],
					answer: null
				};
				break;
			}
		}
	});

	const { Story } = defineMeta({
		//@ts-expect-error -- typings are wrong..
		render: template,
		args: {
			initialGuesses: ['', '', '', '', '', ''],
			answer: 'story'
		},
		beforeEach: ({ args }: { args: { initialGuesses: string[]; answer: string } }) => {
			const { initialGuesses, answer } = args;
			const game = new Game({
				serialized: Game.serialize({
					guesses: initialGuesses,
					answers: [],
					index: words.indexOf(answer ?? 'story')
				}),
				words: words,
				allowed: new Set(words)
			});
			// populates the game with initial answers based on guesses
			args.initialGuesses?.filter(Boolean).forEach((guess) => {
				game.enter(guess.split(''));
			});
			form.badGuess = false;
			data = {
				guesses: game.guesses,
				answers: game.answers,
				answer: game.answers.length >= 6 ? game.answer : null
			};
		},
		parameters: {
			sveltekit_experimental: {
				forms: {
					enhance: handleSubmit
				},
				hrefs: {
					'.*': { callback: navigateFn, asRegex: true }
				}
			}
		}
	});
</script>

{#snippet template()}
	<Page {form} {data} />
{/snippet}

<Story name="Initial Game" />

<Story name="With Guesses" args={{ initialGuesses: ['runes', 'props', 'barca', '', '', ''] }} />

<Story
	name="Won"
	args={{ initialGuesses: ['runes', 'props', 'barca', '', '', ''], answer: 'barca' }}
/>

<Story
	name="Lost"
	args={{ initialGuesses: ['runes', 'props', 'event', 'glory', 'store', 'tyros'], answer: 'story' }}
/>

<Story
	name="Typed Guesses"
	play={async ({ canvas, canvasElement }) => {
		const guesses = ['books', 'props', 'barca', 'glory', 'story'];
		for (const guess of guesses) {
			for (const letter of guess.split('')) {
				await userEvent.type(canvasElement, letter);
			}
			await userEvent.keyboard('{enter}');
		}
		await expect(await canvas.getByText(/you won/i)).toBeInTheDocument();
	}}
/>

<Story
	name="Clicked Guesses"
	play={async ({ canvas }) => {
		const guesses = ['props', 'runes', 'barca', 'glory', 'store', 'tyros'];
		for (const guess of guesses) {
			for (const letter of guess.split('')) {
				await userEvent.click(canvas.getByLabelText(new RegExp(`^${letter}(\\s|$)`, 'i'))!);
			}
			await userEvent.click(canvas.getByLabelText('enter')!);
		}
		await expect(await canvas.getByText('the answer was "story"')).toBeInTheDocument();
		await expect(await canvas.getByText(/game over/i)).toBeInTheDocument();
	}}
/>

<Story
	name="In Layout"
	args={{ initialGuesses: ['runes', 'props', 'barca', '', '', ''] }}
	parameters={{
		layout: 'fullscreen'
	}}
	play={async ({ canvas, step }) => {
		await step('Navigate to home', async () => {
			await userEvent.click(canvas.getByRole('link', { name: /home/i }));
			await expect(navigateFn).toHaveBeenCalledWith('/', expect.anything());
		});
		await step('Navigate to about', async () => {
			await userEvent.click(canvas.getByRole('link', { name: /about/i }));
			await expect(navigateFn).toHaveBeenCalledWith('/about', expect.anything());
		});
		await step('Navigate to sverdle', async () => {
			await userEvent.click(canvas.getByRole('link', { name: /sverdle/i }));
			await expect(navigateFn).toHaveBeenCalledWith('/sverdle', expect.anything());
		});
		await step('Navigate to how to play', async () => {
			await userEvent.click(canvas.getByRole('link', { name: /how to play/i }));
			await expect(navigateFn).toHaveBeenCalledWith('/sverdle/how-to-play', expect.anything());
		});
		await step('Navigate to svelte.dev/docs/kit', async () => {
			await userEvent.click(canvas.getByRole('link', { name: 'svelte.dev/docs/kit' }));
			await expect(navigateFn).toHaveBeenCalledWith(
				'https://svelte.dev/docs/kit',
				expect.anything()
			);
		});
	}}
>
	{#snippet template()}
		<Layout>
			<Page {form} {data} />
		</Layout>
	{/snippet}
</Story>
