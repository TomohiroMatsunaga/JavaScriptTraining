import { createProxy } from "./index.js";

describe("createLoggingProxy", () => {
  it("メソッド呼び出し履歴を記録する", () => {
    const targetObject = {
      add(a, b) {
        return a + b;
      },
      multiply(a, b) {
        return a * b;
      }
    };

    const { proxy, callHistory } = createProxy(targetObject);

    // メソッドを呼び出す
    proxy.add(1, 2);
    proxy.multiply(2, 3);

    // 履歴を確認する
    expect(callHistory.length).toBe(2);
    expect(callHistory[0].method).toBe('add');
    expect(callHistory[0].args).toEqual([1, 2]);
    expect(callHistory[1].method).toBe('multiply');
    expect(callHistory[1].args).toEqual([2, 3]);

    // 呼び出された時刻が正しい形式かを確認する
    expect(new Date(callHistory[0].timestamp).toString()).not.toBe('Invalid Date'); //Date オブジェクトを作成するときに無効な日付を渡すとInvalid Dateという文字列を持つDateオブジェクトが作成される
    expect(new Date(callHistory[1].timestamp).toString()).not.toBe('Invalid Date');
  });
});
