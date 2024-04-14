import {C, createC} from "./index.js";

describe('プライベートフィールドを使用', () => {
    test('getX()がプライベートフィールドの値を正しく返すこと', () => {
      const c = new C();
      expect(c.getX()).toBe(42);
    });
  });
  
describe('クロージャを使用', () => {
    test('getX()がクロージャ内の変数の値を正しく返すこと', () => {
      const C = createC();
      const instance = new C();
      expect(instance.getX()).toBe(42);
    });
  });
  