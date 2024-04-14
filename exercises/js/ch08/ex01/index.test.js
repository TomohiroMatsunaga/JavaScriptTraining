import { repeatAndReturn, square, getCurrentTime } from './index.js';

describe('関数のテスト', () => {
    it('自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す', () => {
        const result = repeatAndReturn(3, 'a');
        expect(result).toEqual(['a', 'a', 'a']);
    });

    it('数値xを引数にとり、xの二乗の数値を返す関数', () => {
        expect(square(3)).toBe(9);
    });

    it('引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す関数', () => {
        const result = getCurrentTime();
        expect(result).toHaveProperty('now');
        expect(result.now).toBeInstanceOf(Date);
    });
});
