// 配列のように振る舞うが、Array を継承しない
export class MyArrayLike {
  constructor(length = 0) {
    this.length = length;
  }

   // 配列のようにイテレーションを可能にするためのイテレータメソッド
  [Symbol.iterator]() {
    let index = 0;
    // イテレータオブジェクトを返す
    return {
      next: () => {
        if (index < this.length) {
          // 反復結果オジェクト返す
          return { value: this[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// MyArray クラスは Array を継承している
export class MyArray extends Array {
  // コンストラクタで配列の要素を受け取り、親クラス（Array）のコンストラクタに渡す
  constructor(items) {
    super(...items);
  }

    // map() や slice() の結果として MyArrayLike のオブジェクトを返すために Symbol.species を設定
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
