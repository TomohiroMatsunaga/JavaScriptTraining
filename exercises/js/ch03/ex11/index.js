// Symbol() を使用して同じ文字列から異なるシンボルを作成
const symbol1 = Symbol("mySymbol");
const symbol2 = Symbol("mySymbol");

// オブジェクトにシンボルをプロパティとして追加
let obj = {};
obj[symbol1] = "値1";
obj[symbol2] = "値2";

// 各プロパティの値を取得
console.log(`obj[symbol1]: ${obj[symbol1]}`);  // "値1"
console.log(`obj[symbol2]: ${obj[symbol2]}`);  // "値2"

// Symbol.for() を使用して同じ名前のシンボルを作成
const symbolFor1 = Symbol.for("mySymbol");
const symbolFor2 = Symbol.for("mySymbol");

// オブジェクトにシンボルをプロパティとして追加
let objFor = {};
objFor[symbolFor1] = "値1";
objFor[symbolFor2] = "値2";  // symbolFor1 と symbolFor2 は同じシンボル

// 各プロパティの値を取得
console.log(`objFor[symbolFor1]: ${objFor[symbolFor1]}`);  // "値2"
console.log(`objFor[symbolFor2]: ${objFor[symbolFor2]}`);  // "値2"
