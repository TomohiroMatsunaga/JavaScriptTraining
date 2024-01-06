export function abs(x) {
  return x < 0 ? -x : x;
}

export function sum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

export function factorial(n) {
  if (n < 0) {
    throw new Error('Negative numbers are not allowed.');
  }
  if (n === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}