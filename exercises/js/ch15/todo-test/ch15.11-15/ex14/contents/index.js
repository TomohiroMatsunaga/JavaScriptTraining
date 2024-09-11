"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  //---start---
  // ボタンを無効化
  button.disabled = true;

  // サーバーとの通信を開始
  const eventSource = new EventSource("http://localhost:3000/message");

  // サーバーからメッセージが届いたら表示
  eventSource.onmessage = function (event) {
    try {
      const data = JSON.parse(event.data);  // メッセージをJSON形式でパース 例 {"value": "こんにちわ\n", "done": false}
      const messageElement = document.createElement("div"); //メッセージを表示するコンテナを生成
      messageElement.className = "message"; //CSS(message)を適応
      messageElement.textContent = data.value;  // JSONのvalueを表示
      messageContainer.appendChild(messageElement); // メッセージを表示するコンテナをmessageContainerに追加。

      // doneがtrueなら接続を閉じる
      if (data.done) {
        eventSource.close();
        button.disabled = false;  // ボタンを再び有効化
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  //---end---
}