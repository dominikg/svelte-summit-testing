import {test,expect} from '@playwright/test';

test.describe('/api/data.json',()=>{
	test('returns message', async ({ request }) => {
		const response = await request.get('/api/data.json');
		const data = await response.json();
		expect(data.message).toBe('Hello Svelte Summit')
	})
})
