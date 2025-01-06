import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Footer tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('Check footer links in OpenCart section', async () => {
        const openCartLinks = [
            { text: "Features", url: "https://www.opencart.com/index.php?route=cms/feature" },
            { text: "OpenCart Cloud", url: "https://www.opencart.com/index.php?route=cloud/landing" },
            { text: "Showcase", url: "https://www.opencart.com/index.php?route=cms/showcase" },
            { text: "Demo", url: "https://www.opencart.com/index.php?route=cms/demo" },
        ];

        for (const link of openCartLinks) {
            await homePage.verifyFooterLink(homePage.footerOpenCartSection, link.text, link.url);
        }
    });

    test('Check footer links in Company section', async () => {
        const companyLinks = [
            { text: "Contact Us", url: "https://www.opencart.com/index.php?route=support/contact" },
            { text: "GDPR", url: "https://www.opencart.com/index.php?route=cms/gdpr" },
        ];

        for (const link of companyLinks) {
            await homePage.verifyFooterLink(homePage.footerCompanySection, link.text, link.url);
        }
    });

    test('Check footer links in Support section', async () => {
        const supportLinks = [
            { text: "Community Forum", url: "https://forum.opencart.com" },
            { text: "Dedicated Support", url: "https://dedicated.opencart.com" },
        ];

        for (const link of supportLinks) {
            await homePage.verifyFooterLink(homePage.footerSupportSection, link.text, link.url);
        }
    });

    test('Check footer links in Resources section', async () => {
        const resourcesLinks = [
            { text: "OpenCart Blog", url: "https://www.opencart.com/blog" },
            { text: "OpenCart Documentation", url: "https://docs.opencart.com" },
        ];

        for (const link of resourcesLinks) {
            await homePage.verifyFooterLink(homePage.footerResourcesSection, link.text, link.url);
        }
    });
});
