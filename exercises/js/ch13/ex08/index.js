import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export async function fetchFirstFileSize(path) {
  const files = await fsPromises.readdir(path);
  if (files.length === 0) {
    return null;
  }
  const stats = await fsPromises.stat(join(path, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);
  const sizes = await Promise.all(
    files.map(async file => {
      const stats = await fsPromises.stat(join(path, file));
      return stats.size;
    })
  );
  return sizes.reduce((total, size) => total + size, 0);
}

//感想：thenチェーンよりも変数を立てる手間はあるが、書き慣れている書き方に近いと思った。