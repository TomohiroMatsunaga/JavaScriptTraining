import { cache, slowFn } from "./index.js";

describe("Cached slowFn", () => {
  let cachedSlowFn;
  let obj;

  beforeEach(() => {
    cachedSlowFn = cache(slowFn);
    obj = { a: 1, b: 2, c: 3 };  // テスト用のオブジェクト
  });

  it("初回の呼び出しで正確な結果が計算される", () => {
    const expected = { value: 3 };
    const start = Date.now();
    const result = cachedSlowFn(obj);
    const duration = Date.now() - start;
    expect(result).toEqual(expected);
    expect(duration).toBeGreaterThanOrEqual(2000);  // 2秒以上かかることを確認
  });

  it("2回目の呼び出しでキャッシュから結果が返される", () => {
    cachedSlowFn(obj);  // 最初に実行してキャッシュさせる
    const start = Date.now();
    const result = cachedSlowFn(obj);
    const duration = Date.now() - start;
    expect(result).toEqual({ value: 3 });
    expect(duration).toBeLessThan(50);  // 高速に結果が返ることを確認（50ms 未満であることを期待）
  });

  it("異なるオブジェクトが与えられると新たな計算が行われる", () => {
    const obj2 = { a: 1, b: 2, c: 3, d: 4 };
    const expected = { value: 4 };
    cachedSlowFn(obj);  // 最初に別のオブジェクトでキャッシュさせる
    const start = Date.now();
    const result = cachedSlowFn(obj2);
    const duration = Date.now() - start;
    expect(result).toEqual(expected);
    expect(duration).toBeGreaterThanOrEqual(2000);  // 2秒以上かかることを確認
  });
});
