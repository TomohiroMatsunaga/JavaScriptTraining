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

    //変更開始

    // Web Workerを作成して画像処理を依頼する
    //Web Workerは、メインスレッドとは別に動作するバックグラウンドスレッドを作成する機能
    const worker = new Worker('worker.js');

    //ガウシアンフィルタの処理を依頼する  
    worker.postMessage(imageData);

    // Workerからメッセージ（処理済みの画像データ）を受けとり、画面に映す
    worker.onmessage = function(e) {
      const outputImageData = e.data;
      filteredCtx.putImageData(outputImageData, 0, 0);
    };

    //変更修了
  });

  reader.readAsDataURL(file);
});