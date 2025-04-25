<script lang="ts">
	import Row from './Row.svelte';

	interface Props {
		classnames: Record<string, 'exact' | 'close' | 'missing'>;
		descriptions: Record<string, string>;
		submittable: boolean;
		onUpdate: (event: MouseEvent) => void;
	}

	let { classnames, descriptions, submittable, onUpdate }: Props = $props();

	const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
</script>

<div class="keyboard">
	<button data-key="enter" class:selected={submittable} disabled={!submittable}>enter</button>

	<button
		onclick={onUpdate}
		data-key="backspace"
		formaction="?/update"
		name="key"
		value="backspace"
	>
		back
	</button>

	{#each rows as letters (letters)}
		<Row {letters} {classnames} {descriptions} {submittable} {onUpdate} />
	{/each}
</div>

<style>
	.keyboard {
		--gap: 0.2rem;
		--size: min(8vw, 4vh, 40px); 
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: 100%;
	}

    .keyboard > button[data-key='enter'], 
	.keyboard > button[data-key='backspace'] {
		position: absolute;
		bottom: 0;
		width: calc(1.5 * var(--size));
		height: calc(1 / 3 * (100% - 2 * var(--gap)));
		text-transform: uppercase;
		font-size: calc(0.3 * var(--size));
		padding-top: calc(0.15 * var(--size));
		background-color: white;
		color: black;
		border: none;
		border-radius: 2px;
		margin: 0;
	}

	.keyboard > button[data-key='enter'] {
		right: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard > button[data-key='backspace'] {
		left: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard > button[data-key='enter']:disabled {
		opacity: 0.5;
	}

	.keyboard > button:focus {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
</style> 
