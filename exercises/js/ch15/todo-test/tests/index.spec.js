const { test, expect } = require('@playwright/test');

test.describe('Product List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8080');
  });

  test('カテゴリーをすべてにしたとき', async ({ page }) => {
    await page.selectOption('[data-testid="select"]', 'all');
    await expect(page.locator('[data-testid="food1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery2"]')).toBeVisible();
  });

  test('カテゴリーを食品にしたとき', async ({ page }) => {
    await page.selectOption('[data-testid="select"]', 'food');
    await expect(page.locator('[data-testid="food1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="stationery2"]')).not.toBeVisible();
  });

  test('カテゴリーを文房具にしたとき', async ({ page }) => {
    await page.selectOption('[data-testid="select"]', 'stationery');
    await expect(page.locator('[data-testid="food1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="stationery1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery2"]')).toBeVisible();
  });
});