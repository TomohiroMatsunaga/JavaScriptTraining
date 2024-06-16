import fs from 'fs';
import path from 'path';

export function* walk(rootPath) {
    const entries = fs.readdirSync(rootPath, { withFileTypes: true }); //readdirSyncはディレクトリ内のエントリを読み込む。withFileTypes: trueにすることでエントリの詳細情報を持つオブジェクトを取得できる。

    for (const entry of entries) {
        const fullPath = path.join(rootPath, entry.name);
        const isDirectory = entry.isDirectory();
        
        yield { path: fullPath, isDirectory };

        if (isDirectory) {
            yield* walk(fullPath); //ディレクトリの場合、再帰的に探索。yield*は反復可能オブジェクトを取る。
        }
    }
}
