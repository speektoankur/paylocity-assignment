import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.amazon.in/', {waitUntil: 'domcontentloaded'});
  }

  async searchForProduct(product: string) {
    await this.page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
    await this.page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill(product);
    await this.page.getByRole('button', { name: 'Go', exact: true }).click();
  }
} 