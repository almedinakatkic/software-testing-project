import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class DemoPage extends AbstractPage {
    readonly url: string;
    readonly pageHeader: Locator;
    readonly storeFrontLink: Locator;
    readonly adminLink: Locator;
    readonly documentationLink: Locator;

    constructor(page: Page) {
        super(page);
        this.url = "https://www.opencart.com/index.php?route=cms/demo";
        this.pageHeader = page.locator(".page-header h1");
        this.storeFrontLink = page.locator('a.box-overlay:has-text("View Store Front")');
        this.adminLink = page.locator('a.box-overlay:has-text("View Administration")');
        this.documentationLink = page.locator('a.btn-primary:has-text("Official Documentation")');
    }

    async navigateToDemoPage() {
        await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    }

    async verifyHeaderText(expectedText: string) {
        await expect(this.pageHeader).toHaveText(expectedText);
    }

    async verifyLinkVisibility() {
        await expect(this.storeFrontLink).toBeVisible();
        await expect(this.adminLink).toBeVisible();
        await expect(this.documentationLink).toBeVisible();
    }

    async openStoreFront() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.storeFrontLink.click(),
        ]);
        await expect(newPage).toHaveURL(/demo.opencart.com/);
        await newPage.close();
    }

    async openAdminPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.adminLink.click(),
        ]);
        await expect(newPage).toHaveURL(/demo.opencart.com\/admin/);
        await newPage.close();
    }

    async openDocumentation() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.documentationLink.click(),
        ]);
        await expect(newPage).toHaveURL(/docs.opencart.com\/en-gb\/introduction/);
        await newPage.close();
    }
}
