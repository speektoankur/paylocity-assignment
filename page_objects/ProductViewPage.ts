import { Page } from '@playwright/test';

export class ProductViewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductTitle() {
    const title = await this.page.locator('span[id="productTitle"]').textContent();
    return title ? title.trim() : '';
  }

  async addToCart() {
    await this.page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  }
} 