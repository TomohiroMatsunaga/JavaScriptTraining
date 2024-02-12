//typeof 演算子のオペランドに以下の値を指定したときの予想
//`undefined` -> "undefined"
//`null` -> "object"
//`オブジェクト` -> "object"
//`NaN` -> "number"
//`数値` -> "number"
//`関数` -> "function"

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object"
console.log(typeof {});        // "object"
console.log(typeof NaN);       // "number"
console.log(typeof 777);        // "number"
console.log(typeof function() {}); // "function"
