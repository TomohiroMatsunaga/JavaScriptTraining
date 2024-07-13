import { typeNameTemplate } from "./index.js";

describe("typeNameTemplate", () => {
  it("文字列を補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${"A"}`).toBe("string");
  });

  it("オブジェクトを補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${{ x: 1 }}`).toBe("object");
  });

  it("数値を補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${42}`).toBe("number");
  });

  it("ブール値を補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${true}`).toBe("boolean");
  });

  it("未定義を補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${undefined}`).toBe("undefined");
  });

  it("nullを補間する場合に型名を返す", () => {
    expect(typeNameTemplate`Value: ${null}`).toBe("object");
  });
});
