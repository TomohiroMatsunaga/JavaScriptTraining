//updateGridの実装を移植したのみ。変更していない。

import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
.fill(null)
.map(() =>
  new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
);
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
  // 接続されたクライアントに初期のグリッドを送信
  ws.send(JSON.stringify({ type: "update", grid }));

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    switch (data.type) {
      case "toggle": // セルの反転
        grid[data.row][data.col] = !grid[data.row][data.col];
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
      case "pause": // 停止
        paused = true;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "pause" }));
          }
        });
        break;
      case "start": // 開始・再開
        paused = false;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "start" }));
          }
        });
        break;
    }
  });
});

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
      //（15.04-10.10の実装を利用）


      //-----移植部分開始位置

      // 周囲のセルの生存数の合計
      let livingNeighbors = 0;

      // 8つの近隣セルの座標
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
      ];

      //8つの隣接するセルを調べて、生存していたら(trueなら)livingNeighborsに1を足す
      neighbors.forEach(([dx, dy]) => {
        const x = row + dx;
        const y = col + dy;
        
        // グリッドの範囲内であるかをチェック
        if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
          livingNeighbors += grid[x][y] ? 1 : 0;
        }
      });

      // 更新するセルの現在の状態
      const isAlive = grid[row][col];

      // ゲームのルールに従って次の状態を決定
      // 「自身が生きていて周りに生きている細胞が1つもない」or「自身が生きていて4つ以上生きている細胞がある」ときは死ぬ
      if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {
        nextGrid[row][col] = false;
      } 
      // 「自身が死んでいて周りに丁度3つの生きている細胞がある」ときは誕生する
      else if (!isAlive && livingNeighbors === 3) {
        nextGrid[row][col] = true;
      }
      //その他の場合は細胞の死や誕生に影響しない

      //-----移植部分終了位置


    }
  }
  return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
  const message = JSON.stringify({ type: "update", grid });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
  if (paused) {
    return;
  }
  grid = updateGrid(grid);
  broadcast(grid);
}, 1000 / FRAME_RATE);
