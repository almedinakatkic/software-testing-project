import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Functional Tests: Navbar", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Verify navbar links are functional", async ({ page }) => {
    const expectedLinks = [
      { text: "Feature", href: "https://www.opencart.com/index.php?route=cms/feature" },
      { text: "Blog", href: "https://www.opencart.com/blog" },
      { text: "Download", href: "https://www.opencart.com/index.php?route=cms/download" },
      { text: "Demo", href: "https://www.opencart.com/index.php?route=cms/demo" },
    ];

    for (const link of expectedLinks) {
      const navbarLink = homePage.navbar.locator(`a:has-text("${link.text}")`);
      
      await expect(navbarLink).toBeVisible();

      const href = await navbarLink.getAttribute("href");
      expect(href).toBe(link.href);

      await navbarLink.click();
      await page.waitForLoadState("networkidle");
      expect(page.url()).toBe(link.href);

      await homePage.navigateToHomePage();
    }
  });

  test("Verify Resources link exists", async ({ page }) => {
    const resourcesLink = homePage.navbar.locator('a:has-text("Resources")');
    await expect(resourcesLink).toBeVisible();
    const href = await resourcesLink.getAttribute("href");
    expect(href).not.toBeNull();
  });

  test("Verify Login and Register buttons are visible and functional", async ({ page }) => {
    const loginButton = homePage.navbar.locator('.navbar-right a.btn-link.navbar-btn:has-text("Login")');
    const registerButton = homePage.navbar.locator('.navbar-right a.btn-black.navbar-btn:has-text("Register")');

    await expect(loginButton).toBeVisible();
    await loginButton.click();
    await expect(page).toHaveURL("https://www.opencart.com/index.php?route=account/login");

    await homePage.navigateToHomePage();

    await expect(registerButton).toBeVisible();
    await registerButton.click();
    await expect(page).toHaveURL("https://www.opencart.com/index.php?route=account/register");
  });
});
