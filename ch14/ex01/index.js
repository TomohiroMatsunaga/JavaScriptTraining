// プロパティを書き換え不可かつ設定変更不可にしたオブジェクトを返す関数
export function unwritableAndUnconfigurableObj() {
    const obj = { a: 1 };
  
    // プロパティ 'a' に対して書き換え不可 (writable: false) 
    // および 設定変更不可 (configurable: false) を設定
    Object.defineProperty(obj, 'a', {
      writable: false, // プロパティの値を変更できない
      configurable: false // プロパティの設定（書き換えや削除）を変更できない
    });
  
    return obj;
  }
  
  // プロパティを書き換え可能かつ設定変更不可にしたオブジェクトを返す関数
  export function writableAndUnconfigurableObj() {
    const obj = { b: 2 };
  
    // プロパティ 'b' に対して書き換え可能 (writable: true) 
    // および 設定変更不可 (configurable: false) を設定
    Object.defineProperty(obj, 'b', {
      writable: true,
      configurable: false
    });
  
    // 作成したオブジェクトを返す
    return obj;
  }
  
  // ネストされたプロパティを持ち、全てのプロパティを書き換え不可にしたオブジェクトを返す関数
  export function nestedUnwritableObj() {
    const obj = { c: { d: { e: 3 } }};
  
    // 再帰的にオブジェクトを凍結する関数
    const freezeAll = (o) => {
      Object.keys(o).forEach((key) => {
        if (typeof o[key] === 'object' && o[key] !== null) {
            freezeAll(o[key]);
        }
      });
  
      // freezeを使うことでオブジェクト内の全プロパティを変更不可にできる
      return Object.freeze(o);
    };
  
    // ネストされたオブジェクト全体を凍結して返す
    return freezeAll(obj);
  }