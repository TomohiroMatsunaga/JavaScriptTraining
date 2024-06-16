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


//回答テンプレート

    //予想
    //
    
    //確認結果
    //
    
    //説明
    //



i8();

//ここから回答
async function i1() {
    // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
    //予想
    //42が2回出力される（他のプロミスは止まる）
  
    //確認結果
    //42と100が出力された
  
    //説明
    //Promise.anyは最初に満たされた結果のみが返るが、他のPromiseは終了するのではなく動いている。
    //wait2後にvに100が代入されるため、42と100が出力された。
    let v = 0;
  
    v = await Promise.any([
      wait1().then(() => 42),
      wait2()
        .then(() => (v = 100))
        .then(() => 0),
    ]);
  
    log(v);
    await wait2();
    log(v);
  }
  
  async function i2() {
    //予想
    //C B A [A, B, C]の順で出力される。
    
    //確認結果
    //予想通りだった。
    
    //説明
    //ログはpromiseの完了順に出力され、結果の返り値の配列はコードに記述された順番に格納されている。

    const v = await Promise.all([
      wait3().then(() => {
        logA();
        return "A";
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        logC();
        return "C";
      }),
    ]);
    log(v);
  }
  
  async function i3() {
    // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
    //予想
    //Y 42 B 0の順で出力される(他のPromiseは止まらない)
    
    //確認結果
    //予想通りだった。
    
    //説明
    //all で引数の1つが失敗するとき、他のPromiseは止まらず動き続けている。

    let v = 42;
    try {
      await Promise.all([   //awaitはその外側のtry/catchにエラーを伝播させることができる。
        wait3().then(() => {
          v = 0;
          errX();
        }),
        wait2().then(() => {
          logB();
          return "B";
        }),
        wait1().then(() => {
          errY();
        }),
      ]);
    } catch (e) {
      log(e.message);
      log(v);
      await wait3();
      log(v);
    }
  }
  
  async function i4() {
    // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
    //予想
    //5秒後に0、4秒後に1、3秒後に2、2秒後に3、1秒後に4、0秒後にCOMPLETEDが出力される。
    
    //確認結果
    //予想通りだった。
    
    //説明
    //直列に素直に順番通り実行された。

    let p = Promise.resolve(null);
    for (let i = 0; i < 5; ++i) {
      p = p.then(() => wait((5 - i) * 1000).then(() => log(i))); //thenの入れ子になっている
    }
    return p.then(() => log("COMPLETED"));
  }
  
  async function i5() {
    // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
    //予想
    //COMPLETED 4 3 2 1 0の順に出力される
    
    //確認結果
    //予想通りだった
    
    //説明
    //本来thenの引数にはコールバック関数を渡すべきところを、promiseを渡している。
    //そのため、thenチェーンが即座に解決され、待ち時間の短い順に出力された。
    //教科書p389に書かれている難しい部分の内容
    let p = Promise.resolve(null);
    for (let i = 0; i < 5; ++i) {
      p = p.then(wait((5 - i) * 1000).then(() => log(i)));
    }
    return p.then(() => log("COMPLETED"));
  }
  
  async function i6() {
    //予想
    //4 3 2 1 0 COMPLETEDの順番で出力される
    
    //確認結果
    //予想通りだった
    
    //説明
    //promise.allはすべてのpromiseが同時に実行開始されるため、待ち時間の短い順に出力される。また、完了後に次のthenであるCOMPLETEDが出力される。
    return Promise.all(
      [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
    ).then(() => log("COMPLETED"));
  }
  
  async function i7() {
    // NOTE: i8 との比較用
    
    //予想
    //11秒後に10が出力される
    
    //確認結果
    //予想通りだった
    
    //説明
    //特にひねりなくp1 p2の処理がすべて完了してから出力される

    let v = 0;
  
    // 1秒待った後に2秒間隔で value の値を更新
    const p1 = async () => {
      await wait1();
      for (let i = 0; i < 5; i++) {
        const next = v + 1;
        v = next;
        await wait2();
      }
    };
  
    // 2秒間隔で value の値を更新
    const p2 = async () => {
      for (let i = 0; i < 5; i++) {
        const next = v + 1;
        v = next;
        await wait2();
      }
    };
  
    await Promise.all([p1(), p2()]);
    log(v);
  }
  
  async function i8() {
    // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
    //予想
    //11秒後に5が出力される
    
    //確認結果
    //予想通りだった。
    
    //説明
    //p1とp2が同じ値を別々のメモリに値を保持し、連動しないので、5しかカウントアップしない
    let v = 0;
  
    const p1 = async () => {
      await wait1();
      for (let i = 0; i < 5; i++) {
        // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
        const next = v + 1;
        await wait2();
        v = next;
      }
    };
  
    const p2 = async () => {
      for (let i = 0; i < 5; i++) {
        const next = v + 1;
        await wait2();
        v = next;
      }
    };
  
    await Promise.all([p1(), p2()]);
    log(v);
  }
