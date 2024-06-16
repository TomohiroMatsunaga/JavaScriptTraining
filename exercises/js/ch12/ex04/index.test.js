import { primeGenerator } from "./index.js";

describe("primeGenerator", () => {
    it("最初の9つの素数が正しく生成されていることを確認", () => {
        const gen = primeGenerator();
        expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(3);
        expect(gen.next().value).toBe(5);
        expect(gen.next().value).toBe(7);
        expect(gen.next().value).toBe(11);
        expect(gen.next().value).toBe(13);
        expect(gen.next().value).toBe(17);
        expect(gen.next().value).toBe(19);
        expect(gen.next().value).toBe(23);
    });
});
