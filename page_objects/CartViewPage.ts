import { Page } from '@playwright/test';
import { clickWithRetry, waitForElementWithRetry, waitForPageStability } from '../utils/common_actions';

export class CartViewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoCart() {
    // Wait for the cart button to be visible and clickable
    const cartButton = this.page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' });
    await clickWithRetry(cartButton);
    
    // Wait for cart page to load
    await waitForPageStability(this.page);
  }

  async getProductTitleOnCart() {
    // Wait for the product title container to be visible with increased timeout
    const titleContainer = this.page.locator('.sc-item-product-title-cont');
    await waitForElementWithRetry(titleContainer);
    
    const raw = await titleContainer.innerText();
    // Get the first non-empty line (the actual product title)
    const title = raw.split('\n').map(line => line.trim()).find(line => line.length > 0) || '';
    return title;
  }
} 