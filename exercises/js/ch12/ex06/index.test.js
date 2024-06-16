import { walk } from './index.js';
import fs from 'fs';
import path from 'path';

describe("walk", () => {
    const testDirPath = './ch12/ex06/testDir';

    beforeAll(() => {
        // テスト用のディレクトリとファイルを作成
        fs.mkdirSync(testDirPath);  //mkdirSyncでディレクトリを同期的に作成
        fs.writeFileSync(path.join(testDirPath, 'file1.txt'), 'File 1 content');    //writeFileSyncでファイルを同期的に作成
        fs.mkdirSync(path.join(testDirPath, 'subdir1'));
        fs.writeFileSync(path.join(testDirPath, 'subdir1', 'file2.txt'), 'File 2 content');
        fs.mkdirSync(path.join(testDirPath, 'subdir2'));
        fs.writeFileSync(path.join(testDirPath, 'subdir2', 'file3.txt'), 'File 3 content');
    });

    afterAll(() => {
        // テスト用のディレクトリとファイルを削除
        fs.unlinkSync(path.join(testDirPath, 'subdir1', 'file2.txt'));  //unlinkSyncでファイルを同期的に削除
        fs.rmdirSync(path.join(testDirPath, 'subdir1'));    //rmdirSyncで空のディレクトリを同期的に削除
        fs.unlinkSync(path.join(testDirPath, 'subdir2', 'file3.txt'));
        fs.rmdirSync(path.join(testDirPath, 'subdir2'));
        fs.unlinkSync(path.join(testDirPath, 'file1.txt'));
        fs.rmdirSync(testDirPath);
    });

    it("ディレクトリを再帰的に探索する", () => {
        const results = [];
        for (const entry of walk(testDirPath)) {
            results.push(entry);
        }

        console.log(results)
        expect(results).toEqual([
            { path: path.join(testDirPath, 'file1.txt'), isDirectory: false },
            { path: path.join(testDirPath, 'subdir1'), isDirectory: true },
            { path: path.join(testDirPath, 'subdir1', 'file2.txt'), isDirectory: false },
            { path: path.join(testDirPath, 'subdir2'), isDirectory: true },
            { path: path.join(testDirPath, 'subdir2', 'file3.txt'), isDirectory: false }
        ]);
    });
});
