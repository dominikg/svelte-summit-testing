<script lang="ts">
	import Row from './Row.svelte';

	interface Props {
		guesses: string[];
		answers: string[];
		currentIndex: number;
		currentGuess: string;
		isPlaying: boolean;
		isBadGuess: boolean;
	}

	let { 
		guesses, 
		answers, 
		currentIndex, 
		currentGuess, 
		isPlaying, 
		isBadGuess 
	}: Props = $props();

</script>

<div class="grid" class:playing={isPlaying} class:bad-guess={isBadGuess}>
	{#each Array.from(Array(6).keys()) as row (row)}
		<Row 
			rowNumber={row}
			isCurrentRow={row === currentIndex}
			isBadGuess={isBadGuess}
			isPlaying={isPlaying}
			guess={guesses[row] ?? ''}
			answer={answers[row] ?? ''}
			{currentGuess}
		/>
	{/each}
</div>

<style>
	.grid {
		--width: min(100vw, 40vh, 380px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
</style>
