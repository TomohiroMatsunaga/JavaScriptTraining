import * as fsPromises from 'node:fs/promises';
import { join } from 'node:path';

export function fetchSumOfFileSizes(path) {
    return fsPromises.readdir(path)
      .then(files => {
        const sizePromises = files.map(file => 
            fsPromises.stat(join(path, file)).then(stats => stats.size)
        );
        return Promise.all(sizePromises);
      })
      .then(sizes => sizes.reduce((total, size) => total + size, 0));
  }
  