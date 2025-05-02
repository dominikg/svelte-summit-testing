<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Letter from './Letter.svelte';
	import { expect, fn } from 'storybook/test';

	const onUpdate = fn().mockName('onUpdate');

	const { Story } = defineMeta({
		title: 'Sverdle/Controls/Letter',
		component: Letter,
		args: {
			letter: 'q',
			classname: undefined,
			submittable: false,
			desc: undefined,
			onUpdate
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

<Story name="Default" />
<Story name="Missing" args={{ letter: 'w', classname: 'missing' }} />
<Story name="Close" args={{ letter: 'e', classname: 'close' }} />
<Story name="Exact" args={{ letter: 'r', classname: 'exact' }} />
<Story
	name="Clicked"
	args={{ letter: 't', classname: 'exact' }}
	play={({ canvas }) => {
		const button = canvas.getByRole('button');
		button?.click();
		expect(onUpdate).toHaveBeenCalled();
	}}
/>
<Story name="Submittable" args={{ letter: 'y', submittable: true }} />
<Story name="Submittable Missing" args={{ letter: 'u', classname: 'missing', submittable: true }} />
<Story name="Submittable Close" args={{ letter: 'i', classname: 'close', submittable: true }} />
<Story name="Submittable Exact" args={{ letter: 'o', classname: 'exact', submittable: true }} />

<Story name="All" asChild>
	<div>
		<Letter letter="q" submittable={false} classname={undefined} desc={undefined} {onUpdate} />
		<Letter letter="w" classname="missing" submittable={false} desc={undefined} {onUpdate} />
		<Letter letter="e" classname="close" submittable={false} desc={undefined} {onUpdate} />
		<Letter letter="r" classname="exact" submittable={false} desc={undefined} {onUpdate} />
	</div>
	<div>
		<Letter letter="t" submittable={true} classname={undefined} desc={undefined} {onUpdate} />
		<Letter letter="y" classname="missing" submittable={true} desc={undefined} {onUpdate} />
		<Letter letter="u" classname="close" submittable={true} desc={undefined} {onUpdate} />
		<Letter letter="i" classname="exact" submittable={true} desc={undefined} {onUpdate} />
	</div>
</Story>
