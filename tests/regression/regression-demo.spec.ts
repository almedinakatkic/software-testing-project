import { test, expect } from "@playwright/test";
import { DemoPage } from "../../page-objects/DemoPage";

test.describe("Regression Tests: Demo Page", () => {
    let demoPage: DemoPage;

    test.beforeEach(async ({ page }) => {
        demoPage = new DemoPage(page);
        await demoPage.navigateToDemoPage();
    });

    test("Verify page header", async () => {
        await demoPage.verifyHeaderText("OpenCart Demonstration");
    });

    test("Verify links are visible", async () => {
        await demoPage.verifyLinkVisibility();
    });

    test("Open store front link", async () => {
        await demoPage.openStoreFront();
    });

    test("Open admin link", async () => {
        await demoPage.openAdminPage();
    });

    test("Open documentation link", async () => {
        await demoPage.openDocumentation();
    });
});
