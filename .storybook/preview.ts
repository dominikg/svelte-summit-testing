import type { Preview } from '@storybook/sveltekit';
import '../src/app.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			options: {
				lightblue: { name: 'Light Blue', value: 'var(--color-bg-0)' }
			}
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
		}
	},
	initialGlobals: {
		backgrounds: 'lightblue'
	}
};

export default preview;
