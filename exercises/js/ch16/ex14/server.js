const express = require('express');
const multer = require('multer');
const path = require('path');
const { Worker } = require('worker_threads');
const app = express();
const port = 8000;
const upload = multer();

// server.jsが存在するディレクトリにあるファイルをサーバーが使えるようにする
app.use(express.static(path.join(__dirname)));

// ワーカースレッドで画像処理を行う関数
function processImage(fileBuffer) {
  return new Promise((resolve) => {
    const worker = new Worker('./worker.js');  // ワーカースレッドを作成
    worker.postMessage(fileBuffer);  // 画像データをワーカースレッドに送る

    // ワーカースレッドから処理された画像データを受け取る
    worker.on('message', (processedBuffer) => {
      resolve(processedBuffer);
    });

  });
}

// index.jsからのリクエストを受け取って画像ファイルをワーカースレッドに投げる
// 教科書的には、ワーカースレッドと大きなデータをやり取りするときArrayBuffer型でやり取りするのがよいと書かれている
app.post('/filter', upload.single('image'), async (req, res) => {

  try {
    // ワーカースレッドを使って画像処理を実行
    const processedBuffer = await processImage(req.file.buffer);

    // 処理された画像データをindex.jsに返す
    res.setHeader('Content-Type', req.file.mimetype);
    // processedBufferはUint8Array型なのでBuffer型に変換してindex.jsに返す
    res.send(Buffer.from(processedBuffer));
  } catch (error) {
    // エラーのとき、サーバー側に発生した問題によって、リクエストが処理されなかったことを示すエラーコード500を返す
    res.status(500).send('Error processing image');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
