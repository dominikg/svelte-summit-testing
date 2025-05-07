<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Result from './Result.svelte';

	const { Story } = defineMeta({
		title: 'Sverdle/Controls/Result',
		component: Result,
		render: template,
		args: {
			won: false,
			answer: 'story'
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

{#snippet template(args)}
	<style>
		.container {
			text-align: center;
			justify-content: center;
			height: min(18vh, 10rem);
		}
	</style>
	<div class="container">
		<Result {...args} />
	</div>
{/snippet}

<Story name="Lost" args={{ won: false }} />

<Story
	name="Won"
	args={{
		won: true
	}}
/>
