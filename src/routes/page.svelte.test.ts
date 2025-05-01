import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', () => {
		const {getByRole} = render(Page);
		expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
	});
});
