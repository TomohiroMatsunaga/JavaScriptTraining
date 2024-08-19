const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOMでスタイルや構造をカプセル化します
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // templateの内容をクローンしてShadow DOMに追加

    this.form = this.shadowRoot.querySelector("#new-todo-form"); //new-todo-form要素の取得

    //-----実装部分（開始）-----
    //Web Componentsを使ってカスタムな<todo-app>を作っている。要素は既にtemplate.で定義されている
    
    this.todoList = this.shadowRoot.querySelector("#todo-list"); //todo-list要素の取得
    this.input = this.shadowRoot.querySelector("#new-todo"); //new-todo要素の取得

    //以下は基本的にはcd15.04-10\ex01で記述したコードをコピーした。
    
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

      const todoText = this.input.value.trim(); // 入力値の前後の空白を除去
      if (todoText === "") return; // 空白だけの場合は何もしない

      this.input.value = ""; // 入力フィールドをクリア

      // ToDoアイテムを作成
      const elem = document.createElement("li");
      const div = document.createElement("div");

      const label = document.createElement("label");
      label.textContent = todoText;
      label.style.textDecorationLine = "none";

      const toggle = document.createElement("input");
      // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
      toggle.type = "checkbox";
      // toggle が変化 label.style.textDecorationLine を変更する
      toggle.addEventListener("change", () => {
        label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      });

      const destroy = document.createElement("button");
      // TODO: destroy がクリック (click) された場合に elem を削除しなさい
      destroy.textContent = "❌";
      // ボタンがクリックされたときにアイテムを削除
      destroy.addEventListener("click", () => {
        this.todoList.removeChild(elem);
      });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  // elem 内に toggle, label, destroy を追加する
      div.appendChild(toggle);
      div.appendChild(label);
      div.appendChild(destroy);
      elem.appendChild(div); 
      this.todoList.prepend(elem); // 先頭に追加
    });

    //-----実装部分（終了）-----
  }
}

//クラスTodoAppをWeb Components<todo-app>に登録する
customElements.define("todo-app", TodoApp);