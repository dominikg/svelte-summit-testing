<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Page from './+page.svelte';
	import Layout from '../../+layout.svelte';

	const { Story } = defineMeta({
		component: Page
	});
</script>

<Story name="Isolated" />

<Story name="In Layout" parameters={{ layout: 'fullscreen' }} asChild>
	<Layout>
		<Page />
	</Layout>
</Story>
