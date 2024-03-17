import { pop, push, shift, unshift, sort } from './index.js';

describe('非破壊的な配列操作関数のテスト', () => {
  const seq = [1, 2, 3, 4, 5];

  it('popが配列の最後の要素を正しく取り除く', () => {
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
  });

  it('pushが配列の最後に要素を正しく追加する', () => {
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('shiftが配列の最初の要素を正しく取り除く', () => {
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
  });

  it('unshiftが配列の最初に要素を正しく追加する', () => {
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('sortが配列を指定された比較関数に従って正しくソートする', () => {
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
  });

  // 元の配列が変更されていないことを確認するテスト
  it('元の配列が変更されていないことを確認', () => {
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});