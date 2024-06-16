import { readdir, stat } from "./index.js";

describe("readdir", () => {
    it("指定したディレクトリのファイル一覧を返す", () => {
      return readdir("./ch13/ex03/testDir").then(files => {
        expect(files).toContain("subDir"); //testDirにsubDirがいることを確認
      });
    });
  
    it("サブディレクトリのファイル一覧を返す", () => {
      return readdir("./ch13/ex03/testDir/subDir").then(files => {
        expect(files).toContain("fileInSub.txt"); //subDirにfileInSub.txtがいることを確認
      });
    });
  });
  

describe("stat", () => {
  it("指定されたファイルのステータスを返す", () => {
    return stat("./ch13/ex03/testDir/subDir/fileInSub.txt").then(fileStats => {
      expect(fileStats.isFile()).toBe(true); //指定したファイルがファイルであることを確認
      expect(fileStats.size).toBeGreaterThan(0); //指定したファイルのサイズが0より大きいことを確認
    });
  });
});
