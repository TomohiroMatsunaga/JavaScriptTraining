import { resettableCounter } from './index.js';

describe("resettableCounter ジェネレータ関数", () => {
  it('カウンターが正しく増加する', () => {
    const counter = resettableCounter();
    expect(counter.next().value).toBe(0); // 最初は 0
    expect(counter.next().value).toBe(1); // 次は 1
    expect(counter.next().value).toBe(2); // その次は 2
  });

  it("resetエラーでカウンタがリセットされる", () => {
    const counter = resettableCounter();
    expect(counter.next().value).toBe(0); //0
    expect(counter.next().value).toBe(1); //1
    counter.throw("reset"); //resetでリセット
    expect(counter.next().value).toBe(0); //0
    expect(counter.next().value).toBe(1); //1
  });

  it("resetエラー以外で例外がスローされる", () => {
    const counter = resettableCounter();
    expect(counter.next().value).toBe(0); // 最初は 0
    expect(() => counter.throw("error")).toThrow("error"); //error例外が発生
  });
});
