const { test, expect } = require('@playwright/test');
test.use({ headless: false }); // ヘッドレスモードを無効にして可視化
test('フィルタが作用しているか', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080');

  // ToDoを追加
  await page.fill('#new-todo', 'ToDo1');
  await page.click('button'); // Addボタンをクリック
  await page.fill('#new-todo', 'ToDo2');
  await page.click('button'); // Addボタンをクリック
  await page.fill('#new-todo', 'ToDo3');
  await page.click('button'); // Addボタンをクリック

  // ToDo1を完了状態にする
  const firstTodoToggle = await page.$('#todo-list li:nth-of-type(1) .toggle'); //liの1番最初のものを取得
  await firstTodoToggle.click();

  // Activeをクリック
  await page.click('a[href="#/active"]');
  const activeTodos = await page.$$('#todo-list li:not(.completed)'); // 未完了のToDoを取得
  await expect(activeTodos.length).toBe(2); //未完了のToDoが2つあることを確認

  // Completedをクリック
  await page.click('a[href="#/completed"]');
  const completedTodos = await page.$$('#todo-list li.completed'); // 完了済みのToDoを取得
  await expect(completedTodos.length).toBe(1); //完了済みのToDoが1つあることを確認

  // Allをクリック
  await page.click('a[href="#/"]');
  const allTodos = await page.$$('#todo-list li'); // すべてのToDoを取得
  await expect(allTodos.length).toBe(3); //ToDoが3あることを確認
});
