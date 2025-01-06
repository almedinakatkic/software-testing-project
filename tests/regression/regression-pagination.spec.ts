import { test, expect } from "@playwright/test";
import { ExtensionsPage } from "../../page-objects/ExtensionsPage";

test.describe("Regression Test: Pagination in Product Display", () => {
  let extensionsPage: ExtensionsPage;

  test.beforeEach(async ({ page }) => {
    extensionsPage = new ExtensionsPage(page);
    await extensionsPage.navigateToExtensionsPage();
  });

  test("Pagination works correctly", async () => {
    const initialPageNumber = await extensionsPage.getCurrentPageNumber();
    expect(initialPageNumber).toBe(1);

    await extensionsPage.goToNextPage();
    const nextPageNumber = await extensionsPage.getCurrentPageNumber();
    expect(nextPageNumber).toBe(2);

    const extensionCount = await extensionsPage.getExtensionListCount();
    expect(extensionCount).toBeGreaterThan(0);

    await extensionsPage.goToPreviousPage();
    const backToFirstPageNumber = await extensionsPage.getCurrentPageNumber();
    expect(backToFirstPageNumber).toBe(1);
  });
});
