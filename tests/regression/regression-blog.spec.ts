import { test, expect } from '@playwright/test';
import { BlogPage } from '../../page-objects/BlogPage';

test.describe('Regression Tests: Blog Page', () => {
    let blogPage: BlogPage;

    test.beforeEach(async ({ page }) => {
        blogPage = new BlogPage(page);
        await blogPage.navigateToBlogPage();
    });

    test('Blog page displays blog items', async () => {
        const count = await blogPage.getBlogItemCount();
        expect(count).toBeGreaterThan(0); 
    });

    test('Filter blog posts by Tutorials category', async () => {
        await blogPage.filterByCategory();

        await expect(blogPage.page).toHaveURL(/filter_category_id=1/);

        const count = await blogPage.getBlogItemCount();
        expect(count).toBeGreaterThan(0);
    });

    test('Pagination works correctly', async () => {
        await blogPage.goToPage(2);

        await expect(blogPage.page).toHaveURL(/page=2/);

        const count = await blogPage.getBlogItemCount();
        expect(count).toBeGreaterThan(0);
    });

    test('Search functionality works', async () => {
        await blogPage.searchFor('E-commerce');

        const count = await blogPage.getBlogItemCount();
        expect(count).toBeGreaterThan(0);
    });
});
