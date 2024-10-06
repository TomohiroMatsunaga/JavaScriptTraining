import fs from 'fs';              // ファイル操作用
import iconv from 'iconv-lite';   // 文字エンコード用

// Shift_JISに変換したテキストをファイルに保存する
const text = "おはようございます";
const encodedText = iconv.encode(text, 'Shift_JIS');  // UTF-8からShift_JISにエンコード
fs.writeFileSync('hello.txt', encodedText); //writeFileSyncを使って同期的に実行している

// Shift_JIS で保存されたテキストを出力する（ここでは文字化けすることが期待結果）
console.log('--- 文字化けする出力 ---');
const rawData = fs.readFileSync('hello.txt'); //readFileSyncを使って同期的に実行している
console.log(rawData.toString());

// ステップ2: iconv-liteを使ってShift_JISをUTF-8に変換して表示
console.log('--- 文字化けしないように変換された出力 ---');
const decodedText = iconv.decode(rawData, 'Shift_JIS');  // Shift_JISからUTF-8にデコード
console.log(decodedText);
