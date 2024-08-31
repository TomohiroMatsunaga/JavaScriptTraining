//この問題ではfetchする際に以下のオプションを付けた
// credentials: 'include', // Cookie の送信を許可する
// mode: 'cors' // CORSモードでのリクエスト
// server.jsにも2箇所変更を加えている

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo"); //新しくタスクの名前を入力するためのテキストフィールド

// ページが読み込まれたときに行われる処理
document.addEventListener("DOMContentLoaded", async () => {
  // ※TODO: ここで API を呼び出してタスク一覧を取得し、
  // ※成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    //---start---
    // サーバーにGETリクエストを送り、タスクのデータを取得する
    const response = await fetch('http://localhost:3001/api/tasks', {
      method: 'GET',
      credentials: 'include', // Cookie の送信を許可する
      mode: 'cors' // CORSモードでのリクエスト
    });
  
    // もしリクエストが成功しなかった場合、エラーメッセージを表示します
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    // サーバーから取得したデータをJavaScriptのオブジェクトに変換する
    const data = await response.json();

    //取得したタスクを1つ1つToDoリストに追加する
    data.items.forEach(task => appendToDoItem(task));
  } catch (error) {

    // エラーが発生したとき、アラートを表示する
    alert(`Failed to load tasks: ${error.message}`);
    //---end---
  }
});

// フォーム(ユーザーが入力した情報をサーバーに送信する仕組み)が送信されたときに行われる処理
form.addEventListener("submit", async (e) => {
  // ※TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // →デフォルトでページがリロードされる動作を防ぐため？
  //---start---
  e.preventDefault();
  //---end---

  // ※両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // ※new-todo の中身は空にする
  input.value = "";

  // ※TODO: ここで API を呼び出して新しいタスクを作成し
  // ※成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  //---start---
  try {
    // サーバーにPOSTリクエストを送り、タスクを追加
    const response = await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      credentials: 'include', // Cookie の送信を許可する
      mode: 'cors', // CORSモードでのリクエスト
      headers: {
        'Content-Type': 'application/json' //データの形式をJSONに指定
      },
      body: JSON.stringify({ name: todo }) //サーバーに送るタスクの名前を持つJSON
    });

    // もしリクエストが成功しなかった場合、エラーメッセージを表示します
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    //サーバーから帰ってきた新しいタスクのデータをJSONOに変換してToDoリストに追加す
    const task = await response.json();
    appendToDoItem(task);

  } catch (error) {
    // エラーが発生したとき、アラートを表示する
    alert(`Failed to create task: ${error.message}`);
  }
  //---end---
});

// ※API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ※ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label"); //タスク名を表示するラベル
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === 'completed' ? "line-through" : "none"; //タスクの状態に応じてタスク名に横線を引く

  const toggle = document.createElement("input");

  // ※TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // ※成功したら label.style.textDecorationLine を変更しなさい
  //---start---
  //toggle(チェックボックスの初期設定)
  toggle.type = "checkbox";
  toggle.checked = task.status === 'completed';
  // チェックボックス(toggle)が変更されたときにタスクの状態をサーバーに送信する
  toggle.addEventListener('change', async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PATCH',
        credentials: 'include', // Cookie の送信を許可する
        mode: 'cors', // CORSモードでのリクエスト
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: toggle.checked ? 'completed' : 'active' //チェックボックスの状態をサーバーに送る
        })
      });

      // もしリクエストが成功しなかった場合、エラーメッセージを表示します
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      label.style.textDecorationLine = toggle.checked ? "line-through" : "none"; //チェックボックスの状態に応じてタスク名に横線を引く
    } catch (error) {
      // エラーが発生したとき、アラートを表示する
      alert(`Failed to update task: ${error.message}`);
      toggle.checked = !toggle.checked; // エラ^が発生した場合はチェックボックスの状態を元に戻す
    }
  });
  //---end---

  const destroy = document.createElement("button");
  // ※TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // ※成功したら elem を削除しなさい
  //---start---
  destroy.textContent = "❌";
  //削除ボタンがクリックされたらタスクを削除する
  destroy.addEventListener("click", async () => {
    try {
      //タスクをサーバーから削除する
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'DELETE',
        credentials: 'include', // Cookie の送信を許可する
        mode: 'cors' // CORSモードでのリクエスト
      });

      // もしリクエストが成功しなかった場合、エラーメッセージを表示します
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      //リストからタスクを削除する
      elem.remove();
    } catch (error) {
      // エラーが発生したとき、アラートを表示する
      alert(`Failed to delete task: ${error.message}`);
    }
  });
  //---end---

  // ※TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  //---start---
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  //---end---
}
