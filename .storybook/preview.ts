import type { Preview } from '@storybook/sveltekit';
import '../src/app.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			options: {
				lightblue: { name: 'Light Blue', value: 'var(--color-bg-0)' }
			}
		},
		initialGlobals: {
			backgrounds: { value: 'lightblue' }
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		},
		options: {
			storySort: (a, b) => {
				if (a.id === b.id) {
					return 0;
				}

				if (a.title.includes('Board/Cell')) {
					return -1;
				}
				if (b.title.includes('Board/Cell')) {
					return 1;
				}
				if (a.title.includes('Board/Row')) {
					return -1;
				}
				if (b.title.includes('Board/Row')) {
					return 1;
				}
				if (a.title.includes('Board/Grid')) {
					return -1;
				}
				if (b.title.includes('Board/Grid')) {
					return 1;
				}

				if (a.title.includes('Controls/Letter')) {
					return -1;
				}
				if (b.title.includes('Controls/Letter')) {
					return 1;
				}
				if (a.title.includes('Controls/Row')) {
					return -1;
				}
				if (b.title.includes('Controls/Row')) {
					return 1;
				}
				if (a.title.includes('Controls/Keyboard')) {
					return -1;
				}
				if (b.title.includes('Controls/Keyboard')) {
					return 1;
				}
				if (a.title.includes('Controls/Result')) {
					return -1;
				}
				if (b.title.includes('Controls/Result')) {
					return 1;
				}

				return a.title.localeCompare(b.title, undefined, { numeric: true });
			}
		}
	}
};

export default preview;
