import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
//---回答部分Start---
async function monitorChildProcess() {
  //ループにより異常終了時に再実行させる
  while (true) {
    const [exitCode] = await startChild(); //child.jsをspawnでプロセスを立ち上げた（もう１つアプリを実行したようなもの）。プロセスの戻り値はexitCodeとsignal。そのうちexitCodeだけを取得している。
    if (exitCode == 0) { //exitCode0は正常終了
      break; //正常終了の場合は子プロセスを再実行しない
    } else {
      //do nothing ループにより再実行させる
    }
  }
}

//シグナル"SIGINT"（親プログラムをctrl + cで終了させたとき)とシグナル"SIGTERM"（プログラムにやめる準備をしてから終えるように伝わったとき）、子も終了させる
["SIGINT", "SIGTERM"].forEach(signal => {
  process.on(signal, () => {
    if (child) {
      child.kill(signal); // 子プロセスにシグナルを送信して終了を指示する
      child.on("exit", () => {
        process.exit(0); 
      });
    }
  });
});

monitorChildProcess();
//---回答部分End---