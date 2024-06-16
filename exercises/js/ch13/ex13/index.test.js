import { walk } from './index.js';
import fs from 'fs/promises';  //プロミス版のfsを使用
import path from 'path';

describe("walk", () => {
    const testDirPath = './ch13/ex13/testDir';

    beforeAll(async () => {
        // テスト用のディレクトリとファイルを作成
        await fs.mkdir(testDirPath, { recursive: true });   //recursive: trueのオプションを付けておくことで後からまとめて削除が可能
        await fs.writeFile(path.join(testDirPath, 'foo.txt'), 'Foo content');
        await fs.mkdir(path.join(testDirPath, 'A'));
        await fs.mkdir(path.join(testDirPath, 'B'));
        await fs.mkdir(path.join(testDirPath, 'B', 'C'));
        await fs.writeFile(path.join(testDirPath, 'B', 'C', 'buz.txt'), 'Buz content');
    });

    afterAll(async () => {
        // テスト用のディレクトリとファイルを削除
        await fs.rm(testDirPath, { recursive: true, force: true });
    });

    it("ファイル・フォルダを再帰的に取得する", async () => {
        const results = [];
        for await (const entry of walk(testDirPath)) {
            results.push(entry);
        }

        //期待される結果の配列を作成
        const expectedResults = [
            { path: path.join(testDirPath, 'foo.txt'), isDirectory: false },
            { path: path.join(testDirPath, 'A'), isDirectory: true },
            { path: path.join(testDirPath, 'B'), isDirectory: true },
            { path: path.join(testDirPath, 'B', 'C'), isDirectory: true },
            { path: path.join(testDirPath, 'B', 'C', 'buz.txt'), isDirectory: false }
        ];
        
        // 順番が任意なので、結果と期待される結果をそれぞれ辞書順（localeCompare ）に並べ替えてから比較
        expect(results.sort((a, b) => a.path.localeCompare(b.path))).toEqual(expectedResults.sort((a, b) => a.path.localeCompare(b.path)));
    });
});
