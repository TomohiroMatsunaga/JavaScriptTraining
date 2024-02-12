import { generateFibonacciWhile, generateFibonacciDoWhile, generateFibonacciFor } from "./index.js";

describe("generateFibonacciWhile", () => {
    it("最初の10個のフィボナッチ数列を生成する (whileループ)", () => {
        const result = generateFibonacciWhile();
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(result).toEqual(expected);
    });
});

describe("generateFibonacciDoWhile", () => {
    it("最初の10個のフィボナッチ数列を生成する (do/whileループ)", () => {
        const result = generateFibonacciDoWhile();
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(result).toEqual(expected);
    });
});

describe("generateFibonacciFor", () => {
    it("最初の10個のフィボナッチ数列を生成する (forループ)", () => {
        const result = generateFibonacciFor();
        const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        expect(result).toEqual(expected);
    });
});
