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