import * as fs from "node:fs";
//問題文の例を真似て作成
export function readdir(path, options = {}) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => { //指定したディレクトリのファイル一覧を出力する
      if (err) reject(err);
      else resolve(files);
    });
  });
}

export function stat(path, options = {}) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {    //指定したファイルのステータスを返す
      if (err) reject(err);
      else resolve(stats);
    });
  });
}
