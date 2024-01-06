import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  
  describe("sum", () => {
  	it("returns sum of an array of numbers", () => {
	    expect(sum([1, 2, 3])).toBe(6);
	});

	it("returns zero for an empty array", () => {
	expect(sum([])).toBe(0);
	});

	it("correctly adds negative numbers", () => {
		expect(sum([-1, -2, -3])).toBe(-6);
	});
  });

  describe("factorial", () => {
    it("returns 1 for 0", () => {
      expect(factorial(0)).toBe(1);
    });

    it("returns factorial of a positive number", () => {
      expect(factorial(5)).toBe(120);
    });
 
    it("throws error for negative numbers", () => {
      expect(() => factorial(-1)).toThrow("Negative numbers are not allowed.");
    });
  });

});
