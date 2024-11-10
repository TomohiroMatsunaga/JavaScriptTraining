// 1セルのサイズ
export const RESOLUTION = 10;

import { ROWS, COLS } from './updateGrid.js';

/**
 * grid を canvas に描画する
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<Array<boolean>>} grid
 */
export function renderGrid(ctx, grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}
