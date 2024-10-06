import fs from "fs";

// fs.truncate()を使って'test.txt'ファイルを 100 バイトに拡張
fs.truncate('test.txt', 100, (err) => {
  if (err) throw err;
  console.log('ファイルを拡張しました');
});
