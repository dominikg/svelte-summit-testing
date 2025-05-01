<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Row from './Row.svelte';

	const { Story } = defineMeta({
		title: 'Sverdle/Board/Row',
		component: Row,
		// @ts-expect-error -- will be fixed soon
		render: template,
		tags: ['autodocs'],
		args: {
			rowNumber: 0,
			isCurrentRow: false,
			isBadGuess: false,
			isPlaying: true,
			guess: '',
			answer: '_____',
			currentGuess: ''
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

{#snippet template(args)}
	<style>
		.container {
			width: 300px;
			--width: 600px;
		}
	</style>
	<div class="container">
		<Row {...args} />
	</div>
{/snippet}

<Story
	name="Empty Current"
	args={{
		rowNumber: 1,
		isCurrentRow: true,
		currentGuess: '',
		answer: '_____'
	}}
/>

<Story
	name="Empty Previous"
	args={{
		rowNumber: 0,
		isCurrentRow: false,
		guess: '',
		answer: '_____'
	}}
/>

<Story
	name="Partial Current"
	args={{
		rowNumber: 2,
		isCurrentRow: true,
		currentGuess: 'sto',
		answer: '_____'
	}}
/>

<Story
	name="Filled Current (Not Submitted)"
	args={{
		rowNumber: 3,
		isCurrentRow: true,
		currentGuess: 'chair',
		answer: '_____'
	}}
/>

<Story
	name="Submitted Correct"
	args={{
		rowNumber: 0,
		isCurrentRow: false,
		guess: 'story',
		answer: 'xxxxx'
	}}
/>

<Story
	name="Submitted Mixed"
	args={{
		rowNumber: 1,
		isCurrentRow: false,
		guess: 'table',
		answer: '_c_x_'
	}}
/>

<Story
	name="Submitted Incorrect"
	args={{
		rowNumber: 2,
		isCurrentRow: false,
		guess: 'admin',
		answer: '_____'
	}}
/>

<Story
	name="Bad Guess"
	args={{
		rowNumber: 4,
		isCurrentRow: true,
		isBadGuess: true,
		currentGuess: 'jeppe',
		answer: '_____'
	}}
/>

<Story
	name="Not Playing (Current Row)"
	args={{
		rowNumber: 5,
		isCurrentRow: true,
		isPlaying: false,
		currentGuess: 'story',
		answer: '_____'
	}}
/>

<Story
	name="Not Playing (Previous Row)"
	args={{
		rowNumber: 4,
		isCurrentRow: false,
		isPlaying: false,
		guess: 'books',
		answer: '_c_x_'
	}}
/>
