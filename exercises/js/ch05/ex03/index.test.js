import { isWeekendIfElse, isWeekendSwitch } from "./index.js";

describe("isWeekendIfElse", () => {
    it("土曜日は週末なのでtrue を返す", () => {
        expect(isWeekendIfElse("土")).toBe(true);
    });

    it("日曜日は週末なので true を返す", () => {
        expect(isWeekendIfElse("日")).toBe(true);
    });

    it("月曜日は週末ではないため false を返す", () => {
        expect(isWeekendIfElse("月")).toBe(false);
    });

    it("水曜日は週末ではないため false を返す", () => {
        expect(isWeekendIfElse("水")).toBe(false);
    });
});

describe("isWeekendSwitch", () => {
    it("土曜日は週末なので true を返す", () => {
        expect(isWeekendSwitch("土")).toBe(true);
    });

    it("日曜日は週末なので true を返す", () => {
        expect(isWeekendSwitch("日")).toBe(true);
    });

    it("月曜日は週末ではないため false を返す", () => {
        expect(isWeekendSwitch("月")).toBe(false);
    });

    it("水曜日は週末ではないため false を返す", () => {
        expect(isWeekendSwitch("水")).toBe(false);
    });
});
