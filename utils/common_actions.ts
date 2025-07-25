import { Page } from '@playwright/test';

export async function attachScreenshot(page: Page, testInfo: any, name = 'screenshot', options = {}) {
  const screenshot = await page.screenshot(options);
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}
