import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("日本語文字列のソート", () => {
    it("大文字・小文字、濁点・半濁点を無視して日本語文字列をソートする", () => {
        const input = ['あか', 'アオ', 'っ', 'アカ', 'ぱ', 'は', 'きいろ', 'ば', 'あお', 'キイロ', 'つ', 'か', 'が'];
        const expected = ['アオ', 'あお', 'あか', 'アカ', 'か', 'が', 'きいろ', 'キイロ', 'っ', 'つ', 'ぱ', 'は', 'ば'];
        expect(sortJapanese(input)).toEqual(expected);
    });
});


describe("和暦日付のフォーマット", () => {
    it("Dateオブジェクトを受け取り、和暦の形式で日付の文字列を返す", () => {
        const date = new Date(2024, 4, 17); // 月は0から始まるため、5月は4を指定
        const expected = "令和6年5月17日";
        expect(toJapaneseDateString(date)).toBe(expected);
    });
});
