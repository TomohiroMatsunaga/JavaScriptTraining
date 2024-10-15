// 機能的には、メインスレッド（ワーカーに依頼している側）とワーカースレッドが共同してインクリメントしてる。
const threads = require("worker_threads");
if (threads.isMainThread) {
    let sharedBuffer = new SharedArrayBuffer(4);
    let sharedArray = new Int32Array(sharedBuffer);
    // 自分自身にファイルを指定してワーカーを実行（ワーカーはサブスレッドで動くのでelseのコードが動く）
    let worker = new threads.Worker(__filename, { workerData: sharedArray });

    // ワーカーが実行されたら処理されるコード
    worker.on("online", () => {
        for (let i = 0; i < 10_000_000; i++) { // スレッドセーブでアトミックなインクリメント。
            Atomics.add(sharedArray, 0, 1); // 第1引数が配列、第２引数がインデックス、第３引数がインクリメントする数
        }
    });

    worker.on("message", (message) => {
        // 両方のスレッドが終了したら、スレッドセーブな関数を使って
        // 共有配列を読み込み、期待通りの20,000,000という値になって
        // いることを確認する。
        console.log(Atomics.load(sharedArray, 0));
    });


} else {
    // ワーカースレッドで実行されるコード

    let sharedArray = threads.workerData;
    for (let i = 0; i < 10_000_000; i++) { // スレッドセーブでアトミックなインクリメント。
        Atomics.add(sharedArray, 0, 1);
    }
    threads.parentPort.postMessage("done");
}
