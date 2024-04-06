let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y

console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true
console.log(p.isPrototypeOf(q)); // true 

// Object のプロトタイプチェーンの確認
console.log(Object.prototype.isPrototypeOf({})); // true
console.log(Object.prototype.isPrototypeOf([])); // true
console.log(Object.prototype.isPrototypeOf(new Date())); // true
console.log(Object.prototype.isPrototypeOf(new Map())); // true

// Array のプロトタイプチェーンの確認
console.log(Array.prototype.isPrototypeOf([])); // true
console.log(Array.prototype.isPrototypeOf({})); // false
console.log(Array.prototype.isPrototypeOf(new Date())); // false
console.log(Array.prototype.isPrototypeOf(new Map())); // false

// Date のプロトタイプチェーンの確認
console.log(Date.prototype.isPrototypeOf(new Date())); // true
console.log(Date.prototype.isPrototypeOf({})); // false
console.log(Date.prototype.isPrototypeOf([])); // false
console.log(Date.prototype.isPrototypeOf(new Map())); // false

// Map のプロトタイプチェーンの確認
console.log(Map.prototype.isPrototypeOf(new Map())); // true
console.log(Map.prototype.isPrototypeOf({})); // false
console.log(Map.prototype.isPrototypeOf([])); // false
console.log(Map.prototype.isPrototypeOf(new Date())); // false