import { checkEntry } from "./index.js";

describe("checkEntry", () => {
  it("存在するファイルのパスがあたえられたとき'file'を返す", async () => {
    const result = await checkEntry("./ch16/ex07/test.txt");
    expect(result).toBe("file");
  });

  it("存在するディレクトリのパスが与えられたとき'directory'を返す", async () => {
    const result = await checkEntry("./ch16/ex07/testDir");
    expect(result).toBe("directory");
  });

  it("存在しないパスが与えられたとき'path does not exist'を返す", async () => {
    const result = await checkEntry("./ch16/ex07/nonexistent");
    expect(result).toBe("path does not exist");
  });
});
