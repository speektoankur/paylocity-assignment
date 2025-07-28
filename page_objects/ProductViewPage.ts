import { Page } from '@playwright/test';
import { waitForElementWithRetry, clickWithRetry } from '../utils/common_actions';
import { title } from 'process';

export class ProductViewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductTitle() {
    // Wait for the product title to be visible before getting its text
    const titleLocator = this.page.locator('span[id="productTitle"]');
    await waitForElementWithRetry(titleLocator);
    const title = await titleLocator.textContent();
    return title ? title.trim() : '';
  }

  async getProductPrice(){
    // Get the whole price part
    const wholePriceLocator = this.page.locator('#centerCol .a-price-whole');
    await waitForElementWithRetry(wholePriceLocator);
    const wholePrice = await wholePriceLocator.textContent();
   
    return wholePrice;
  }

  async addToCart() {
    // Wait for the add to cart button to be visible and enabled
    const addToCartButton = this.page.locator('#desktop_qualifiedBuyBox').getByRole('button', { name: 'Add to Cart' });
    await clickWithRetry(addToCartButton);
  }
} 