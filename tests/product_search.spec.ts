import { test, expect } from '@playwright/test';
import { HomePage } from '../page_objects/HomePage';
import { SearchResultsPage } from '../page_objects/SearchResultsPage';
import { ProductViewPage } from '../page_objects/ProductViewPage';
import { CartViewPage } from '../page_objects/CartViewPage';
import { attachScreenshot } from '../utils/common_actions';

// Data-driven filter values
const filterValues = ['Noise', 'boAt', 'Pebble'];

test.describe('Product Search with Filters', () => {
  for (const filterValue of filterValues) {
    test(`should search and filter products with filter: ${filterValue}`, async ({ page }) => {
      test.setTimeout(10000);
      test.slow();
      const homePage = new HomePage(page);
      const searchResultsPage = new SearchResultsPage(page);
      const productViewPage = new ProductViewPage(page);
      const cartViewPage = new CartViewPage(page);

      await homePage.goto();
      // Home Page
      await homePage.searchForProduct('Smartwatches');

      // Search Results Page
      await searchResultsPage.applyFilter(filterValue);
      await page.goto(page.url()+'&low-price=1000&high-price=5000'); // Adding Query Paremeter to URL for Price Filter
      await searchResultsPage.sortByPriceDesc();
      await page.waitForTimeout(2000);
      await attachScreenshot(page, test.info(), 'PriceFilterAndSort View');
      await page.waitForTimeout(5000);
      await searchResultsPage.selectFirstProduct();
      await page.waitForTimeout(5000);

      // Product View Page
      const productTitle = await productViewPage.getProductTitle();
      await attachScreenshot(page, test.info(), 'Product View Screen');
      await productViewPage.addToCart();
      await cartViewPage.gotoCart();

      // Cart View Page
      const productTitleOnCart = await cartViewPage.getProductTitleOnCart();
      expect(productTitle).toEqual(productTitleOnCart);
    });
  }
});

test.afterEach(async ({ page }, testInfo) => {
  if (page) {
    await attachScreenshot(page, testInfo, 'LastStep Capture', { fullPage: true });
  }
});