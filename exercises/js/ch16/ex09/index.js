import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
export default app;
export { serve };

// 問題の指定の通りExpressフレームワークを利用してサーバーを作成
function serve(rootDirectory, port) {

    // app.useはGET, POST, PUT, DELETE, などすべてのメソッドに対して動作する
    // どのような型のリクエストが来ても、そのまま扱うことを指定している
    app.use(express.raw({ type: '*/*' }));

    // app.allは指定したパスに完全に一致するリクエストに対して対して動作する(指定しない場合はすべてのパスに適応される)
    // パスに'/test/mirror'が指定された時の処理 
    app.all('/test/mirror', (request, response) => {


        //教科書のコードをほぼそのまま利用Start

        response.setHeader("Content-Type", "text/plain; charset=UTF-8");

        // レスポンスのステータスコードを指定する。
        response.writeHead(200);  // 200 OK

        // レスポンスボディの最初はリクエスト。
        response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

        // リクエストヘッダを出力する。
        let headers = request.rawHeaders;
        for (let i = 0; i < headers.length; i += 2) {
            response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
        }

        // ヘッダの末尾に空行を追加する。
        response.write("\r\n");

        // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
        // 何らかのストリームなので、パイプを使うことができる。
        request.pipe(response);

        //教科書のコードをほぼそのまま利用End


    });

    // パスに'/test/mirror'以外が指定されたとき、指定されたパスのファイルを送る
    app.use((request, response, next) => {
        // /test/mirror へのリクエストはスキップする
        if (request.path.startsWith('/test/mirror')) {
            return next();
        }

        // 先頭の「/」を削除してパスとファイル名を取得
        let filename = request.path.substring(1);  //文字列の2番目以降を切り取る


        //教科書のコードをほぼそのまま移したStart


        // パスの中の「..」を取り除き、ルートディレクトリの外部のファイルを提供する
        // ことができないようにする。ルートディレクトリが安全なルートになる。
        filename = filename.replace(/\\/g, "/").replace(/\.\.\//g, "");
        filename = path.resolve(rootDirectory, filename);

        // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
        let type;
        switch (path.extname(filename)) {
            case ".html": type = "text/html"; break;
            case ".js": type = "text/javascript"; break;
            case ".css": type = "text/css"; break;
            case ".png": type = "image/png"; break;
            case ".txt": type = "text/plain"; break;
            default: type = "application/octet-stream"; break;
        }

        let stream = fs.createReadStream(filename);
        stream.once("readable", () => {
            // ストリームが読み込みを始められるようになったら、Content-Type ヘッダと
            // 200 OK ステータスを設定する。そして、ファイル読み出し
            // ストリームをレスポンスにパイプする。ストリームが終了すると、
            // パイプ自動的に response.end() を呼び出す。
            response.setHeader("Content-Type", type);
            response.writeHead(200);
            stream.pipe(response);
        });

        stream.on("error", (err) => {
            // ストリームを開く際にエラーが発生した場合、
            // そのファイルはおそらく存在しないか、読めないと思われる。
            // エラーメッセージをレスポンスに書いて送信する。
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            response.writeHead(404);
            response.end(err.message);
        });

        //教科書のコードをほぼそのまま移したEnd

    });

    // サーバーが正常に起動したときに実行される
    // サーバーのインスタンスを返す
    return app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}

//教科書のコードをほぼそのまま移したStart

// コマンドラインから起動された場合は、serve() 関数を呼び出す。テストのときは呼び出さないように抑制
if (process.env.NODE_ENV !== 'test') {
    serve(process.argv[2] || '/tmp', parseInt(process.argv[3]) || 8000);
}

//教科書のコードをほぼそのまま移したEnd


// サーバーを立てるコマンド（node index.js [ルートディレクトリ] [ポート番号]）。以下の例ではルートディレクトリを相対パスで指定している
// node index.js ./temp 8000

// サーバーにリクエストを送るコマンド(http://localhost:[ポート番号]/[ルートディレクトリからのパス]/[取得するファイル名])
// http://localhost:8000/index.html
// http://localhost:8000/test/mirror