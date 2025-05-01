import { describe, expect, it } from 'vitest';
import { Doubler } from './doubler.svelte.ts';

describe('doubler.svelte.ts', () => {
	it('should double initial value', () => {
		let value = $state(1);
		let doubler = new Doubler(() => value);
		expect(doubler.value).toBe(2);
	});
	it('should be reactive', () => {
		let value = $state(0);
		let doubler = new Doubler(() => value);
		expect(doubler.value).toBe(0);
		value = 2;
		expect(doubler.value).toBe(4);
	});
});
