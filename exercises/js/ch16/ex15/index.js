// 機能的には、メインスレッド（ワーカーに依頼している側のコード）とワーカースレッドが共同してインクリメントしてる。
const threads = require("worker_threads");
if (threads.isMainThread) {
     // number 型の変数 num を定義
    let num = 0;
    // 自分自身にファイルを指定してワーカーを実行（ワーカーはサブスレッドで動くのでelseのコードが動く）
    let worker = new threads.Worker(__filename);

    // ワーカーが実行されたらメインスレッドで処理されるコード
    worker.on("online", () => {
        for (let i = 0; i < 10_000_000; i++) {
            num++;
        }
    });

    // メインスレッドでメッセージを受信するためのリスナーを設定
    worker.on("message", (message) => {
        if (message === "increment") {
            num++; // num をインクリメント
        } else {
            // 最終的なnumの値を表示
            console.log(num);
        }
    });


} else {
    // ワーカースレッドで実行されるコード
    for (let i = 0; i < 10_000_000; i++) {
        // メインスレッドにインクリメントするようメッセージを送信
        threads.parentPort.postMessage("increment");
    }
    threads.parentPort.postMessage("done");
}

//問：このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか書きなさい。
// 回答：アクターモデル