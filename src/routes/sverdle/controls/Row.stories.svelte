<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Row from './Row.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Sverdle/Controls/Row',
		component: Row,
		args: {
			letters: 'qwertyuiop',
			classnames: {},
			descriptions: {},
			submittable: false,
			onUpdate: fn().mockName('onUpdate')
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

<Story
	name="Top Row"
	args={{
		letters: 'qwertyuiop'
	}}
/>

<Story
	name="Middle Row"
	args={{
		letters: 'asdfghjkl'
	}}
/>

<Story
	name="Bottom Row"
	args={{
		letters: 'zxcvbnm'
	}}
/>

<Story
	name="With Classnames"
	args={{
		letters: 'asdfghjkl',
		classnames: {
			a: 'exact',
			d: 'exact',
			g: 'close',
			h: 'close',
			k: 'missing',
			l: 'missing'
		},
		descriptions: {
			a: 'correct',
			d: 'correct',
			k: 'absent',
			l: 'absent'
		}
	}}
/>

<Story
	name="Submittable"
	args={{
		letters: 'asdfghjkl',
		classnames: {
			a: 'exact',
			d: 'exact',
			g: 'close',
			h: 'close',
			k: 'missing',
			l: 'missing'
		},
		descriptions: {
			a: 'correct',
			d: 'correct',
			k: 'absent',
			l: 'absent'
		},
		submittable: true
	}}
/>
