回答テンプレート
  
  //予想
  //
  
  //確認結果
  //
  
  //説明
  //


async function h1() {

  //予想
  //3秒後にA、2秒後にB、1秒後にCが出力される
  
  //確認結果
  //予想通りだった。
  
  //説明
  //awaiを使った非同期処理ではその場でコードの進行が停止されるが、この例では特に引っかかることなく待ち時間とログの出力が順番通りに実行される。
  
  
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  
  //予想
  //Xが出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //プロミスのスコープ内でerrXが発生し、キャッチされ、Xが出力される。
  
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

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

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  
  //予想
  //errXで処理が終了する
  
  //確認結果
  //errYで処理が終了した
  
  //説明
  //await p1とawait p2は関係なく、const p1とconst p2の定義の時点ですでにwait以降が実行されている。awaitで処理が一時停止されているわけでは無いから、ほぼ同時に実行が開始され、wait1のthenが先に実行され、errYで処理が終了した
 
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}