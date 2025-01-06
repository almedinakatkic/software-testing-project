import { test, expect } from '@playwright/test';
import { ExtensionsPage } from '../../page-objects/ExtensionsPage';

test.describe('Smoke Test: Search', () => {
    let extensionsPage: ExtensionsPage;

    test.beforeEach(async ({ page }) => {
        extensionsPage = new ExtensionsPage(page);
        await extensionsPage.navigateToExtensionsPage();
    });

    test('Search bar is functional', async () => {
        await extensionsPage.searchInput.waitFor({ state: 'visible' });
        await extensionsPage.searchExtension('Test');
        const results = await extensionsPage.getExtensionDescriptions();
        expect(results.length).toBeGreaterThan(0);
    });
});
