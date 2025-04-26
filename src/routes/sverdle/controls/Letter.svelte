<script lang="ts">
	interface Props {
		letter: string;
		classname: 'exact' | 'close' | 'missing' | undefined;
		desc: string | undefined;
		submittable: boolean;
		onUpdate: (event: MouseEvent) => void;
	}

	let { letter, classname, desc, submittable, onUpdate }: Props = $props();
</script>

<button
	onclick={onUpdate}
	data-key={letter}
	class={classname}
	disabled={submittable}
	formaction="?/update"
	name="key"
	value={letter}
	aria-label="{letter} {desc || ''}"
>
	{letter}
</button>

<style>
	button {
		--size: min(8vw, 4vh, 40px);
		background-color: white;
		color: black;
		width: var(--size);
		border: none;
		border-radius: 2px;
		font-size: calc(var(--size) * 0.5);
		margin: 0;
	}

	button.exact {
		background: var(--color-theme-2);
		color: white;
	}

	button.missing {
		opacity: 0.5;
	}

	button.close {
		border: 2px solid var(--color-theme-2);
	}

	button:focus {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
</style>
