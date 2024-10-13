import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';



// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTPサーバー。
// 受信したリクエストをエコーする特別な/test/mirror
// エンドポイントも実装している。これは、クライアントをデバッグする際に便利。
// const http = require("http");   // 証明書を持っている場合は「https」を使用する。
// const url = require("url");     // URL 解析用。
// const path = require("path");   // ファイルシステムのパス操作用。
// const fs = require("fs");       // ファイル読み込み用。

// 指定されたポートで待ち受けるHTTPサーバを作成して、
// 指定されたルートディレクトリのファイルを提供する。
function serve(rootDirectory, port) { 
    let server = new http.Server();      // 新しいHTTPサーバーを作成する。
    server.listen(port);                 // 指定されたポートで待ち受ける。
    console.log("listening on port", port);

    // リクエストが届いたら、この関数で処理を行う。
    server.on("request", (request, response) => {
        // リクエストURLのパス部分を取得する。その際、付加されている
        // クエリは無視する。
        let endpoint = url.parse(request.url).pathname;

        // リクエストが「/test/mirror」の場合のときのみ、リクエストをそのまま送り返す。（ファイルは返さない。）
        // リクエストのヘッダやボディを見たい場合に便利。
        if (endpoint === "/test/mirror") {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");

            // レスポンスのステータスコードを指定する。
            response.writeHead(200);  // 200 OK

            // レスポンスボディの最初はリクエスト。
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

            // リクエストヘッダを出力する。
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i+1]}\r\n`);
            }

            // ヘッダの末尾に空行を追加する。
            response.write("\r\n");

            // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
            // 何らかのストリームなので、パイプを使うことができる。
            request.pipe(response);

        // それ以外の場合は、ローカルディレクトリからファイルを提供する。
        } else {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする。
            let filename = endpoint.substring(1);  // 先頭の「/」を削除してパスとファイル名を取得
            // パスの中の「..」を取り除き、ルートディレクトリの外部のファイルを提供する
            // ことができないようにする。ルートディレクトリが安全なルートになる。
            filename = filename.replace(/\\/g, "/").replace(/\.\.\//g, "");
            filename = path.resolve(rootDirectory, filename);

            // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
            let type;
            switch(path.extname(filename)) {
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
        }
    });
}

// コマンドラインから起動された場合は、serve() 関数を呼び出す。ルートディレクトリが指定されていないとき、tmp(一時ファイルを保存するためのディレクトリが指定される)
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);

// サーバーを立てるコマンド（node index.js [ルートディレクトリ] [ポート番号]）。以下の例ではルートディレクトリを相対パスで指定している
// node index.js ./temp 8000

// サーバーにリクエストを送るコマンド(http://localhost:[ポート番号]/[ルートディレクトリからのパス]/[取得するファイル名])
// http://localhost:8000/index.html
// http://localhost:8000/test/mirror
