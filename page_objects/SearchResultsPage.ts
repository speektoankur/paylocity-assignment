import { Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async applyFilter(filterName: string) {
    await this.page.locator('a[aria-label="See more, Brands"]').click();
    await this.page.getByRole('link', { name: `Apply the filter ${filterName} to narrow results` }).click();
  }

  async sortByPriceDesc() {
    await this.page.locator('#s-result-sort-select').selectOption({ value: 'price-desc-rank' });
  }

  async selectFirstProduct() {
    await this.page.locator('div[data-cy="title-recipe"]').first().click();
    await this.page.waitForTimeout(2000);
  }
} 