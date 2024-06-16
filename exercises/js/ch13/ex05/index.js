function g1() {
    return wait(1000)
      .then(() => {
        console.log("A");
        return wait(2000);
      })
      .then(() => {
        console.log("B");
        return wait(3000);
      })
      .then(() => {
        console.log("C");
      });
  }
  
  function g2() {
    return wait(1000)
      .then(() => console.log("A"))
      .then(() => wait(2000))
      .then(() => console.log("B"))
      .then(() => wait(3000))
      .then(() => console.log("C"));
  }

  function g3() {
    function log(message) {
      console.log(message);
    }
  
    return fetchUser()
      .then(user =>
        fetchUserFriends(user).then(friends => {    //thenを入れ子にしている
          log(`${user.name} has ${friends.length} friends!`);
        })
      ).catch();
  }
  
  function g4() {
    function someFunction() {
      return 42;
    }
  
    let value = someFunction();
    return Promise.resolve(value);  //someFunctionは非同期で実行する必要が無いためPromise.resolveを使う
  }
  











//以下問題に必要な関数


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