export function sequenceToObject(...values) {
    // 値の個数が偶数でない場合は例外を発生させる
    if (values.length % 2 !== 0) {
      throw new Error("引数の個数が偶数ではありません");
    }
  
    const obj = {};
    for (let i = 0; i < values.length; i += 2) {
      const key = values[i];
      const value = values[i + 1];
  
      // 奇数番の値がstringでない場合は例外を発生させる
      if (typeof key !== 'string') {
        throw new Error("奇数番の値がstring型ではありません");
      }
  
      obj[key] = value;
    }
  
    return obj;
  }