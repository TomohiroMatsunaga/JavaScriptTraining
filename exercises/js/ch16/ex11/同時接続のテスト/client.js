import net from 'net';

const maxClients = 10000; // 1万クライアントを試してみる

for (let i = 0; i < maxClients; i++) {
    const client = new net.Socket();
    
    // サーバーに接続する
    client.connect(8000, 'localhost', () => {
        console.log(`${i + 1}個めのクライアントが接続しました`);
    });
}
