function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// 例外
const errX = () => {
    throw new Error("X");
  };
  const errY = () => {
    throw new Error("Y");
  };

h3();

function h3() {
    // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
    
    //予想
    //Xがキャッチされず、エラーとなって処理が落ちる。
    
    //確認結果
    //予想通りだった。
    
    //説明
    //new Promisで作成されたpromiseのスコープと、async関数で生成されたpromiseのスコープは異なるため、エラーがnew Promisで作成されたpromiseに伝播せず、キャッチされなかった。
    
    new Promise(async () => {
      errX();
    }).catch((e) => log(e.message));
  }