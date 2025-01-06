import { test, expect } from "@playwright/test";
import { DownloadPage } from "../../page-objects/DownloadPage";

test.describe("Regressions Tests: Download Page", () => {
    let downloadPage: DownloadPage;

    test.beforeEach(async ({ page }) => {
        downloadPage = new DownloadPage(page);
        await downloadPage.navigateToDownloadPage();
    });

    test("Verify cloud store link", async () => {
        await downloadPage.verifyCloudStoreLink();
    });

    test("Verify hosting partner link", async () => {
        await downloadPage.verifyHostingPartnerLink();
    });

    test("Verify how to install link", async () => {
        await downloadPage.verifySoftaculousLink();
    });
});
