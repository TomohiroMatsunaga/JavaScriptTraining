'use strict';
x = 10; //未宣言のグローバル変数への代入はstrictモードではエラー
function demo() {
    y = 20; //関数内での未宣言の変数への代入はstrictモードではエラー
    console.log(y);
}
demo();
console.log(x, y);
