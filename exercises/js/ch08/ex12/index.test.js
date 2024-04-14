import { f } from "./index.js";

describe("f function", () => {
  test("足し算が正しく実行されるかをテスト", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.reduce(f("$1 + $2"), 0);
    expect(result).toBe(15);
  });

  test("引き算を用いたソートが正しく実行されるかをテスト", () => {
    const arr = [5, 3, 4, 1, 2];
    const sortedArr = arr.sort(f("$1 - $2"));
    expect(sortedArr).toEqual([1, 2, 3, 4, 5]);
  });

  test("10個の引数を扱い、正確に計算が行われるかをテスト", () => {
    const func = f("$1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10");
    const result = func(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    expect(result).toBe(55);
  });
});