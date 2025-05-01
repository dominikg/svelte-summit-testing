<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Grid from './Grid.svelte';

	const { Story } = defineMeta({
		title: 'Sverdle/Board/Grid',
		component: Grid,
		// @ts-expect-error -- will be fixed soon
		render: template,
		tags: ['autodocs'],
		args: {
			guesses: ['ready', '', '', '', '', ''],
			answers: ['_c__x', '', '', '', '', ''],
			currentIndex: 1,
			currentGuess: '',
			isPlaying: true,
			isBadGuess: false
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

{#snippet template(args)}
	<style>
		.container {
			width: min(100vw, 40vh, 380px);
			height: calc(min(100vw, 40vh, 380px) * 1.2);
			--width: min(100vw, 40vh, 380px);
		}
	</style>
	<div class="container">
		<Grid {...args} />
	</div>
{/snippet}

<Story
	name="Empty"
	args={{
		guesses: ['', '', '', '', '', ''],
		answers: ['', '', '', '', '', ''],
		currentIndex: 0,
		currentGuess: '',
		isPlaying: true,
		isBadGuess: false
	}}
/>

<Story
	name="With Guess Submitted"
	args={{
		guesses: ['audio', '', '', '', '', ''],
		answers: ['_c__x', '', '', '', '', ''],
		currentIndex: 1,
		currentGuess: '',
		isPlaying: true
	}}
/>

<Story
	name="Mid Game"
	args={{
		guesses: ['audio', 'smile', 'crane', '', '', ''],
		answers: ['_c__x', 'xc___', '_xx_c', '', '', ''],
		currentIndex: 3,
		currentGuess: 'tr',
		isPlaying: true
	}}
/>

<Story
	name="Bad Guess"
	args={{
		guesses: ['audio', 'smile', '', '', '', ''],
		answers: ['_c__x', '', '', '', '', ''],
		currentIndex: 2,
		currentGuess: 'chair',
		isPlaying: true,
		isBadGuess: true
	}}
/>

<Story
	name="Won"
	args={{
		guesses: ['audio', 'smile', 'story', '', '', ''],
		answers: ['_c__x', 'xc___', 'xxxxx', '', '', ''],
		currentIndex: undefined,
		currentGuess: '',
		isPlaying: false
	}}
/>

<Story
	name="Lost"
	args={{
		guesses: ['audio', 'smile', 'crane', 'table', 'rails', 'boost'],
		answers: ['_c__x', 'xc___', '_xx_c', 'c____', 'c_x__', '_x___'],
		currentIndex: undefined,
		currentGuess: '',
		isPlaying: false
	}}
/>
