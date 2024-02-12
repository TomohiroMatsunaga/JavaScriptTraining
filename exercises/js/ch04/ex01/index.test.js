import { add, sub, mul, div } from "./index.js";

// 複素数の加算テスト
describe("add", () => {
  it("二つの複素数を加算すると、実部と虚部の合計を返す", () => {
    const c1 = { real: 1, imaginary: 2 }; // 複素数 1 + 2i
    const c2 = { real: 3, imaginary: 4 }; // 複素数 3 + 4i
    expect(add(c1, c2)).toEqual({ real: 4, imaginary: 6 });
  });
});

// 複素数の減算テスト
describe("sub", () => {
  it("二つの複素数を減算すると、実部と虚部の差を返す", () => {
    const c1 = { real: 1, imaginary: 2 };
    const c2 = { real: 3, imaginary: 4 };
    expect(sub(c1, c2)).toEqual({ real: -2, imaginary: -2 });
  });
});

// 複素数の乗算テスト
describe("mul", () => {
  it("二つの複素数を乗算すると、実部と虚部の積を返す", () => {
    const c1 = { real: 1, imaginary: 2 };
    const c2 = { real: 3, imaginary: 4 };
    expect(mul(c1, c2)).toEqual({ real: -5, imaginary: 10 });
  });
});

// 複素数の除算テスト
describe("div", () => {
  it("二つの複素数を除算すると、実部と虚部の商を返す", () => {
    const c1 = { real: 1, imaginary: 2 };
    const c2 = { real: 3, imaginary: 4 };
    const result = div(c1, c2);
    // 浮動小数点の精度による誤差を考慮して、近似値で比較する
    expect(result.real).toBeCloseTo(0.44, 2);
    expect(result.imaginary).toBeCloseTo(0.08, 2);
  });
});