import { test, expect } from '@playwright/test';
import { ExtensionsPage } from '../../page-objects/ExtensionsPage';

test.describe('Smoke Test: Product Page', () => {
    let extensionsPage: ExtensionsPage;

    test.beforeEach(async ({ page }) => {
        extensionsPage = new ExtensionsPage(page);
        await extensionsPage.navigateToExtensionsPage();
    });

    test('Product list is visible', async () => {
        const productList = extensionsPage.page.locator('#extension-list');
        await expect(productList).toBeVisible();
    });
});
