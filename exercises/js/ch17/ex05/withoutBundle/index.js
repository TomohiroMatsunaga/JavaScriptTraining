import { updateGrid, ROWS, COLS } from './updateGrid.js';
import { renderGrid, RESOLUTION } from './renderGrid.js';

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

// // grid を canvas に描画する
// function renderGrid(grid) {
//   for (let row = 0; row < ROWS; row++) {
//     for (let col = 0; col < COLS; col++) {
//       const cell = grid[row][col];
//       ctx.beginPath();
//       ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
//       ctx.fillStyle = cell ? "black" : "white";
//       ctx.fill();
//       ctx.stroke();
//     }
//   }
// }

// // Life Game のルールに従ってセルを更新する
// function updateGrid(grid) {
//   // 新しいグリッドを作成
//   const nextGrid = grid.map((arr) => [...arr]);

//   for (let row = 0; row < ROWS; row++) {
//     for (let col = 0; col < COLS; col++) {
//       // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
//       //-----実装部分開始位置

//       // 周囲のセルの生存数の合計
//       let livingNeighbors = 0;

//       // 8つの近隣セルの座標
//       const neighbors = [
//         [-1, -1], [-1, 0], [-1, 1],
//         [ 0, -1],          [ 0, 1],
//         [ 1, -1], [ 1, 0], [ 1, 1]
//       ];

//       //8つの隣接するセルを調べて、生存していたら(trueなら)livingNeighborsに1を足す
//       neighbors.forEach(([dx, dy]) => {
//         const x = row + dx;
//         const y = col + dy;
        
//         // グリッドの範囲内であるかをチェック
//         if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
//           livingNeighbors += grid[x][y] ? 1 : 0;
//         }
//       });

//       // 更新するセルの現在の状態
//       const isAlive = grid[row][col];

//       // ゲームのルールに従って次の状態を決定
//       // 「自身が生きていて周りに生きている細胞が1つもない」or「自身が生きていて4つ以上生きている細胞がある」ときは死ぬ
//       if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {
//         nextGrid[row][col] = false;
//       } 
//       // 「自身が死んでいて周りに丁度3つの生きている細胞がある」ときは誕生する
//       else if (!isAlive && livingNeighbors === 3) {
//         nextGrid[row][col] = true;
//       }
//       //その他の場合は細胞の死や誕生に影響しない

//       //-----実装部分終了位置
//     }
//   }
//   return nextGrid;
// }

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(ctx, grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  grid = updateGrid(grid);
  renderGrid(ctx, grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(ctx, grid);
