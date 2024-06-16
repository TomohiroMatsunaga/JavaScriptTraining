import { fibonacci } from "./index.js";

describe("fibonacci", () => {
  it("フィボナッチ数列の最初の五つの数が正しいことを確認", () => {
    const fib = fibonacci();
    const results = [];
    for (let i = 0; i < 5; i++) {
      results.push(fib.next().value);
    }
    expect(results).toEqual([1, 1, 2, 3, 5]);
  });

  it("フィボナッチ数列が続き続けていることを確認", () => {
    const fib = fibonacci();
    let count = 0;
    for (let number of fib) {
      count++;
      if (count > 1000) break; //10000以上続いていることを確認
    }
    expect(count).toBeGreaterThan(1000);
  });
});
