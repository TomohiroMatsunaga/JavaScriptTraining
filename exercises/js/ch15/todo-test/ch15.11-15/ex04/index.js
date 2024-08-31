const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// localStorage のキー名を定義
const LOCAL_STORAGE_KEY = 'todoApp.todos';

// ページが読み込まれたときに行われる処理
document.addEventListener("DOMContentLoaded", () => {
  try {
    // localStorageからToDoリストを取得すru

    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY); //localStorage から取得したデータは文字列になっている

    if (storedTodos) {
      const todos = JSON.parse(storedTodos); //文字列で保存されたJSON形式のデータをJavaScriptのオブジェクトや配列に変換する。
      todos.forEach(task => appendToDoItem(task)); // ToDoリストの各タスクを画面に表示する
    }
  } catch (e) {
    console.warn("LocalStorage is not available.");
  }
});

// ToDoのリストをlocalStorageに保存する関数
function saveTodos() {
  try {
    const tasks = [];
    // 現在の画面に表示されているToDoリストを1つ1つ取得して配列tasksに追加する
    document.querySelectorAll("#todo-list li").forEach(item => {
      tasks.push({ //タスクの使用に従って[id][name][status]を追加する
        id: item.dataset.id,
        name: item.querySelector("label").textContent,
        status: item.querySelector("input[type='checkbox']").checked ? 'completed' : 'active'
      });
    });
    //localStorageにセット
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("LocalStorage is not available. Changes will not be saved.");
  }
}

// フォームが送信されたときに行われる処理
form.addEventListener("submit", async (e) => {
  e.preventDefault(); //デフォルトでページがリロードされる動作を防ぐ
  // ※両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }
  input.value = "";

  //新しタスクを生成する
  const newTask = { id: Date.now().toString(), name: todo, status: 'active' }; //前の問題ではサーバー側でidを付与していたが、重複しないよう、日時を使用する

  //タスクを画面に表示させた後、全てのタスクをlocalStorageに保存する
  appendToDoItem(newTask);
  saveTodos(); // 画面に表示されているリストの状態をlocalStorageに保存する
});

// タスクオブジェクトを受け取って、ToDo リストの要素を画面に追加する
function appendToDoItem(task) {
    const elem = document.createElement("li");
    elem.dataset.id = task.id; //idを設定

    const label = document.createElement("label");
    label.textContent = task.name; //タスク名を設定
    label.style.textDecorationLine = task.status === 'completed' ? "line-through" : "none"; //タスク名に横線を付けるか否かを設定

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = task.status === 'completed'; //チェックボックスを付けるか否かを設定(タスクの状態がcompletedならtrueでチェック状態となり、そうでなければfalseで未チェック状態になる)

    //チェックボックスにリスナを付けて、チェック済みならタスク名に横線を入れる
    toggle.addEventListener('change', () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      saveTodos(); // 画面に表示されているリストの状態をlocalStorageに保存する
    });

    //削除ボタンの設定
    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    // 削除ボタンが押されたらタスクを消す
    destroy.addEventListener("click", () => {
      elem.remove();
      saveTodos(); // 画面に表示されているリストの状態をlocalStorageに保存する
    });

    // 作成した要素をリストに追加する
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.appendChild(elem);
}

// タブ間のデータ同期
// localStorageが変更されたときに全てのタブでstorageイベントが発生することを利用して異なるタブ間で表示内容を同期させる
window.addEventListener('storage', (event) => {
  if (event.key === LOCAL_STORAGE_KEY || event.type === 'storage') { //KeyとTypeの確認
    list.innerHTML = '';
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      const todos = JSON.parse(storedTodos); //文字列で保存されたJSON形式のデータをJavaScriptのオブジェクトや配列に変換する。
      todos.forEach(task => appendToDoItem(task)); // ToDoリストの各タスクを画面に表示する
    }
  }
});