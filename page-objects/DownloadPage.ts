import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class DownloadPage extends AbstractPage {
    readonly url: string;
    readonly cloudStoreLink: Locator;
    readonly downloadLink: Locator;
    readonly hostingPartnerLink: Locator;
    readonly softaculousLink: Locator;

    constructor(page: Page) {
        super(page);
        this.url = "https://www.opencart.com/index.php?route=cms/download";
        this.cloudStoreLink = page.locator('a[title="OpenCart CLoud"]');
        this.downloadLink = page.locator('a[title="Download OpenCart"]');
        this.hostingPartnerLink = page.locator('a[href*="a2hosting.com/opencart-hosting"]');
        this.softaculousLink = page.locator('a[href="https://www.softaculous.com/softaculous/apps/ecommerce/OpenCart"]');
    }

    async navigateToDownloadPage() {
        await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    }

    async verifyCloudStoreLink() {
        await expect(this.cloudStoreLink).toBeVisible();
        await expect(this.cloudStoreLink).toHaveAttribute("href", /subscription/);
    }

    async verifyDownloadLink() {
        await expect(this.downloadLink).toBeVisible();
        await expect(this.downloadLink).toHaveAttribute("href", /download_id=\d+/);
    }

    async verifyHostingPartnerLink() {
        const hostingLinks = await this.page.locator('a[href*="a2hosting.com/opencart-hosting"]').all();
        expect(hostingLinks.length).toBeGreaterThan(0);
    }

    async verifySoftaculousLink() {
        await expect(this.softaculousLink).toBeVisible();

        await this.softaculousLink.click();
        await this.page.waitForLoadState("networkidle");

        const expectedUrl = "https://softaculous.com/apps/ecommerce/opencart";
        const currentUrl = this.page.url();

        expect(currentUrl).toBe(expectedUrl);
    }
}
