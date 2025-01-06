import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class FeaturePage extends AbstractPage {
    readonly url: string;
    readonly pageHeader: Locator;
    readonly tabs: Locator;

    readonly tabIds: string[] = [
        "tab-admin",
        "tab-unlimited",
        "tab-customer",
        "tab-shipping",
        "tab-extension",
        "tab-mobile",
        "tab-developer"
    ];

    constructor(page: Page) {
        super(page);
        this.url = "https://www.opencart.com/index.php?route=cms/feature";
        this.pageHeader = page.locator(".page-header h1");
        this.tabs = page.locator(".nav-tabs li a");
    }

    async navigateToFeaturePage() {
        await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    }

    async verifyHeaderText(expectedText: string) {
        await expect(this.pageHeader).toHaveText(expectedText);
    }

    async verifyTabExists(tabName: string) {
        const tab = this.tabs.locator(`text=${tabName}`);
        await expect(tab).toBeVisible();
    }

    async switchToTab(tabName: string) {
        const tabLocator = this.tabs.locator(`text=${tabName}`);
        await tabLocator.click();
        const activeTab = this.page.locator(`#${this.tabIds[this.tabIds.findIndex((id) => tabName.toLowerCase().includes(id.split("-")[1]))]}`);
        await expect(activeTab).toBeVisible();
    }
}
