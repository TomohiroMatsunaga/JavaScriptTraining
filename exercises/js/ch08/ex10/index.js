export function addMyCall(f) {
    // 関数fにcallに相当する関数（オブジェクトを受け取り、そのオブジェクトの所属関数として関数fを実行する）を追加する。
    f.myCall = function(context, ...args) {
      return f.bind(context)(...args); //bind関数を使ってfをオブジェクトの所属関数とし、引数を与える
    };
  }  