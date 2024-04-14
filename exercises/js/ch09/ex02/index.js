export class C {
      #x = -1;  // 最初の取得で0を返すようにするため、-1から開始
  
    get x() {
      this.#x += 1;
      return this.#x;
    }
  }