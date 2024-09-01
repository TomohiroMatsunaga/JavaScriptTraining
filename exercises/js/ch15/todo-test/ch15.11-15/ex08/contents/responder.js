import WebSocket from "ws";

const wsResponder = new WebSocket("ws://localhost:3003");

wsResponder.on("open", () => {
    console.log("Responder connected to WebSocket server");
});

// メッセージを受信したとき、「Hello,」を付けてサーバーにメッセージを送信する。
//サーバー側で自分自身にリクエストを送らない設定になっているので問題ない
wsResponder.on("message", (event) => {

    const request = JSON.parse(event);
    const response = {
        id: request.id,
        message: `Hello, ${request.message}`
    };

    wsResponder.send(JSON.stringify(response));
});

