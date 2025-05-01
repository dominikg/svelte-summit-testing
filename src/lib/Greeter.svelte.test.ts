import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { flushSync } from 'svelte';
import Greeter from './Greeter.svelte';
describe('Greeter.svelte', () => {
	it('shows name', () => {
		const { container } = render(Greeter, { props: { name: 'Svelte Summit' } });
		expect(container).toHaveTextContent('Svelte Summit');
	});
	it('can be tested with reactive state', () => {
		const props = $state({ name: 'Svelte Summit' });
		const { container } = render(Greeter, { props });
		expect(container).toHaveTextContent('Svelte Summit');
		props.name = 'Barcelona';
		flushSync();
		expect(container).not.toHaveTextContent('Svelte Summit');
		expect(container).toHaveTextContent('Barcelona');
	});
});
