<script lang="ts">
	import Cell from './Cell.svelte';

	interface Props {
		rowNumber: number;
		isCurrentRow: boolean;
		isBadGuess: boolean;
		isPlaying: boolean;
		guess: string;
		answer: string;
		currentGuess: string;
	}

	let { rowNumber, isCurrentRow, isBadGuess, isPlaying, guess, answer, currentGuess }: Props =
		$props();
</script>

<h3 class="visually-hidden">Row {rowNumber + 1}</h3>
<div
	class="row"
	class:current={isCurrentRow}
	class:bad-guess={isCurrentRow && isBadGuess}
	class:playing={isCurrentRow && isPlaying}
>
	{#each Array.from(Array(5).keys()) as column (column)}
		{@const guessValue = isCurrentRow ? currentGuess : guess}
		{@const cellValue = guessValue?.[column]}
		{@const answerValue = answer?.[column]}
		<Cell
			value={cellValue}
			selected={isCurrentRow && column === guessValue.length}
			exact={answerValue === 'x'}
			close={answerValue === 'c'}
			missing={answerValue === '_'}
			disabled={!isCurrentRow}
		/>
	{/each}
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.row.current.bad-guess {
			animation: wiggle 0.5s;
		}
	}

	.row.current.playing {
		filter: drop-shadow(3px 3px 10px var(--color-bg-0));
	}

	@keyframes wiggle {
		0% {
			transform: translateX(0);
		}
		10% {
			transform: translateX(-2px);
		}
		30% {
			transform: translateX(4px);
		}
		50% {
			transform: translateX(-6px);
		}
		70% {
			transform: translateX(+4px);
		}
		90% {
			transform: translateX(-2px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
