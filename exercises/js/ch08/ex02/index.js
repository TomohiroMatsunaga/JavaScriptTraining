// 工夫：指数を半分に分割することで再起の回数を減らしている。
// 再帰
export function powRecursive(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / powRecursive(x, -n);
    let half = powRecursive(x, Math.floor(n / 2)); //floorは小数点以下を切り捨て
    return n % 2 === 0 ? half * half : x * half * half; //指数が奇数の場合、切り捨てられた分のｘを1つ多く掛ける
  }
  
  // ループ
  export function powLoop(x, n) {
    if (n === 0) return 1;
    if (n < 0) {
      x = 1 / x;
      n = -n;
    }
    let result = 1;
    while (n > 0) {
      if (n % 2 === 1) result *= x; //指数が奇数の場合、切り捨てられた分のｘを1つ多く掛ける
      x *= x;
      n = Math.floor(n / 2);
    }
    return result;
  }
  