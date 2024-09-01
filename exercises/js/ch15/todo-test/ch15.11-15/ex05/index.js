const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

//ここからが問4からの変更点
//indexedDBはlocalStorageとは違って変更が他のタブに伝播しない。そこでBroadcastChannel APIを使用した

// indexedDB のデータベース名とストア名を定義
const DB_NAME = 'todoAppDB';
const DB_STORE_NAME = 'todos';
let db; // indexedDBのインスタンス

// BroadcastChannelの初期化
// 自身を含むタブ間でデータをやり取りするためのチャネル
const channel = new BroadcastChannel('todo_channel');

// indexedDBに接続する関数
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);// データベースを開く。DBがなければ作成される

    // データベースが新しく作られる、アップグレードされるときに発生するイベント
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: 'id' }); //ストアを作成する
    };

    // データベースが正常に開いたとき
    request.onsuccess = (event) => {
      db = event.target.result; // 開いたデータベースを変数dbに保存する
      resolve(db);
    };

    // データベースを開くのに失敗したとき
    request.onerror = (event) => {
      reject(event);
    };
  });
}

// indexedDBに保存されたToDoを取得して表示する関数
async function loadTodos() {
  list.innerHTML = ''; // 画面に表示しているリストをクリア
  const transaction = db.transaction(DB_STORE_NAME, 'readonly'); // 読み取り専用でトランザクション（ワンセットな処理の単位）を開始する
  const store = transaction.objectStore(DB_STORE_NAME); //ストアを取得
  const request = store.getAll(); // ストアに保存されている全てのToDoを取得

  // データの取得に成功したとき、appendToDoItemを呼び出してタスクを表示させる
  request.onsuccess = (event) => {
    const todos = event.target.result;
    todos.forEach(task => appendToDoItem(task));
  };

  // データの取得に失敗したとき、エラーを投げる
  request.onerror = (event) => {
    console.error("Error loading todos from IndexedDB:", event);
  };
}

// 画面に表示されているToDoリストをindexedDBに保存する関数
async function saveTodos() {
  //画面に表示されているToDoリストをtasksに格納する
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach(item => {
    tasks.push({
      id: item.dataset.id,
      name: item.querySelector("label").textContent,
      status: item.querySelector("input[type='checkbox']").checked ? 'completed' : 'active'
    });
  });

  const transaction = db.transaction(DB_STORE_NAME, 'readwrite'); // 書き込み権限でトランザクションを開始
  const store = transaction.objectStore(DB_STORE_NAME); // ストアを取得

  // 一旦、indexedDBに保存されている全てのタスクをクリアし、新たに保存し直す
  store.clear().onsuccess = () => {
    tasks.forEach(task => store.put(task));
  };

   // データの保存が成功したとき、自身と他のタブに通知する
  transaction.oncomplete = () => {
    channel.postMessage({ type: 'update' }); // 自身と他のタブに通知する
  };

  // データの保存に失敗したとき、エラーを投げる
  transaction.onerror = (event) => {
    console.error("Error saving todos to IndexedDB:", event);
  };
}

// ページが読み込まれたときに行われる処理
document.addEventListener("DOMContentLoaded", async () => {
  db = await openDB(); // データベースに接続する
// indexedDBの更新を通知する機構を利用して、indexedDBの内容を画面に表示する
  channel.postMessage({ type: 'update' }); // 自身と他のタブに通知する
});

// メッセージを受け取ったら、ToDoリストを再読み込みする
channel.addEventListener('message', async (event) => {
  if (event.data.type === 'update') {
    await loadTodos();
  }
});

//ここまでが問4からの変更点

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