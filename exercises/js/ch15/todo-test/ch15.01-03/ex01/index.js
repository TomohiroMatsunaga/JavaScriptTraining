const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
// TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)←ページがリロードされてデータが消えるのを防ぐため。

  // form のイベントのキャンセル
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const div = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = todo;
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
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  // elem 内に toggle, label, destroy を追加する
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(destroy);
  elem.appendChild(div); 
  list.prepend(elem); //先頭に追加
});
