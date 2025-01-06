import { test, expect } from '@playwright/test';
import { ExtensionsPage } from '../../page-objects/ExtensionsPage';

test.describe('Resgression Tests: Search Functionality in Extensions Page', () => {
  let extensionsPage: ExtensionsPage;

  test.beforeEach(async ({ page }) => {
    extensionsPage = new ExtensionsPage(page);
    await extensionsPage.navigateToExtensionsPage();
  });

  test('Verify search functionality works - positive test', async () => {
    const keyword = 'PayPal';
    await extensionsPage.searchExtension(keyword);

    const descriptions = await extensionsPage.getExtensionDescriptions();
    expect(descriptions.length).toBeGreaterThan(0);

    let matchFound = false;
    for (const desc of descriptions) {
      if (desc.toLowerCase().includes(keyword.toLowerCase())) {
        matchFound = true;
        break;
      }
    }
    expect(matchFound).toBeTruthy();
  });

  test('Verify search functionality works - negative test', async () => {
    const invalidKeyword = 'NonExistentExtension123';
    await extensionsPage.searchExtension(invalidKeyword);

    const descriptions = await extensionsPage.getExtensionDescriptions();
    // Assert that no descriptions are returned
    expect(descriptions.length).toBe(0);
  });
});
