const geval = eval;
let x = "global";
let y = "global";
 
export function f() {
  let x = "local";
  eval("x += 'changed';");
  return x;
}
 
export function g() {
  let y = "local";
  geval("y += 'changed'");
  return y;
}
 
console.log(f(), x);
console.log(g(), y);