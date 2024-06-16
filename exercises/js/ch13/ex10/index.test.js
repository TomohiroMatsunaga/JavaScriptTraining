import { fetchSumOfFileSizes } from './index.js'; 

describe("fetchSumOfFileSizes", () => {
  it("指定されたディレクトリ内の全ファイルのサイズの合計を返す", async () => {
    const expectedTotalSize = 10; //合計10バイトのファイルを用意している
    const totalSize = await fetchSumOfFileSizes("./ch13/ex08/testDir");
    expect(totalSize).toBe(expectedTotalSize);
  });
});