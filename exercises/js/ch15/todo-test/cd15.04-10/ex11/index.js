const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  //-----実装開始地点-----
  // URLのハッシュ値（#/activeや#/completed）が変化してもページ全体のリロードが行われないため、ハッシュ値の変更によってフィルタを実現している。
  // 現在のハッシュ値を取得
  const hash = window.location.hash;

  // フィルタされたToDoリストを格納する
  let filteredTodos = [];

  // ハッシュ値に応じてフィルタされたToDoリストを作成
  if (hash === "#/active") {
    filteredTodos = todos.filter(todo => !todo.completed); // 未完了のToDoリスト
  } else if (hash === "#/completed") {
    filteredTodos = todos.filter(todo => todo.completed); // 完了済みのToDoリスト
  } else {
    filteredTodos = todos; // すべてのToDoリスト
  }

  // ToDoリストを表示
  renderTodos(filteredTodos);
  //-----実装終了地点-----
});
