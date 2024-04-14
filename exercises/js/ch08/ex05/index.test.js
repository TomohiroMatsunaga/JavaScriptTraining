import { sequenceToObject } from './index.js';

describe('sequenceToObject function', () => {
  it('キーと値のペアが正しくオブジェクトに変換される', () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
  });

  it('引数の個数が偶数でない場合にエラーを投げる', () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow("引数の個数が偶数ではありません");
  });

  it('奇数番の値がstringでない場合にエラーを投げる', () => {
    expect(() => sequenceToObject("a", 1, 2, 3)).toThrow("奇数番の値がstring型ではありません");
  });

  it('スプレッド演算子で配列を与えることができる', () => {
    const data = ["a", 1, "b", 2];
    expect(sequenceToObject(...data)).toEqual({ a: 1, b: 2 });
  });
});
