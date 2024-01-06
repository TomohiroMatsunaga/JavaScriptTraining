describe("Emoji Tests", () => {
  const emoji = "💯";
  const utf16 = "\uD83D\uDCAF";
  const utf32 = "\u{0001F4AF}";

  it("絵文字 💯 の length は 2 である", () => {
    expect(emoji.length).toBe(2);
  });

  it("絵文字 💯 は UTF-16 コードポイント表現 \uD83D\uDCAF と同値である", () => {
    expect(emoji).toBe(utf16);
  });

  it("絵文字 💯 は UTF-32 コードポイント表現 \u{0001F4AF} と同値である", () => {
    expect(emoji).toBe(utf32);
  });
});
