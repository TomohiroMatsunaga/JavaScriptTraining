import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  let typeMap;
  class Foo {}

  beforeEach(() => {
    typeMap = new TypeMap();
  });

  it("コンストラクタ関数とそのインスタンスを正しく保存し取得できる", () => {
    const fooInstance = new Foo();
    typeMap.set(String, new String("string"));
    typeMap.set(Number, new Number(123));
    typeMap.set(Foo, fooInstance);

    expect(typeMap.get(String).toString()).toBe("string");
    expect(typeMap.get(Number).valueOf()).toBe(123);
    expect(typeMap.get(Foo)).toBe(fooInstance);
  });

  it("コンストラクタ関数のインスタンスでない場合にエラーを投げる", () => {
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow("値はキーのコンストラクタ関数のインスタンスである必要があります");
  });
});
