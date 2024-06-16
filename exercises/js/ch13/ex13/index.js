import fs from 'fs/promises';
import path from 'path';

export async function* walk(rootPath) {
    const entries = await fs.readdir(rootPath, { withFileTypes: true });    //withFileTypes: trueにすることでエントリの詳細情報を持つオブジェクトを取得できる。

    for (const entry of entries) {
        const fullPath = path.join(rootPath, entry.name);
        const isDirectory = entry.isDirectory();
        
        yield { path: fullPath, isDirectory };

        if (isDirectory) {
            yield* walk(fullPath); // ディレクトリの場合、再帰的に探索。yield*は反復可能オブジェクトを取る。
        }
    }
}
