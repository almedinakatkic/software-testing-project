import { Page, Locator, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ExtensionsPage extends AbstractPage {
  readonly url: string;
  readonly pagination: Locator;
  readonly items: Locator;
  readonly sortByDropdown: Locator;
  readonly filterPriceButtons: Locator;
  readonly filterCategories: Locator;
  readonly filterVersionDropdown: Locator;
  readonly filterRatingLinks: Locator;
  readonly filterDeveloperRadio: Locator;
  readonly extensionList: Locator;
  readonly noResultsMessage: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly filterAllButton: Locator;
  readonly filterCommercialButton: Locator;
  readonly filterFreeButton: Locator;
  readonly developedByOptions: Locator;
  readonly ratingOptions: Locator;
  readonly opencartVersionDropdown: Locator;

  constructor(page: Page) {
      super(page);
      this.url = "https://www.opencart.com/index.php?route=marketplace/extension";
      this.pagination = page.locator("ul.pagination");
      this.items = page.locator("#extension-list .extension-name p a");
      this.sortByDropdown = page.locator("#input-sort");
      this.filterPriceButtons = page.locator(".btn-group a");
      this.filterCategories = page.locator("#extension-category ul li a");
      this.filterVersionDropdown = page.locator("section#extension-opencart-version select");
      this.filterRatingLinks = page.locator("#extension-rating ul li a");
      this.filterDeveloperRadio = page.locator("section#extension-developed .radio label");
      this.extensionList = page.locator("#extension-list .extension-name");
      this.noResultsMessage = page.locator(".alert.alert-warning");
      this.searchInput = page.locator('#extension-search input[name="filter_search"]');
      this.searchButton = page.locator('#button-search');
      this.productCards = page.locator("#extension-list .col-md-4");
      this.filterAllButton = page.locator('a:has-text("All")');
      this.filterCommercialButton = page.locator('a:has-text("Commercial")');
      this.filterFreeButton = page.locator('a:has-text("Free")');
      this.developedByOptions = page.locator('#extension-developed .radio label');
      this.ratingOptions = page.locator('#extension-rating ul.list-unstyled li a');
      this.opencartVersionDropdown = page.locator('#extension-opencart-version select');
  }

  async navigateToExtensionsPage() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async getCurrentPageNumber() {
    const activePage = await this.pagination.locator(".page-item.active .page-link").innerText();
    return parseInt(activePage);
  }

  async goToNextPage() {
    const nextPageLink = this.pagination.locator("li.page-item > a.page-link >> text='>'");
    await nextPageLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async goToPreviousPage() {
    const previousPageLink = this.pagination.locator("li.page-item > a.page-link >> text='<'");
    await previousPageLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getExtensionListCount() {
    return this.items.count();
  }

  async searchExtension(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async selectSortBy(option: string) {
    await this.sortByDropdown.selectOption({ label: option });
    await this.page.waitForLoadState("networkidle");
  }

  async filterByPrice(option: "All" | "Commercial" | "Free") {
    const buttons = await this.filterPriceButtons.all();
    for (const button of buttons) {
      if ((await button.textContent())?.trim() === option) {
        await button.click();
        await this.page.waitForLoadState("networkidle");
        break;
      }
    }
  }

  async filterByCategory(category: string) {
    const links = await this.filterCategories.all();
    for (const link of links) {
      if ((await link.textContent())?.trim() === category) {
        await link.click();
        await this.page.waitForLoadState("networkidle");
        break;
      }
    }
  }

  async filterByVersion(version: string) {
    await this.filterVersionDropdown.selectOption({ label: version });
    await this.page.waitForLoadState("networkidle");
  }

  async filterByRating(minStars: number) {
    const links = await this.filterRatingLinks.all();
    for (const link of links) {
      const starsText = await link.textContent();
      if (starsText?.includes(`${minStars} and up`)) {
        await link.click();
        await this.page.waitForLoadState("networkidle");
        break;
      }
    }
  }

  async filterByDeveloper(developer: "All" | "OpenCart Partners" | "Developers") {
    const radios = await this.filterDeveloperRadio.all();
    for (const radio of radios) {
      if ((await radio.textContent())?.trim() === developer) {
        await radio.click();
        await this.page.waitForLoadState("networkidle");
        return;
      }
    }
  }

  async getExtensionsList() {
    if (await this.noResultsMessage.isVisible()) {
      return [];
    }
    return await this.extensionList.allTextContents();
  }

  async getExtensionDescriptions() {
    return await this.extensionList.allTextContents();
  }

  async verifyNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async verifyExtensionListNotEmpty() {
    const extensions = await this.getExtensionsList();
    expect(extensions.length).toBeGreaterThan(0);
  }

  async validateProductDetails(index: number) {
    const details = await this.getProductDetails(index);

    expect(details.title).toBeTruthy();
    expect(details.price).toBeTruthy();
    expect(details.description).toBeTruthy();
    expect(details.reviews).toBeGreaterThanOrEqual(0);
  }

  async getProductDetails(index: number) {
    const product = this.productCards.nth(index);

    const title = await product.locator(".extension-name p a").textContent();
    const price = await product.locator(".extension-name p span").textContent();
    const description = await product.locator(".extension-description").textContent();
    const reviewsText = await product.locator(".text-right span").textContent();

    return {
      title: title?.trim(),
      price: price?.trim(),
      description: description?.trim(),
      reviews: parseInt(reviewsText || "0"),
    };
  }

  async validateAllProducts() {
    const productCount = await this.productCards.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      await this.validateProductDetails(i);
    }
  }
}
