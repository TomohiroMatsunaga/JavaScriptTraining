import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export function fetchFirstFileSize(path) {
  return fsPromises.readdir(path)
    .then(files => {
      if (files.length === 0) {
        return null;
      }
      return fsPromises.stat(join(path, files[0]))  //先頭のファイルのパスをjoinで作成し、fsPromises.statに与える
        .then(stats => stats.size);
    });
}

export function fetchSumOfFileSizes(path) {
  return fsPromises.readdir(path)
    .then(files => {
      const promises = files.map(file => fsPromises.stat(join(path, file)).then(stats => stats.size));
      return Promise.all(promises)
        .then(sizes => sizes.reduce((total, size) => total + size, 0)); //単一の出力値（累積結果）を生成するために使用されるメソッド。0は初期値
    });
}
