import { Page, Locator } from '@playwright/test';

export async function attachScreenshot(page: Page, testInfo: any, name = 'screenshot', options = {}) {
  const screenshot = await page.screenshot(options);
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}

/**
 * Wait for element with retry mechanism for better reliability
 */
export async function waitForElementWithRetry(
  locator: Locator, 
  options: { state?: 'visible' | 'hidden' | 'attached' | 'detached', timeout?: number } = {}
) {
  const { state = 'visible', timeout = 30000 } = options;
  
  try {
    await locator.waitFor({ state, timeout });
  } catch (error) {
    // If first attempt fails, wait a bit and retry once
    await new Promise(resolve => setTimeout(resolve, 2000));
    await locator.waitFor({ state, timeout: timeout / 2 });
  }
}

/**
 * Click element with retry mechanism
 */
export async function clickWithRetry(locator: Locator, timeout = 30000) {
  try {
    await waitForElementWithRetry(locator, { timeout });
    await locator.click();
  } catch (error) {
    // If first attempt fails, wait and retry
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitForElementWithRetry(locator, { timeout: timeout / 2 });
    await locator.click();
  }
}

/**
 * Wait for page to be fully loaded and stable
 */
export async function waitForPageStability(page: Page, timeout = 30000) {
  await page.waitForLoadState('domcontentloaded', { timeout });
  await page.waitForLoadState('load', { timeout });
}
