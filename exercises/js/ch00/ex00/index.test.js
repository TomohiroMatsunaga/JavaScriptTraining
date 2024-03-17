import { f, g } from "./index.js";

describe("eval", () => {
  it("f()", () => {
    expect(f()).toBe("localchanged");
  });
  it("g()", () => {
    expect(g()).toBe("localchanged");
  });
});
