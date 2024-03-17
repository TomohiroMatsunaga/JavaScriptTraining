import { addMatrices, multiplyMatrices } from "./index.js";

describe("addMatrices", () => {
  it("2つの行列が与えられたとき、それらの要素ごとの和を持つ行列を返す", () => {
    const A = [[1, 2], [3, 4]];
    const B = [[5, 6], [7, 8]];
    const expected = [[6, 8], [10, 12]];
    expect(addMatrices(A, B)).toEqual(expected);
  });
});

describe("multiplyMatrices", () => {
  it("2つの行列が与えられたとき、それらの積を持つ行列を返す", () => {
    const A = [
        [1, 2],
        [3, 4]
    ];
    const B = [
        [5, 6], 
        [7, 8]
    ];
    const expected = [
        [19, 22],
        [43, 50]
    ];
    expect(multiplyMatrices(A, B)).toEqual(expected);
  });
});

describe("multiplyMatrices", () => {
    it("2x3行列と3x2行列が与えられたとき、それらの積を持つ2x2行列を返す", () => {
      const A = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const B = [
        [7, 8],
        [9, 10],
        [11, 12]
      ];
      const expected = [
        [58, 64],
        [139, 154]
      ];
      expect(multiplyMatrices(A, B)).toEqual(expected);
    });
  });
