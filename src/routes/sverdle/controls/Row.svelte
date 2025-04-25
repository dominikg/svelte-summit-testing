<script lang="ts">
	import Letter from './Letter.svelte';

	interface Props {
		letters: string;
		classnames: Record<string, 'exact' | 'close' | 'missing'>;
		descriptions: Record<string, string>;
		submittable: boolean;
		onUpdate: (event: MouseEvent) => void;
	}

	let { letters, classnames, descriptions, submittable, onUpdate }: Props = $props();
</script>

<div class="row">
	{#each letters as letter, index (index)}
		<Letter 
			{letter} 
			classname={classnames[letter]} 
			desc={descriptions[letter]} 
			{submittable} 
			{onUpdate} 
		/>
	{/each}
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
		gap: 0.2rem;
		flex: 1;
	}
</style>
