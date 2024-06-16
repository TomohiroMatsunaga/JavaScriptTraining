import fs from 'fs';

export function* readLines(filePath) {
    const fd = fs.openSync(filePath, 'r'); // ファイルを読み取り専用で開く
    const BUFFER_SIZE = 1024; // バッファサイズを1KBに設定
    const buffer = Buffer.alloc(BUFFER_SIZE); // バッファを初期化
    let leftover = ''; // 残った文字列を保持する変数

    try {
        let bytesRead;  //読み込まれたバイト数を格納する

        while ((bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE, null)) > 0) {   //1KB分だけ読み込む。
            const chunk = leftover + buffer.toString('utf8', 0, bytesRead); // utf8文字列に変換し、残った文字列とバッファを結合
            const lines = chunk.split(/\r?\n/); // 改行で分割し、配列として格納

            leftover = lines.pop(); //行が途中まで担っている最後の要素をleftoverに保存（改行がない場合はここでlinesが空っぽになる）

            for (const line of lines) {
                yield line; //各行をジェネレータから返す
            }
        }

        if (leftover) {
            yield leftover; //ファイルが全て読み込まれた後、最後の行は改行が無いのでここで返す
        }
    } finally {
        fs.closeSync(fd); // ファイルをクローズ
    }
}