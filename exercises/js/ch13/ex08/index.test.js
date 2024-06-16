import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("fetchFirstFileSize", () => {
  it("指定されたディレクトリの最初のファイルのサイズを返す", () => {
    const expectedSize = 1; // 1バイトのファイルを先頭に要している
    return fetchFirstFileSize("./ch13/ex08/testDir").then(size => {
      expect(size).toBe(expectedSize);
    });
  });
});

describe("fetchSumOfFileSizes", () => {
  it("指定されたディレクトリ内の全ファイルのサイズ合計を返す", () => {
    const expectedTotalSize = 10; //合計10バイトのファイルを用意している
    return fetchSumOfFileSizes("./ch13/ex08/testDir").then(totalSize => {
      expect(totalSize).toBe(expectedTotalSize);
    });
  });
});
