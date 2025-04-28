import { describe, it, expect } from 'vitest';
import { sum } from './math.ts'
describe('sum', () => {
	it('adds 1 and 2 correctly', () => {
		expect(sum(1,2)).toBe(3);
	});
});
