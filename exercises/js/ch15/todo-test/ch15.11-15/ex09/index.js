//元々問題として与えられていたコードに4ヶ所の変更点を加えた
//1.WebSocketオブジェクトの作成とサーバーからメッセージを受信して、セル全体の状態を更新する
//2.セルを反転させるためにクリックしたセルの行と列の情報を送る
//3.ゲームをスタートするリクエストを送る
//4.ゲームを一時停止するリクエストを送る

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

  //---start---
  // WebSocketオブジェクトの作成
  const ws = new WebSocket("ws://localhost:3003");
  // サーバーからメッセージを受信したときに呼び出される
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    //画面を更新するためにrenderGridにセルの状態を与える
    if (data.type == "update"){
      grid = data.grid;
      renderGrid(grid);
    }
};
  //---end---

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
 
  //---start---
  // セルを反転させるためにクリックしたセルの行と列の情報を送る
    ws.send(JSON.stringify({ type: "toggle", row, col }));
  //---end---
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  grid = updateGrid(grid);
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  //---start---
  //ゲームをスタートするリクエストを送る
  ws.send(JSON.stringify({ type: "start" }));
  //---end---
});

pauseButton.addEventListener("click", () => {
  //---start---
  //ゲームを一時停止するリクエストを送る
  ws.send(JSON.stringify({ type: "pause" }));
  //---end---
});

renderGrid(grid);
