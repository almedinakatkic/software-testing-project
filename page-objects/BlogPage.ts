import { Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class BlogPage extends AbstractPage {
    readonly blogItems: Locator;
    readonly tutorialsCategoryLink: Locator;
    readonly paginationLink: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.blogItems = page.locator('.blog-item');
        this.tutorialsCategoryLink = page.locator('a[href*="filter_category_id=1"]'); 
        this.paginationLink = page.locator('a.page-link:has-text("2")'); 
        this.searchInput = page.locator('input[name="filter_search"]');
        this.searchButton = page.locator('#button-search');
    }

    async navigateToBlogPage() {
        await this.page.goto('https://www.opencart.com/blog');
    }

    async getBlogItemCount() {
        await this.blogItems.first().waitFor({ state: 'visible' });
        return this.blogItems.count();
    }

    async filterByCategory() {
        await this.tutorialsCategoryLink.click();
        await this.page.waitForLoadState('networkidle'); 
    }

    async goToPage(pageNumber: number) {
        const pageLink = this.page.locator(`a.page-link:has-text("${pageNumber}")`);
        await pageLink.click();
        await this.page.waitForLoadState('networkidle'); 
    }

    async searchFor(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle'); 
    }
}
