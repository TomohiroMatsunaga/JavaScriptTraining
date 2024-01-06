import { areNumbersEqual } from "./index.js";

describe("areNumbersEqual", () => {
  it("0.3 - 0.2 と 0.1は同値である", () => {
    expect(areNumbersEqual(0.3 - 0.2, 0.1)).toBe(true);
  });

  it("0.2 - 0.1 と 0.1 は同値である", () => {
    expect(areNumbersEqual(0.2 - 0.1, 0.1)).toBe(true);
  });
});