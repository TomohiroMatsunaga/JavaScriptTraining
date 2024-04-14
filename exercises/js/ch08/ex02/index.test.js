import { powRecursive, powLoop } from './index.js';

describe('べき乗関数のテスト', () => {
  describe('powRecursive', () => {
    it('正の整数のべき乗を正しく計算する', () => {
      expect(powRecursive(2, 3)).toBe(8);
    });
    it('ゼロのべき乗を正しく計算する', () => {
      expect(powRecursive(2, 0)).toBe(1);
    });
    it('負の整数のべき乗を正しく計算する', () => {
      expect(powRecursive(2, -3)).toBeCloseTo(0.125);
    });
  });

  describe('powLoop', () => {
    it('正の整数のべき乗を正しく計算する', () => {
      expect(powLoop(2, 3)).toBe(8);
    });
    it('ゼロのべき乗を正しく計算する', () => {
      expect(powLoop(2, 0)).toBe(1);
    });
    it('負の整数のべき乗を正しく計算する', () => {
      expect(powLoop(2, -3)).toBeCloseTo(0.125);
    });
  });
});
