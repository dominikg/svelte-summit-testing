<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Keyboard from './Keyboard.svelte';
	import { fn } from 'storybook/test';
	// Keyboard uses Row and Letter internally, but they don't need to be imported here.

	const { Story } = defineMeta({
		title: 'Sverdle/Controls/Keyboard',
		component: Keyboard,
		args: {
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

<Story name="Initial" />

<Story
	name="With Classnames"
	args={{
		classnames: {
			s: 'exact',
			v: 'exact',
			e: 'exact',
			l: 'exact',
			t: 'exact',
			o: 'close',
			r: 'close',
			y: 'close',
			b: 'close',
			k: 'close'
		},
		descriptions: {
			s: 'correct',
			v: 'correct',
			e: 'correct',
			l: 'correct',
			t: 'correct',
			o: 'present',
			r: 'present',
			y: 'present',
			b: 'present',
			k: 'present'
		}
	}}
/>

<Story
	name="Blast"
	args={{
		classnames: {
			q: 'missing',
			w: 'missing',
			o: 'missing',
			p: 'missing',
			a: 'missing',
			l: 'missing',
			z: 'missing',
			m: 'missing',

			r: 'close',
			u: 'close',
			d: 'close',
			j: 'close',
			b: 'close',
			c: 'close',

			t: 'exact',
			y: 'exact',
			f: 'exact',
			g: 'exact',
			h: 'exact',
			v: 'exact'
		}
	}}
/>

<Story
	name="Checkers"
	args={{
		classnames: {
			q: 'exact',
			w: 'close',
			e: 'exact',
			r: 'close',
			t: 'exact',
			y: 'close',
			u: 'exact',
			i: 'close',
			o: 'exact',
			p: 'close',
			a: 'close',
			s: 'exact',
			d: 'close',
			f: 'exact',
			g: 'close',
			h: 'exact',
			j: 'close',
			k: 'exact',
			l: 'close',
			z: 'close',
			x: 'exact',
			c: 'close',
			v: 'exact',
			b: 'close',
			n: 'exact'
		}
	}}
/>

<Story
	name="Submittable"
	args={{
		submittable: true
	}}
/>
