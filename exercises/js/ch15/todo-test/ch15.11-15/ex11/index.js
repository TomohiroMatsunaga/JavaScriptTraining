// キャンバスを取得
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); // 2次元グラフィックスを描画する

const worker = new Worker('worker.js');

console.log('Worker created');

// ワーカーにデータを送信
const tile = {width: canvas.width, height: canvas.height};
worker.postMessage(tile);

// ワーカーから結果が返ってきたらキャンバスに描画
worker.onmessage = function(e) {
    context.putImageData(e.data, 0, 0);
};
