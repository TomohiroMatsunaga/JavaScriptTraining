import { equals } from "./index.js"; // typescript で書く場合は "./index.ts"

describe('equals', () => {
  test('オブジェクトが同じ内容なら true を返す', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2 };
    expect(equals(a, b)).toBe(true);
  });
});