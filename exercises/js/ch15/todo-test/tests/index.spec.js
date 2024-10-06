const { test, expect } = require('@playwright/test');

test.use({ headless: false }); // ヘッドレスモード(ブラウザを画面に表示せずにバックグラウンドで動作させるモード)を無効にして可視化

test('ToDoの内容が維持されることを確認', async ({ page, context }) => {
  // ページを起動
  await page.goto('http://172.25.96.1:8080');

  // ToDoを2つ追加
  await page.fill('#new-todo', 'ToDo1');
  await page.click('button');
  await page.fill('#new-todo', 'ToDo2');
  await page.click('button');

  // ページをリロードしてToDoが2つ残っているか確認
  await page.reload();
  const todosAfterReload = await page.$$('#todo-list li');
  await expect(todosAfterReload.length).toBe(2);

  // 新しいタブでToDoが2つ残っているか確認
  const newTab = await context.newPage();
  await newTab.goto('http://172.25.96.1:8080');
  await newTab.waitForTimeout(500); // 0.5秒待機
  const todosInNewTab = await newTab.$$('#todo-list li');
  await expect(todosInNewTab.length).toBe(2);

  // 新しいタブでToDoを追加する
  await newTab.fill('#new-todo', 'ToDo3');
  await newTab.click('button'); // Addボタンをクリック

  // 最初のタブに戻って、変更が反映されているか確認
  await page.waitForTimeout(500); // 0.5秒待機
  const todosInOriginalTab = await page.$$('#todo-list li');
  await expect(todosInOriginalTab.length).toBe(3); // ToDoが3つあることを確認
});
