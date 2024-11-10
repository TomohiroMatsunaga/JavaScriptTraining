// 50 x 50 の盤面とする
export const ROWS = 50;
export const COLS = 50;

/**
 * Life Game のルールに従ってセルを更新する
 * @param {Array<Array<boolean>>} grid
 * @returns {Array<Array<boolean>>}
 */
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する

      // 周囲のセルの生存数の合計
      let livingNeighbors = 0;

      // 8つの近隣セルの座標
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
      ];

      // 8つの隣接するセルを調べる
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
      if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {
        nextGrid[row][col] = false;
      } else if (!isAlive && livingNeighbors === 3) {
        nextGrid[row][col] = true;
      }
      // その他の場合は状態を維持
    }
  }
  return nextGrid;
}
