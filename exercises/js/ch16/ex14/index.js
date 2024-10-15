const imageInput = document.getElementById("image");
const originalCanvas = document.getElementById("original"); //canvas要素を取得
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d"); // コンテキストを取得
const filteredCtx = filteredCanvas.getContext("2d");

// 画像ファイルが選択されたときに呼び出されるイベントリスナー
imageInput.addEventListener("change", (event) => {
    // 選択された画像ファイルを取得
    const file = event.target.files[0];

    // ファイルの内容を読み込むためのFileReaderを作成
    const reader = new FileReader();
    // ファイルを読み込む
    reader.readAsDataURL(file);

    // imageオブジェクトを作成
    const img = new Image();

    // FileReaderがファイルを読み込んだ後に呼ばれる処理
    reader.addEventListener("load", (e) => {
        // 読み込んだファイルのURLをimgeオブジェクトに設定する。imageオブジェクトはロードし始める。
        img.src = e.target.result;
    });

    // imageオブジェクトのロードが終わった後に呼ばれる処理
    img.addEventListener("load", () => {
        // 元画像とフィルタ後のキャンバスのサイズを、読み込んだ画像のサイズに合わせる
        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;
        
        // 元画像をキャンバスに描画
        originalCtx.drawImage(img, 0, 0);

        // サーバーに送信するために FormData オブジェクトを作成し、画像ファイルを追加
        const formData = new FormData();
        formData.append("image", file);


        // サーバーに画像を POST リクエストで送信し、フィルタ処理をリクエスト
        fetch("/filter", {
            method: "POST",
            body: formData
        })
        // サーバーから返ってきたレスポンスをバイナリデータ（ArrayBuffer）として取得
        .then(response => response.arrayBuffer())
        // バイナリデータを処理
        .then(buffer => {
            // 受け取ったバイナリデータをPNG形式のBlob（Binary Large Object：バイナリデータを扱うためのオブジェクト）に変換
            const blob = new Blob([buffer], { type: "image/png" });

            // 空のimageオブジェクトを作成
            const filteredImg = new Image();

            

            // BlobデータをオブジェクトURLに変換(コンピュータ内にあるBlobデータに一時的なURLを作成)して画像のソースに設定
            const blobUrl = URL.createObjectURL(blob);

            // フィルタ適用後の画像を表示するために生成したURLを img のソースに設定
            filteredImg.src = blobUrl;

            // 画像がロードされたらキャンバスに描画する処理
            filteredImg.onload = () => {
                // キャンバスをクリアし、フィルタ適用後の画像を描画
                filteredCtx.clearRect(0, 0, filteredCanvas.width, filteredCanvas.height);
                filteredCtx.drawImage(filteredImg, 0, 0);
            };
        })
    });
});