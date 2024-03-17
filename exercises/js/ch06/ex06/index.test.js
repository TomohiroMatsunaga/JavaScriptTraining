import { getAllPropertyNames } from "./index.js";

describe("getAllPropertyNames", () => {
  it("オブジェクトが持つプロパティを分析する", () => {
    const baseObj = {
      inheritedProp: 'inherited value'
  };

  const obj = Object.create(baseObj, {
    ownProp: {
        value: 'value',
        enumerable: true
    },
    ownNonEnumerableProp: {
        value: 'non enumerable value',
        enumerable: false
    }
});
const symbolKey = Symbol('uniqueSymbol');
obj[symbolKey] = 'symbol value';

    const result = getAllPropertyNames(obj);
    expect(result).toContain("inheritedProp");
    expect(result).toContain("ownProp");
    expect(result).toContain("ownNonEnumerableProp");
    expect(result).toContain(symbolKey);
    expect(result).toHaveLength(4); // 継承されたプロパティを含む総数
  });
});