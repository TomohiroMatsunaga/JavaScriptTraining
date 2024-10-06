document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#todo-form');
    const list = document.querySelector('#todo-list');
    const input = document.querySelector('#new-todo');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルト動作（ページリロード）を防ぐ

        // 入力内容を取得
        const todoText = input.value.trim();
        
        // 入力が空の場合は何もしない
        if (todoText === "") return;

        // 新しいリスト項目を作成
        const newItem = document.createElement('li');
        newItem.textContent = todoText;

        // リストに追加
        list.appendChild(newItem);

        // フォームをリセット
        input.value = '';
    });
});
