import { fib } from './index.js';

describe('fib function', () => {
  it('calculates correct fib value for 0', () => {
    expect(fib(0)).toBe(0);
  });

  it('calculates correct fib value for 1', () => {
    expect(fib(1)).toBe(1);
  });

  it('calculates correct fib value for 5', () => {
    expect(fib(5)).toBe(5);
  });

  it('calculates correct fib value for 50', () => {
    expect(fib(50)).toBe(12586269025);
  });

  it('throws an error for negative index', () => {
    expect(() => fib(-1)).toThrow("Negative numbers are not allowed.");
  });
});
