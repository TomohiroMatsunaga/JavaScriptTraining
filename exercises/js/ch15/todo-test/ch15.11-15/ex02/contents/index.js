//リクエストを送る関数fetchをretryWithExponentialBackoffに変更した。問題で求められている機能はretryWithExponentialBackoff内に閉じた。

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo"); //新しくタスクの名前を入力するためのテキストフィールド

// ページ全体を無効化する関数
function disableUI() {
  document.body.style.pointerEvents = "none";
}

// ページ全体を有効化する関数
function enableUI() {
  document.body.style.pointerEvents = "auto";
}

// リトライするfetch関数
// サーバーが応答しない場合や、エラーが発生した場合は、最大3秒間で再試行する
async function retryWithExponentialBackoff(url, options) {
  const timeout = 3000; // タイムアウト時間をミリ秒で設定（3秒）

  disableUI(); // 通信開始時にユーザーが画面を操作できないようにする

  let startTime = Date.now(); // リクエストの開始時間を記録する
  let attempt = 0;

  while (Date.now() - startTime < timeout) { // 3秒以内にリクエストが成功するまで繰り返す
    
      try {
          // fetch関数をタイムアウト付きで実行するためのPromiseを作成
          const fetchWithTimeout = new Promise((resolve, reject) => {
              const timer = setTimeout( //setTimeOutは第2引数の秒数経過後に第1引数を実行する
                () => { reject(new Error('Request timed out')); }, timeout - (Date.now() - startTime)　//3秒以上経っていたらPromiseを失敗(reject)させる
            );

              // サーバーにリクエストを送る
              fetch(url, options).then(
                  response => {
                      clearTimeout(timer); // 応答があった場合、タイマーを停止
                      if (!response.ok && response.status >= 500) {
                          // サーバーエラー（500番台）が発生した場合、Promiseを失敗(reject)させる
                          reject(new Error('Server error, retry'));
                      } else {
                          resolve(response); // 正常に応答があった場合やその他のエラーの場合は結果を返す
                      }
                  },
                  err => {
                      clearTimeout(timer); // fetch関数自体がエラーを返した場合もタイマーを停止
                      reject(err); // エラーを発生させる
                  }
              );
          });

          const result = await fetchWithTimeout; // awaitを使っているので、fetchWithTimeout内でrejectが発生した場合catchに移る
          enableUI(); // 通信完了時にユーザーが再び画面を操作できるようにする
          return result; // 結果を返してretryWithExponentialBackoffを終了

      } catch (error) {
          const elapsed = Date.now() - startTime; // 経過時間を計算
          if (elapsed >= timeout) { // 3秒を超えていたら
              enableUI(); // 通信完了時にUIを有効化
              throw error; // エラー投げてretryWithExponentialBackoffを終了
          }
          attempt++;
          const delay = Math.min(Math.pow(2, attempt - 1) * 1000, timeout - elapsed); // 残り時間内で待つ時間を設定
          await new Promise(res => setTimeout(res, delay)); // 指定した時間待つ
      }
  }

  enableUI(); // タイムアウトでループを抜けた場合、UIを有効化
  throw new Error('Request could not be completed within 3 seconds');
}



// ページが読み込まれたときに行われる処理
document.addEventListener("DOMContentLoaded", async () => {
  // ※TODO: ここで API を呼び出してタスク一覧を取得し、
  // ※成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    //---start---
    // サーバーにGETリクエストを送り、タスクのデータを取得する
    const response = await retryWithExponentialBackoff('/api/tasks');
  
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
    const response = await retryWithExponentialBackoff('/api/tasks', {
      method: 'POST',
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
      const response = await retryWithExponentialBackoff(`/api/tasks/${task.id}`, {
        method: 'PATCH',
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
      const response = await retryWithExponentialBackoff(`/api/tasks/${task.id}`, {
        method: 'DELETE'
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
