const { test, expect } = require('@playwright/test');

test('should load the script with correct integrity', async ({ page }) => {
    // 正しいintegrityのURLにアクセス
    await page.goto('http://localhost:8080/index.html');
    
    // 3秒待機
    await page.waitForTimeout(3000);
    
    // ページの内容を取得
    const content = await page.textContent('#message');
    
    // ページの内容に "integrity 属性の検証成功" が含まれていることを確認
    expect(content).toContain('integrity 属性の検証成功');
});

test('should not load the script with incorrect integrity', async ({ page }) => {
    // 誤っているintegrityのURLにアクセス
    await page.goto('http://localhost:8080/index_invalid.html');
    
    // 3秒待機
    await page.waitForTimeout(3000);
    
    // ページの内容を取得
    const content = await page.textContent('#message');
    
    // ページの内容に "integrity 属性の検証成功" が含まれていないことを確認
    expect(content).not.toContain('integrity 属性の検証成功');
});
