document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // ここから下がコードの変更点
    // ガウシアンフィルタ 5x5 のカーネル
    // (5x5の範囲のピクセルのうち、どのピクセルの色をどのくらいの重みで採用するかを決める表。数値は適当)
    const kernel = [
      [1,  4,  6,  4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1,  4,  6,  4, 1],
    ];

    // カーネル内のすべての数値の合計
    const kernelWeight = kernel.flat().reduce((sum, value) => sum + value, 0);

    // 画像の幅と高さ
    const width = img.width;
    const height = img.height;

    // ガウシアンフィルタを適用した後の新しい画像データを入れるための配列
    const outputData = new Uint8ClampedArray(data.length);

    //画像の指定した位置（x, y）にある色の情報を取り出す。
    const getPixel = (x, y, channel) => {
      if (x < 0 || x >= width || y < 0 || y >= height) {
        return 0; // 画像の外側は0（黒）
      }
      return data[(y * width + x) * 4 + channel]; // 画像内なら、その場所の色を返す。channelでRGB（赤(0)、緑(1)、青(2)）のどの色を取得するかを指定。（3に透明度が格納されている）
    };

    // 画像の全ピクセルについて、ぼかし処理を行います。
    for (let y = 0; y < height; y++) { // 縦方向のループ
      for (let x = 0; x < width; x++) { // 横方向のループ
        for (let channel = 0; channel < 3; channel++) { // 赤, 緑, 青の3色に対するループ
          let sum = 0; // 重みをかけた色の合計を保存する変数

          // 5x5の範囲でループして、カーネルを適用
          for (let ky = 0; ky < 5; ky++) {
            for (let kx = 0; kx < 5; kx++) {
              const pixelX = x + kx - 2; // 現在のピクセルからの横方向の位置
              const pixelY = y + ky - 2; // 現在のピクセルからの縦方向の位置
              sum += getPixel(pixelX, pixelY, channel) * kernel[ky][kx]; // カーネルを使って色を合計
            }
          }

          // 合計した色をカーネル合計値で割って、平均を出して新しいピクセルの色とする
          outputData[(y * width + x) * 4 + channel] = sum / kernelWeight;
        }
        // 透明度はそのままコピーする。
        outputData[(y * width + x) * 4 + 3] = data[(y * width + x) * 4 + 3];
      }
    }

    // 新しく作った画像を画面に描画
    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});