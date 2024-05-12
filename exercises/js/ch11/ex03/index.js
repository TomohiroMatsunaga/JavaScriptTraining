export function littleToBigEndian(data) { //エンディアンはバイトの並び順のこと
    let input = new Uint32Array(data); //dataを、Uint32Array の形式で再解釈する（型チェック）。例として[0x01020304]の1要素を持つ Uint32Array。
    let buffer = new ArrayBuffer(input.byteLength); //例として| 0x04 | 0x03 | 0x02 | 0x01 |の4要素を持つ。1バイト（8ビット）×４
    let view = new DataView(buffer); //ArrayBufferのデータにアクセスするためのツール。

    for (let i = 0; i < input.length; i++) {
        // 元のデータをリトルエンディアンとして読み、ビッグエンディアンとして書き込む
        view.setUint32(i * 4, input[i], false);  // 第一引数にオフセット（書き込みの開始位置）。第三引数に false を指定してビッグエンディアンで書き込む
    }

    return new Uint32Array(buffer);
}


export function bigToLittleEndian(data) {
    let input = new Uint32Array(data);
    let buffer = new ArrayBuffer(input.byteLength);
    let view = new DataView(buffer);

    for (let i = 0; i < input.length; i++) {
        // 元のデータをビッグエンディアンとして読み、リトルエンディアンとして書き込む
        view.setUint32(i * 4, input[i], true);  // 第三引数に true を指定してリトルエンディアンで書き込む
    }

    return new Uint32Array(buffer);
}

export function bigToLittleEndianDebug(data) {
    let input = new Uint32Array(data);
    let buffer = new ArrayBuffer(input.byteLength);
    let view = new DataView(buffer);

    console.log(`初期データ:`, input);

    for (let i = 0; i < input.length; i++) {
        console.log(`変換前の値 (ビッグエンディアンとして解釈):`, input[i].toString(16));
        // 元のデータをビッグエンディアンとして読み、リトルエンディアンとして書き込む
        view.setUint32(i * 4, input[i], true);  // 第三引数に true を指定してリトルエンディアンで書き込む
        console.log(`ビッグエンディアンからリトルエンディアンへ変換後のバイト列:`, new Uint32Array(buffer)[i].toString(16));
    }

    return new Uint32Array(buffer);
}
