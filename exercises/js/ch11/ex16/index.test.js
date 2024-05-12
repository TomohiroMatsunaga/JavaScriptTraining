import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
    const returnTrueOnThirdTry = (() => { 
        let attempts = 0;
        return () => {
            attempts++;
            return attempts > 2;
        };
    })();

    it("3回目trueを返す", (done) => {
        const maxRetry = 3;
        retryWithExponentialBackoff(returnTrueOnThirdTry, maxRetry, (result) => {
            try {
                expect(result).toBe(true);
                done(); //非同期処理のとき、コールバックdoneを返さないとテストが失敗になる
            } catch (error) {
                done(error);
            }
        });
    });

    it("常にfalseを返す", (done) => {
        const alwaysFalse = () => false;
        const maxRetry = 3;
        retryWithExponentialBackoff(alwaysFalse, maxRetry, (result) => {
            try {
                expect(result).toBe(false);
                done();
            } catch (error) {
                done(error);
            }
        });
    }, 10000);  // タイムアウトを10000 ms (10秒) に設定
});
