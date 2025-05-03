import { defineConfig, type PlaywrightTestConfig } from '@playwright/test';
import {process} from 'node:process';
const E2E_BASE_URL = process.env.TEST_BASE_URL;
const localConfig: PlaywrightTestConfig = {
	webServer: [{
			command: 'npm run build && node build/index.js',
			env: { PORT: '4173' }, port: 4173,
		}],
}
const remoteConfig: PlaywrightTestConfig = {
	use: { baseURL: E2E_BASE_URL }
}
export default defineConfig({
	testDir: 'e2e',
	...(E2E_BASE_URL ? remoteConfig : localConfig)
});
