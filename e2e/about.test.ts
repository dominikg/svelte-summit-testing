import {test,expect} from '@playwright/test';

test.describe('/about',()=>{
	test('does not use clientside javascript', async ({ request }) => {
		const response = await request.get('/about',{headers:{accept:'text/html'}});
		const html = (await response.body()).toString();
		expect(html).not.toContain('<script')
		expect(html).toContain('<body')
	})
	test('has a heading containing About',async ({page})=>{
		await page.goto('/about');
		await expect(page.getByRole('heading')).toContainText('About');
	})
})

