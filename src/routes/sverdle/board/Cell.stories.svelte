<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Cell from './Cell.svelte';

	const defaultArgs = {
		value: 'a',
		selected: false,
		exact: false,
		close: false,
		missing: false,
		disabled: false
	};
	const { Story } = defineMeta({
		title: 'Sverdle/Board/Cell',
		component: Cell,
		render: template,
		args: defaultArgs,
		parameters: {
			layout: 'centered'
		},
		globals: {
			backgrounds: {
				value: 'lightblue'
			}
		}
	});
</script>

{#snippet template(args)}
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

<Story name="All" asChild>
	<style>
		.container.all-container {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			grid-gap: 0.2rem;
			margin: 0 0 0.2rem 0;
			width: 500px;
		}
	</style>
	<div class="container all-container">
		<Cell {...defaultArgs} value="" />
		<Cell {...defaultArgs} value="b" />
		<Cell {...defaultArgs} value="c" selected />
		<Cell {...defaultArgs} value="d" exact />
		<Cell {...defaultArgs} value="e" close />
		<Cell {...defaultArgs} value="f" missing />
		<Cell {...defaultArgs} value="g" disabled />
	</div>
</Story>

<style>
	.container {
		width: 60px;
		height: 60px;
		--width: 600px;
		padding: 4rem;
	}
</style>
