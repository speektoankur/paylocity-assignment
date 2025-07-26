import { Page } from '@playwright/test';
import { clickWithRetry, waitForElementWithRetry, waitForPageStability } from '../utils/common_actions';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async applyFilter(filterName: string) {
    const seeMoreButton = this.page.locator('a[aria-label="See more, Brands"]');
    await clickWithRetry(seeMoreButton);
    
    const filterLink = this.page.getByRole('link', { name: `Apply the filter ${filterName} to narrow results` });
    await clickWithRetry(filterLink);
  }

  async sortByPriceDesc() {
    const sortSelect = this.page.locator('#s-result-sort-select');
    await waitForElementWithRetry(sortSelect);
    await sortSelect.selectOption({ value: 'price-desc-rank' });
  }

  async selectFirstProduct() {
    // Wait for the first product to be visible and clickable
    const firstProduct = this.page.locator('div[data-cy="title-recipe"]').first();
    await clickWithRetry(firstProduct);
    
    // Wait for navigation to complete
    await waitForPageStability(this.page);
  }
} 