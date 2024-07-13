import { HiraganaChar } from "./index.js";

describe("HiraganaChar", () => {
  it("ひらがな1文字とそのUTF-16コード単位を持つ", () => {
    const char = new HiraganaChar("あ");
    expect(char.char).toBe("あ");
    expect(char.code).toBe(12354); // "あ"のUTF-16コード単位
  });

  it("UTF-16 コード単位順で比較できる", () => {
    const charA = new HiraganaChar("あ");
    const charI = new HiraganaChar("い");
    expect(Number(charA) < Number(charI)).toBe(true);
    expect(Number(charA) > Number(charI)).toBe(false);
  });

  it("文字列として期待される場合にひらがなを返す", () => {
    const char = new HiraganaChar("あ");
    expect(String(char)).toBe("あ");
  });

  it("数値として期待される場合にUTF-16コード単位を返す", () => {
    const char = new HiraganaChar("あ");
    expect(Number(char)).toBe(12354);
  });

  it("配列のソートが期待通りに動作する", () => {
    const chars = [
      new HiraganaChar("い"),
      new HiraganaChar("え"),
      new HiraganaChar("あ"),
      new HiraganaChar("う"),
      new HiraganaChar("お"),
    ];
    const sortedChars = chars.sort((a, b) => a - b); //数値として期待されている
    expect(sortedChars.map(char => char.char)).toEqual(["あ", "い", "う", "え", "お"]);
  });
});
