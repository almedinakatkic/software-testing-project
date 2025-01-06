import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage {
  readonly url: string;
  readonly banner: Locator;
  readonly navbar: Locator;
  readonly heroTitle: Locator;
  readonly featuresSection: Locator;
  readonly cloudSection: Locator;
  readonly footer: Locator;
  readonly footerNewsletter: Locator;
  readonly footerLinks: Locator;
  readonly footerOpenCartSection: Locator;
  readonly footerCompanySection: Locator;
  readonly footerSupportSection: Locator;
  readonly footerResourcesSection: Locator;
  readonly dropdownMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.url = "https://www.opencart.com/index.php?route=common/home";

    this.navbar = page.locator(".navbar");
    this.dropdownMenu = this.navbar.locator(".dropdown-menu");

    this.banner = page.locator("#hero");
    this.heroTitle = page.locator(
      'h1:has-text("The best FREE and open-source eCommerce platform")'
    );
    this.featuresSection = page.locator("#feature");
    this.cloudSection = page.locator("#cloud");

    this.footer = page.locator("footer");
    this.footerNewsletter = page.locator('#newsletter input[name="newsletter"]');
    this.footerLinks = page.locator("footer ul.list-unstyled a");
    this.footerOpenCartSection = this.footer.locator('section:has(h5:has-text("OpenCart")) ul');
    this.footerCompanySection = this.footer.locator('section:has(h5:has-text("Company")) ul');
    this.footerSupportSection = this.footer.locator('section:has(h5:has-text("Support")) ul');
    this.footerResourcesSection = this.footer.locator('section:has(h5:has-text("Resources")) ul');
  }

  async navigateToHomePage() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
    await expect(this.navbar).toBeVisible({ timeout: 10000 });
  }

  async checkHomePage() {
    await expect(this.banner).toBeVisible();
    await expect(this.navbar).toBeVisible();
    await expect(this.heroTitle).toContainText(
      "The best FREE and open-source eCommerce platform"
    );

    await expect(this.featuresSection).toBeVisible();
    await expect(this.cloudSection).toBeVisible();

    await this.footer.waitFor({ state: "visible" });
    await expect(this.footer).toBeVisible();
    await expect(this.footerNewsletter).toBeVisible();
  }

  async verifyNavbarLink(linkText: string, expectedUrl: string) {
    const link = this.navbar.locator(`a:has-text("${linkText}")`).first();
    await expect(link).toBeVisible();
    await link.click();
    await this.page.waitForLoadState("networkidle");

    const currentUrl = this.page.url();
    const normalizedCurrentUrl =
      new URL(currentUrl).origin + new URL(currentUrl).pathname;
    const normalizedExpectedUrl =
      new URL(expectedUrl).origin + new URL(expectedUrl).pathname;

    expect(normalizedCurrentUrl).toBe(normalizedExpectedUrl);
  }

  async verifyFooterLink(section: Locator, linkText: string, expectedUrl: string) {
    const link = section.locator(`a:has-text("${linkText}")`).first();
    await link.click();
    const currentUrl = this.page.url();
    const normalizedCurrentUrl =
      new URL(currentUrl).origin + new URL(currentUrl).pathname;
    const normalizedExpectedUrl =
      new URL(expectedUrl).origin + new URL(expectedUrl).pathname;
    expect(normalizedCurrentUrl).toBe(normalizedExpectedUrl);
    await this.navigateToHomePage();
  }

  async assertFooterLinks() {
    const linksCount = await this.footerLinks.count();
    for (let i = 0; i < linksCount; i++) {
      const link = this.footerLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).not.toBeNull();
    }
  }
}
