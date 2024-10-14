import net from 'net';

// HTTPリクエストに応じたレスポンスを返す関数
function createResponse(data) {
    // クライアントから受け取ったリクエスト
    // GET / HTTP/1.1
    // User-Agent: PostmanRuntime/7.42.0
    // Accept: */*
    // Postman-Token: fc7e6a23-8a19-4028-b831-d39573606086
    // Host: localhost:8000
    // Accept-Encoding: gzip, deflate, br
    // Connection: keep-alive


    // POST /greeting HTTP/1.1
    // Host: localhost:8000
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
    // Accept-Language: ja,en-US;q=0.7,en;q=0.3
    // Accept-Encoding: gzip, deflate, br, zstd
    // Content-Type: application/x-www-form-urlencoded
    // Content-Length: 39
    // Origin: http://localhost:8000
    // Connection: keep-alive
    // Referer: http://localhost:8000/
    // Upgrade-Insecure-Requests: 1
    // Sec-Fetch-Dest: document
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-Site: same-origin
    // Sec-Fetch-User: ?1
    // Priority: u=0, i

    // name=nameSample&greeting=GreetingSample

    const request = data.toString(); // クライアントから送られてきたバイナリデータを文字列に変換する
    const [method, path] = request.split(' '); // 受け取ったリクエスト（GET /pathHogeHoge HTTP/1.1…）から、HTTPメソッド(GET, POSTなど)とパスを抽出

    // "/"が GET されたとき(ルートパスでGETされたとき)に返すレスポンス
    if (method === 'GET' && path === '/') {
        
        // HTTPリクエストやレスポンスは基本的にテキスト形式の文字列として送受信される
        // 1行目：レスポンスコード、2行目以降：ヘッダー、ヘッダー後の空行以降：ボディ
        return `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n
        <!doctype html>
        <html lang="ja">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Greeting Form</title>
            </head>
            <body>
            <form action="/greeting" method="POST">
                <label for="greeting">Name:</label>
                <input type="text" id="name" name="name" />
                <input type="text" id="greeting" name="greeting" />
                <button type="submit">Submit</button>
            </form>
            </body>
        </html>`;

    // POSTメソッドで「/greeting」にアクセスされた場合の処理
    } else if (method === 'POST' && path === '/greeting') {

        const body = request.split('\r\n\r\n')[1]; // 空行後のボディ（nameとgreeting）を抽出
        const params = new URLSearchParams(body); // URLSearchParamsで解析
        const name = params.get('name'); // nameを取得
        const greeting = params.get('greeting'); // greetingを取得

        //レスポンスを文字列で返す
        return `HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n
      <!doctype html>
      <html lang="ja">
        <head><meta charset="UTF-8" /></head>
        <body>
          <h1>Greeting Response</h1>
          <p>Name: ${name}</p>
          <p>Greeting: ${greeting}</p>
        </body>
      </html>`;
    
      // パスが「/」でも「/greeting」でもないとき
    } else if (path !== '/' && path !== '/greeting') {
         // 404 Not Foundを返す
        return 'HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found';
    
    // PUTやDELETEなどサポートしていないのメソッドが送られたとき
    } else {
        return 'HTTP/1.1 405 Method Not Allowed\r\nContent-Type: text/plain\r\n\r\n405 Method Not Allowed'; // 405 Method Not Allowedを返す
    }
}

// TCPクライアント (net.Socket) でサーバを作成
const server = net.createServer((socket) => {
    // クライアントからリクエストが送られた時に実行される処理 
    socket.on('data', (data) => { 
        const response = createResponse(data); // レスポンスを生成
        socket.write(response); // レスポンスをクライアントに送信
        socket.end();  // ソケットを閉じる
    });

    // ソケットでエラーが発生したとき
    socket.on('error', (err) => { 
        console.error('Socket error:', err);
    });
});

// サーバを起動
server.listen(8000, () => {
    console.log('Server listening on port 8000');
});
