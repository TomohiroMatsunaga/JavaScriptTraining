import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  it("関数が成功すると、その結果を返す", async () => {
    const func = () => Promise.resolve('Success');
    await expect(retryWithExponentialBackoff(func, 3)).resolves.toBe('Success');    //resolves.toBeで正常に満たされた結果の値を確認している
  });

  it("関数が失敗すると、指定された回数だけリトライする", async () => {
    let attempts = 0;
    const func = () => {
      attempts++;
      return attempts < 3 ? Promise.reject(new Error("Fail")) : Promise.resolve('Success');
    };
    await expect(retryWithExponentialBackoff(func, 5)).resolves.toBe('Success');
    expect(attempts).toBe(3);
  });

  it("最大リトライ回数に達した場合、エラーを返す", async () => {
    const func = () => Promise.reject(new Error("Fail"));
    await expect(retryWithExponentialBackoff (func, 2)).rejects.toThrow("Max retry attempts reached. Last error: Error: Fail");
  });
});
