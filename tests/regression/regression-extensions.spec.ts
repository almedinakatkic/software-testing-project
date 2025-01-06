import { test, expect } from '@playwright/test';
import { ExtensionsPage } from '../../page-objects/ExtensionsPage';

test.describe('Regression Tests: OpenCart Extensions Filters', () => {
  let extensionsPage: ExtensionsPage;

  test.beforeEach(async ({ page }) => {
    extensionsPage = new ExtensionsPage(page);
    await extensionsPage.navigateToExtensionsPage();
  });

  test('Sorting filter: sort by name', async () => {
    await extensionsPage.selectSortBy('Name');
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('Filter by price: free', async () => {
    await extensionsPage.filterByPrice('Free');
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('Filter by category: themes', async () => {
    await extensionsPage.filterByCategory('Themes');
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('Filter by OpenCart version: 4.0.2.3', async () => {
    await extensionsPage.filterByVersion('4.0.2.3');
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('Filter by rating: 4 stars and up', async () => {
    await extensionsPage.filterByRating(4);
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });

  test('Filter by developed by: OpenCart partners', async () => {
    await extensionsPage.filterByDeveloper('OpenCart Partners');
    const extensions = await extensionsPage.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  });
});
