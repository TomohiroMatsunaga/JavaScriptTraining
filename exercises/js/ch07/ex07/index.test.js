import { bubbleSort } from './index.js';

describe('bubbleSort 関数', () => {
  it('数字の配列を正しくソートする', () => {
    expect(bubbleSort([3, 2, 1, 5, 4])).toEqual([1, 2, 3, 4, 5]);
  });

  it('既にソートされた配列がそのまま返される', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('空の配列を正しく扱う', () => {
    expect(bubbleSort([])).toEqual([]);
  });

  it('負の数を含む配列を正しくソートする', () => {
    expect(bubbleSort([-3, -1, -2, -5, -4])).toEqual([-5, -4, -3, -2, -1]);
  });

  it('同じ値を含む配列を正しくソートする', () => {
    expect(bubbleSort([3, 3, 2, 1, 2])).toEqual([1, 2, 2, 3, 3]);
  });
});
