// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  const cache = new WeakMap(); //WeakMapを使用することで、ガーベージコレクションされるのを防がない。

  return function(obj) { //関数fをラップ（WeakMapにアクセスできる）した関数を返す。
    if (cache.has(obj)) {
      return cache.get(obj);
    } else {
      const result = f(obj);
      cache.set(obj, result);
      return result;
    }
  };
}

export function slowFn(obj) {
  const start = Date.now();  // 開始時間を記録

  // 2秒のディレイ
  const delay = 2000;
  while (Date.now() < start + delay) {
  }

  const result = { value: Object.keys(obj).length };  // 結果を計算
  const end = Date.now();  // 終了時間を記録

  console.log(`処理が完了しました。処理時間: ${end - start}ms`);
  return result;
}

// cachedSlowFnをテスト
const obj = { a: 1, b: 2 };

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);

console.log(cachedSlowFn(obj));  // 初回呼び出し、計算が行われる
console.log(cachedSlowFn(obj));  // キャッシュから結果を取得
console.log(cachedSlowFn(obj));  // キャッシュから結果を取得

// 新しいオブジェクトで試す
const newObj = { a: 1, b: 2, c: 3 };
console.log(cachedSlowFn(newObj));  // 新しいオブジェクトで計算が行われる
