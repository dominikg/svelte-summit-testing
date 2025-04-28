import { describe, it, expect } from 'vitest';
import { sum, divide } from './math.ts';

describe('sum', () => {
	it('adds 1 and 2', () => {
		expect(sum(1, 2)).toBe(3);
	});
	it('works with negative numbers', () => {
		expect(sum(-1, -1)).toBe(-2);
	});
});
describe('divide', () => {
	it('divides 1 by 2', () => {
		expect(divide(1, 2)).toBe(0.5);
	});
	it('throws for division by 0', () => {
		expect(() => divide(1, 0)).toThrow();
	});
});
