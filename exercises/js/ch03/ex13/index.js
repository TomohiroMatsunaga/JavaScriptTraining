class Example {
  valueOf() {
    return 1234;
  }

  toString() {
    return "Example"; // 例として固定の文字列を返す
  }
}


let obj = new Example();

// valueOf() の呼び出し。数値優先アルゴリズム
console.log(Number(obj)); 
// toString() の呼び出し。文字列優先アルゴリズム
console.log(String(obj));
