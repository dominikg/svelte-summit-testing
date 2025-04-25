<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { MediaQuery } from 'svelte/reactivity';

	interface Props {
		won: boolean;
		answer: string | undefined;
	}

	let { won, answer }: Props = $props();

	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
</script>

{#if !won && answer}
	<p>the answer was "{answer}"</p>
{/if}
<button data-key="enter" class="restart selected" formaction="?/restart">
	{won ? 'you won :)' : `game over :(`} play again?
</button>

{#if won}
	<div
		style="position: absolute; left: 50%; top: 30%; z-index: 1;"
		class="confetti-container"
		use:confetti={{
			particleCount: reducedMotion.current ? 0 : undefined,
			force: 0.7,
			stageWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
			stageHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	></div>
{/if}

<style>
	.restart {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 2px;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
</style>
