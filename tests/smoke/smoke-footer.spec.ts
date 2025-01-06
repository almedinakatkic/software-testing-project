import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Smoke Test: Footer', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('Footer loads and is visible', async () => {
        await homePage.footerOpenCartSection.waitFor({ state: 'visible' });
        await homePage.footerCompanySection.waitFor({ state: 'visible' });
        await homePage.footerSupportSection.waitFor({ state: 'visible' });
        await homePage.footerResourcesSection.waitFor({ state: 'visible' });
    });
});
