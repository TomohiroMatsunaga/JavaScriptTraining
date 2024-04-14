export function f(body) {
    // 引数名のリストを作成
    const args = ['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8', '$9', '$10'];
    // Function コンストラクタで関数を生成
    return new Function(...args, `return ${body};`); //文字列で関数本体を記述
  }
  
  const arr = [5, 2, 1, 4, 3];
  console.log(arr.reduce(f("$1 + $2"), 0)); // 15
  console.log(arr.sort(f("$1 - $2")));      // [1, 2, 3, 4, 5]
  