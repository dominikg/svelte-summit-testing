import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Result from './Result.svelte';
describe('Result.svelte', () => {
	it('celebrates winning', () => {
		const { container, getByRole } = render(Result, { props: { won: true } });
		const button = getByRole('button');
		expect(button).toHaveTextContent('you won :)');
		expect(container.querySelector('.confetti-container')).toBeInTheDocument();
	});
	it('shows answer when losing', () => {
		const { container, getByRole } = render(Result, { props: { won: false, answer: '42' } });
		const button = getByRole('button');
		expect(button).toHaveTextContent('game over :(');
		expect(container).toHaveTextContent('the answer was "42"');
	});
});
