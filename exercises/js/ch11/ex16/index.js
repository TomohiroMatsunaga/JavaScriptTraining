export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let attempt = 0;

    function executeFunction() {
        if (func()) {
            callback(true);
        } else {
            if (attempt < maxRetry) {
                attempt++;
                const delay = Math.pow(2, attempt - 1) * 1000;
                setTimeout(executeFunction, delay);  //  1秒, 2秒, 4秒,,, 後に再びexecuteFunctionを実行する
            } else {
                // リトライ回数がmaxRetryに達した場合、失敗としてcallbackを呼び出す
                callback(false);
            }
        }
    }

    executeFunction();
}
