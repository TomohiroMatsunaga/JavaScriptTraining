import { TypedMap } from './index.js';

describe('TypedMap', () => {
  describe('constructor関数と set関数のテスト', () => {
    it('正しい型のentriesで初期化される場合、エラーが発生しない', () => {
      const entries = [['key1', 'value1'], ['key2', 'value2']];
      expect(() => new TypedMap('string', 'string', entries)).not.toThrow();
    });

    it('型が一致しないentriesで初期化しようとすると、TypeErrorが発生する', () => {
      const entries = [['key1', 100], ['key2', 'value2']];
      expect(() => new TypedMap('string', 'string', entries)).toThrow(TypeError);
    });

    it('set関数で正しい型のkeyとvalueを追加すると、マップに正しく追加される', () => {
      const typedMap = new TypedMap('string', 'string');
      expect(() => typedMap.set('key1', 'value1')).not.toThrow();
      expect(typedMap.get('key1')).toBe('value1');
    });

    it('set関数で型が不一致のkeyまたはvalueを追加しようとすると、TypeErrorが発生する', () => {
      const typedMap = new TypedMap('string', 'string');
      expect(() => typedMap.set('key1', 100)).toThrow(TypeError);
      expect(() => typedMap.set(100, 'value1')).toThrow(TypeError);
    });
  });
});
