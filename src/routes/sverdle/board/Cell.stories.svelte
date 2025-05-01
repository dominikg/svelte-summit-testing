<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Cell from './Cell.svelte';

	const { Story } = defineMeta({
		title: 'Sverdle/Board/Cell',
		component: Cell,
		// @ts-expect-error -- will be fixed soon
		render: template,
		tags: ['autodocs'],
		args: {
			value: 'A',
			selected: false,
			exact: false,
			close: false,
			missing: false,
			disabled: false
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

{#snippet template(args)}
	<style>
		.container {
			width: 60px;
			height: 60px;
			--width: 600px;
			padding: 4rem;
		}
	</style>
	<div class="container">
		<Cell {...args} />
	</div>
{/snippet}

<Story name="Empty" args={{ value: '' }} />
<Story name="With Value" args={{ value: 'b' }} />
<Story name="Selected" args={{ value: 'c', selected: true }} />
<Story name="Exact Match" args={{ value: 'd', exact: true }} />
<Story name="Close Match" args={{ value: 'e', close: true }} />
<Story name="Missing" args={{ value: 'f', missing: true }} />
<Story name="Disabled" args={{ value: 'g', disabled: true }} />

<Story name="Selected Exact" args={{ value: 'h', selected: true, exact: true }} />
<Story name="Selected Close" args={{ value: 'i', selected: true, close: true }} />
<Story name="Selected Missing" args={{ value: 'j', selected: true, missing: true }} />
