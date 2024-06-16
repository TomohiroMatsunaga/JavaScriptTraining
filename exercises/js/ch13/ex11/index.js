export function retryWithExponentialBackoff(func, maxRetry) {
    return new Promise((resolve, reject) => {
      let attempt = 0;
  
      function executeFunction() {
        func().then(result => { //funcが成功したら（満たされたら）thenに進む
          resolve(result);
        }).catch(error => { //失敗したらcatchに進む
          if (attempt < maxRetry) {
            attempt++;
            const delay = Math.pow(2, attempt - 1) * 1000;
            setTimeout(executeFunction, delay); //  1秒, 2秒, 4秒,,, 後に再びexecuteFunctionを実行する
          } else {
            // リトライ回数がmaxRetryに達した場合、失敗とする
            reject(new Error(`Max retry attempts reached. Last error: ${error}`));
          }
        });
      }
  
      executeFunction();
    });
  }
  