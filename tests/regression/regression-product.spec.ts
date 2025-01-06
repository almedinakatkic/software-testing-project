import { test, expect } from "@playwright/test";
import { ExtensionsPage } from "../../page-objects/ExtensionsPage";

test.describe("Regression Tests: Extensions Product Validation", () => {
  let extensionsPage: ExtensionsPage;

  test.beforeEach(async ({ page }) => {
    extensionsPage = new ExtensionsPage(page);
    await extensionsPage.navigateToExtensionsPage();
  });

  test("Validate that all displayed products have necessary details", async ({ page }) => {
    const products = await page.locator("#extension-list .col-md-4");

    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);

      const title = await product.locator(".extension-name p a").textContent();
      expect(title).toBeTruthy();

      const price = await product.locator(".extension-name p span").textContent();
      expect(price).toBeTruthy();

      const description = await product.locator(".extension-description").textContent();
      expect(description).toBeTruthy();

      const reviews = await product.locator(".text-right span").textContent();
      expect(reviews).toBeTruthy();
    }
  });

  test("Validate products with at least one review", async ({ page }) => {
    const products = await page.locator("#extension-list .col-md-4");

    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);

      const reviewsText = await product.locator(".text-right span").textContent();
      const reviewsCount = parseInt(reviewsText || "0");

      if (reviewsCount > 0) {
        expect(reviewsCount).toBeGreaterThan(0);
      }
    }
  });
});
