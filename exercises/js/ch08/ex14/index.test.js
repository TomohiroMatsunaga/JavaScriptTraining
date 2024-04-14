import { any, catching } from "./index.js";

describe('any関数', () => {
    test('いずれかの関数が true を返せば true を返すこと', () => {
        const isNonZero = any(
            n => n > 0,
            n => n < 0
        );
        expect(isNonZero(0)).toBe(false);
        expect(isNonZero(42)).toBe(true);
        expect(isNonZero(-0.5)).toBe(true);
    });
});

describe('catching関数', () => {
    test('例外が発生した場合に例外を 2 つ目の関数の引数に渡すこと', () => {
        const safeJsonParse = catching(JSON.parse, e => {
            return { error: e.toString() };
        });

        // 正常なJSON
        expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });

        // 不正なJSON
        const result = safeJsonParse("{Invalid Json}");
        expect(result.error).toContain("SyntaxError");
    });
});
