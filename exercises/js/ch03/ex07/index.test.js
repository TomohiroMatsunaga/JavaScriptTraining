import { equalArrays } from "./index.js"; // typescript で書く場合は "./index.ts"

describe('equalArrays', () => {
  test('オブジェクトは参照一致なので値は明らかに違うのにtrueを返す', () => {
    const obj = { key: "value" };
    const array1 = [obj, obj];
    const array2 = [obj, obj];
    expect(equalArrays(array1, array2)).toBe(true); //
  });
});
