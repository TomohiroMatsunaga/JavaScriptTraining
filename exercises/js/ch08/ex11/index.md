以下のコードを実行した。
実行結果は、カスタムの関数はその関数の宣言文を返した。一方、組み込み関数の場合は関数本体としてfunction abs() { [native code] }を返した。

実行したコード
function myFunction() {
    return "Hello, World!";
}

// ユーザー定義関数の toString()
console.log(myFunction.toString());

// 組み込み関数の toString()
console.log(Math.abs.toString());

実行結果

function myFunction() {
    return "Hello, World!";
}
function abs() { [native code] }