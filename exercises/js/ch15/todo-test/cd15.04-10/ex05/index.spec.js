const { test, expect } = require('@playwright/test');

test('inline-circle should have correct border colors', async ({ page }) => {
  // テストするページを開く
  await page.goto('http://127.0.0.1:8080'); // ここに index.html の実際のパスを指定

  // テスト対象のエレメントを取得
  const circle1 = await page.$('inline-circle:nth-of-type(1)'); //inline-circleの1番最初のものを取得
  const circle2 = await page.$('inline-circle:nth-of-type(2)'); //inline-circleの2番目のものを取得
  const circle3 = await page.$('inline-circle:nth-of-type(3)'); //inline-circleの3番目のものを取得

  // スタイルを取得してアサーションを実行
  const borderColor1 = await circle1.evaluate(node => getComputedStyle(node).borderColor); //circleのスタイル(borderColor)を取得
  const borderColor2 = await circle2.evaluate(node => getComputedStyle(node).borderColor);
  const borderColor3 = await circle3.evaluate(node => getComputedStyle(node).borderColor);

  await expect(borderColor1).toBe('rgb(0, 0, 0)');
  await expect(borderColor2).toBe('rgb(255, 0, 0)');
  await expect(borderColor3).toBe('rgb(0, 128, 0)');
});
