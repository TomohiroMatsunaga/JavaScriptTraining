import { parseJson } from "./index.js";

describe("parseJson", () => {
  it("有効なJSON文字列が与えられると、パースしたデータを含む成功オブジェクトを返す", () => {
    const jsonString = '{"key": "value"}';
    expect(parseJson(jsonString)).toEqual({ success: true, data: { key: "value" } });
  });

  it("無効なJSON文字列が与えられると、エラー内容を含む失敗オブジェクトを返す", () => {
    const jsonString = '{"key": value}';
    expect(parseJson(jsonString)).toEqual({ success: false, error: expect.any(String) });
  });
});
