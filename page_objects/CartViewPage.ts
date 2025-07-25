import { Page } from '@playwright/test';

export class CartViewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoCart() {
    await this.page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();
  }

  async getProductTitleOnCart() {
    await this.page.waitForSelector('.sc-item-product-title-cont', { timeout: 2000 });
    const raw = await this.page.locator('.sc-item-product-title-cont').innerText();
    // Get the first non-empty line (the actual product title)
    const title = raw.split('\n').map(line => line.trim()).find(line => line.length > 0) || '';
    return title;
  }
} 