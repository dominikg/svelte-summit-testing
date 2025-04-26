<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import Grid from './board/Grid.svelte';
	import Keyboard from './controls/Keyboard.svelte';
	import Result from './controls/Result.svelte';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	let { data, form = $bindable() }: Props = $props();

	/** Whether or not the user has won */
	let won = $derived(data.answers.at(-1) === 'xxxxx');

	/** The index of the current guess */
	let currentIndex = $derived(won ? -1 : data.answers.length);

	/** The current guess */
	let currentGuess = $derived(data.guesses[currentIndex] || '');

	/** Whether the current guess can be submitted */
	let submittable = $derived(currentGuess.length === 5);

	const { classnames, description } = $derived.by(() => {
		/**
		 * A map of classnames for all letters that have been guessed,
		 * used for styling the keyboard
		 */
		let classnames: Record<string, 'exact' | 'close' | 'missing'> = {};
		/**
		 * A map of descriptions for all letters that have been guessed,
		 * used for adding text for assistive technology (e.g. screen readers)
		 */
		let description: Record<string, string> = {};
		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];
			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];
				if (answer[i] === 'x') {
					classnames[letter] = 'exact';
					description[letter] = 'correct';
				} else if (!classnames[letter]) {
					classnames[letter] = answer[i] === 'c' ? 'close' : 'missing';
					description[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
		});
		return { classnames, description };
	});

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		event.preventDefault();
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');

		if (key === 'backspace') {
			currentGuess = currentGuess.slice(0, -1);
			if (form?.badGuess) form.badGuess = false;
		} else if (currentGuess.length < 5) {
			currentGuess += key;
		}
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		if (event.key === 'Enter' && !submittable) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', { cancelable: true, bubbles: true }));
	}
</script>

<svelte:window onkeydown={keydown} />

<svelte:head>
	<title>Sverdle</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<h1 class="visually-hidden">Sverdle</h1>

<form
	method="post"
	action="?/enter"
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<a class="how-to-play" href="/sverdle/how-to-play">How to play</a>

	<Grid
		guesses={data.guesses}
		answers={data.answers}
		{currentIndex}
		{currentGuess}
		isPlaying={!won}
		isBadGuess={form?.badGuess ?? false}
	/>

	<div class="controls">
		{#if won || data.answers.length >= 6}
			<Result {won} answer={data.answer ?? undefined} />
		{:else}
			<Keyboard {classnames} descriptions={description} {submittable} onUpdate={update} />
		{/if}
	</div>
</form>

<style>
	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
	}

	.how-to-play {
		color: var(--color-text);
	}

	.how-to-play::before {
		content: 'i';
		display: inline-block;
		font-size: 0.8em;
		font-weight: 900;
		width: 1em;
		height: 1em;
		padding: 0.2em;
		line-height: 1;
		border: 1.5px solid var(--color-text);
		border-radius: 50%;
		text-align: center;
		margin: 0 0.5em 0 0;
		position: relative;
		top: -0.05em;
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: min(18vh, 10rem);
	}
</style>
