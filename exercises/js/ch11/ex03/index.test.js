import { littleToBigEndian, bigToLittleEndian } from "./index.js";

describe("エンディアン変換", () => {
  // リトルエンディアンからビッグエンディアンへの変換テスト
  it("リトルエンディアンからビッグエンディアンへ正しく変換される", () => {
    const littleEndian = new Uint32Array([0x01020304]);
    const bigEndian = littleToBigEndian(littleEndian);
    const expectedBigEndian = new Uint32Array([0x04030201]);

    expect(bigEndian).toEqual(expectedBigEndian);
  });

  // ビッグエンディアンからリトルエンディアンへの変換テスト
  it("ビッグエンディアンからリトルエンディアンへ正しく変換される", () => {
    // ビッグエンディアンでデータを設定するための ArrayBuffer と DataView を用意
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setUint32(0, 0x01020304, false); // ビッグエンディアンとしてデータをセット
    const bigEndian = new Uint32Array(buffer); // Uint32Array を作成し、これを関数に渡す

    const littleEndian = bigToLittleEndian(bigEndian);
    const expectedLittleEndian = new Uint32Array([0x04030201]);

    expect(littleEndian).toEqual(expectedLittleEndian);
  });
});
