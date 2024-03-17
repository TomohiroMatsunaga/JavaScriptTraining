import { assign } from "./index.js";

describe('assign function', () => {
    it('列挙可能な自身のプロパティをコピーし、シンボルを含め、プロパティを上書きする', () => {
      const symbolKey1 = Symbol('Symbol1');
      const symbolKey2 = Symbol('Symbol2');
      const target = { prop: 'target', [symbolKey1]: 'targetSymbol' };
      const proto = { protoProp: 'protoValue' };
      const source1 = Object.create(proto, { prop: { value: 'source1', enumerable: true }});
      const source2 = { prop2: 'source2Prop2' };
      const source3 = { prop: 'source3', [symbolKey2]: 'source3Symbol' };
  
      const result = assign(target, source1, source2, source3);
  
      // 1. 列挙可能な独自プロパティをコピー（プロトタイプはコピーしない）
      // 2. Symbolプロパティをコピー
      // 3. 同名のプロパティがある場合、上書き
      // 4. 上書きされたプロパティの確認
      expect(result).toEqual({
        prop: 'source3', // source1によってtargetが上書きされ、その後source3によって再上書きされる
        prop2: 'source2Prop2', // source1によって追加され、source2によって上書きされる
        [symbolKey1]: 'targetSymbol', // source1によってtargetが上書きされる
        [symbolKey2]: 'source3Symbol' // source3によって追加される
      });
    });
  });
  