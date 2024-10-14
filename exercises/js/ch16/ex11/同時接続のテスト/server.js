import net from 'net';

// サーバーを作成
const server = net.createServer((socket) => {
    console.log('クライアントが接続しました');
    
    socket.on('end', () => {
        console.log('クライアントが接続を切断しました');
        //ソケットを閉じない
    });
});

// サーバーをポート8000でリッスン（接続待ち）
server.listen(8000, () => {
    console.log('サーバーがポート8000で待機中');
});
