import { filterEvenValues } from './index.js';

describe('filterEvenValues', () => {
    it('オブジェクトから偶数のプロパティをフィルタリングする', () => {
        const inputObj = { a: 1, b: 2, c: 3, d: 4 };
        const expectedResult = { b: 2, d: 4 };
        const result = filterEvenValues(inputObj);
        expect(result).toEqual(expectedResult);
    });
});
