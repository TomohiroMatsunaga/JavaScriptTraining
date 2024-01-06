export function fib(n) {
  if (n < 0) {
    throw new Error("Negative numbers are not allowed.");
  }
  if (n === 0) return 0;
  if (n === 1) return 1;

  let beforeNum = 0;
  let afterNum = 1;
  let current;

  for (let i = 2; i <= n; i++) {
    current = beforeNum + afterNum;
    beforeNum = afterNum;
    afterNum = current;
  }
  return current;
}
