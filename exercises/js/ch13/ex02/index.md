回答テンプレート
  
  //予想
  //
  
  //確認結果
  //
  
  //説明
  //

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  
  //予想
  //errXをtry/catchでキャッチできない。BCAの順に出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //errXのスローはtry/catchと同期していないためerrXをtry/catchでキャッチできない。
  //logAはプロミスで実行されるから、マイクロタスクキューに積まれるため、先にBCが実行される。
  
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  
  //予想
  //2秒後にAが出力される。1秒後にBが出力される。100が出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //実行開始から順番通りに順次タスクが実行される。
  
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  
  //予想
  //B A undefinedが出力される
  
  //結果
  ///B A 40が出力された
  
  //説明
  //2つ目のthenの引数は関数では無いため、その引数のコードが即時に実行されwait1がwait2と同列にマイクロタスクキューに積まれるため、1秒経過後にlogBが出力される。
  //また、thenチェーンにおいて、途中のthenが値を渡さない場合、その前のthenが返した値を引き継ぐので、log(v)は40を出力する。
  
  
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
    
  //予想
  //問題なく呼び出しが可能。A B Cの順で出力される。
  
  //確認結果
  //A B Cの順で出力された。
  
  //説明
  //１つのPromise に対し複数のthenを付けることは可能。

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  
  //予想
  //解決済みのpromisのthen呼び出しは即時に実行される。つまりABCの順
  
  //確認結果
  //ABCの順だった。
  
  //説明
  //解決済みのプロミスのthenは即時に実行される。
  
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  
  //予想
  //XAの順に出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //errXでthenチェーンが止まり、catchで補足されてXが出力される、finallyでAが出力される。

  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  
  //予想
  //YAが出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //f8と同じように順番に実行されている。

  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  
  //予想
  //AYが出力される。
  
  //確認結果
  //Aが出力された後、Yのエラーででシステムが終了した。
  
  //説明
  //then(r, c)はthen(r).catch(c)とは異なり、rでエラーが発生した場合、そのままシステムが落ちる。しかし、finallyは必ず実行されるため、先にAが出力され、その後Yのエラーでシステムが落ちた。

  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  
  //予想
  //キャッチされ、Xが出力される。
  
  //確認結果
  //予想通りだった。
  
  //説明
  //new Promise 内の throwもthenのコールバック内のスローと同じようにキャッチされる。

  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  //予想
  //キャッチされない
  
  //確認結果
  //キャッチされなかった。
  
  //説明
  //Promisのコールバックと非同期にthrowした場合はキャッチされない。

  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
```