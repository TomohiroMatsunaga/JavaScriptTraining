export function createProxy(targetObject) {
    // メソッド呼び出し履歴を保存する配列
    const callHistory = [];
  
    // Proxy ハンドラを定義
    const handler = {
      get(targetObject, propKey, receiver) {
        const origMethod = targetObject[propKey];
        if (typeof origMethod === 'function') {
          return function(...args) {
            // メソッド呼び出し履歴に記録を追加
            callHistory.push({
              timestamp: new Date().toISOString(), // 呼び出された時刻
              method: propKey, // メソッド名
              args: args // 引数
            });
            // 元のメソッドを呼び出し、その結果を返す
            return origMethod(args);
          };
        }
        // プロパティが関数でない場合、そのままの値を返す
        return origMethod;
      }
    };
  
    // Proxy を作成
    const proxy = new Proxy(targetObject, handler);
  
    // Proxy と履歴を返す
    return { proxy, callHistory };
  }  