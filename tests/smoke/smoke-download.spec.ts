import { test, expect } from "@playwright/test";
import { DownloadPage } from "../../page-objects/DownloadPage";

test.describe("Smoke Test: Download Page", () => {
    let downloadPage: DownloadPage;

    test.beforeEach(async ({ page }) => {
        downloadPage = new DownloadPage(page);
        await downloadPage.navigateToDownloadPage();
    });

    test("Verify Download Link", async () => {
        await downloadPage.verifyDownloadLink();
    });
});
