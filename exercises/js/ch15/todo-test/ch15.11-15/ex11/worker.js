// これは、親スレッドからメッセージを受け取り、そのメッセージに
// 記述されている計算を実行し、その計算結果を親スレッドに
// 送信するシンプルなワーカーです。
onmessage = function(message) {
    const {width, height} = message.data;

    // ImageDataオブジェクトを作成する。各ピクセルはRGBA形式の4つの要素（赤、緑、青、不透明度）を持つ。
    // 2x2ピクセルの場合、配列は16要素を持つ
    const imageData = new ImageData(width, height);
    const data = imageData.data;

    // ピクセルの座標 (x, y) に対して、xとyを2で割り続けたとき、xとyの両方が奇数になる瞬間があれば、そのピクセルはシェルピンスキーのギャスケットを描くピクセルにならない。
    // 両方とも奇数になる瞬間がなければそのピクセルはシェルピンスキーのギャスケットを描くピクセルになる。
    let index = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let isOutside = false;
            let tempX = x;
            let tempY = y;

            // x と y の両方に対して、2で割り続けて両方同時に奇数になるかを調べる
            while (tempX > 0 && tempY > 0) {
                if (tempX % 2 === 1 && tempY % 2 === 1) {
                    isOutside = true;  // 両方奇数ならシェルピンスキーのギャスケットを描くピクセルにならない
                    break;
                }
                tempX = Math.floor(tempX / 2);
                tempY = Math.floor(tempY / 2);
            }

            if (isOutside) {
                // 黒に設定（シェルピンスキーのギャスケットを描くピクセルにならない）
                data[index++] = 0;    // 赤
                data[index++] = 0;    // 緑
                data[index++] = 0;    // 青
                data[index++] = 255;  // 不透明度
            } else {
                // 白に設定（シェルピンスキーのギャスケットを描くピクセルになる）
                data[index++] = 255;  // 赤
                data[index++] = 255;  // 緑
                data[index++] = 255;  // 青
                data[index++] = 255;  // 不透明度
            }
        }
    }

    // 親スレッドに計算結果を送り返す
    postMessage(imageData);
};
