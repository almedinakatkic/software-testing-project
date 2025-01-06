import { test } from "@playwright/test";
import { FeaturePage } from "../../page-objects/FeaturePage";

test.describe("Regression Tests: Feature Page", () => {
    let featurePage: FeaturePage;

    test.beforeEach(async ({ page }) => {
        featurePage = new FeaturePage(page);
        await featurePage.navigateToFeaturePage();
    });

    test("Verify page header", async () => {
        await featurePage.verifyHeaderText("OpenCart Features");
    });

    test("Verify tabs existence", async () => {
        const tabs = ["Admin", "Unlimited everything", "Customer", "Shipping, Payments and Reports", "Extensions", "Mobile & SEO", "Developer"];
        for (const tab of tabs) {
            await featurePage.verifyTabExists(tab);
        }
    });

    test("Switch between tabs", async () => {
        const tabs = ["Admin", "Unlimited everything", "Customer", "Shipping, Payments and Reports", "Extensions", "Mobile & SEO", "Developer"];

        for (const tab of tabs) {
            await featurePage.switchToTab(tab);
        }
    });
});
