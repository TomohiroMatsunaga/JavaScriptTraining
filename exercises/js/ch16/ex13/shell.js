import fs from "fs";
import readline from "readline";
import { spawn } from "child_process";
import { PassThrough } from "stream";

// コマンドの実行
class ExecCmd {
  constructor(argv) {
    this.type = " ";
    this.argv = argv;
  }
}

// リダイレクト
class RedirCmd {
  constructor(cmd, file, type) {
    this.type = type; // "<" or ">"
    this.cmd = cmd;
    this.file = file;
  }
}

// パイプ
class PipeCmd {
  constructor(left, right) {
    this.type = "|";
    this.left = left;
    this.right = right;
  }
}

// NOTE: 以下のコマンドをパースした場合:
// ```
// echo HELLO | tr [:upper:] [:lower:] > hello.txt
//```
// 以下のようなオブジェクトが生成されるものとする
// new PipeCmd(
//   new ExecCmd(["echo", "HELLO"]),
//   new RedirCmd(new ExecCmd(["tr", "[:upper:]", "[:lower:]"]), "hello.txt", ">")
// )

//　RedirCmdの定義
// class RedirCmd {
//   constructor(cmd, file, type) {
//     this.type = type; // "<" or ">"
//     this.cmd = cmd;
//     this.file = file;
//   }
// }

// コマンドを実行する関数
// 第一引数に実行するコマンドのオブジェクト、第２引数にデータを入力するストリーム、第３引数に出力したデータを受け取るストリーム
async function runcmd(cmd, stdin = null, stdout = null) {
  switch (cmd.type) {
    case " ": // ExecCmd
      await new Promise((resolve, reject) => {
        // stdin, stdout が指定されている場合はパイプを作成する
        const child = spawn(cmd.argv[0], cmd.argv.slice(1), {
          stdio: [
            stdin ? "pipe" : "inherit",
            stdout ? "pipe" : "inherit",
            "inherit",
          ],
        });

        if (stdin) {
          stdin.pipe(child.stdin);
        }
        if (stdout) {
          child.stdout.pipe(stdout);
        }

        child.on("exit", () => resolve());
        child.on("error", (err) => reject(err));
      });
      break;

    case ">": // RedirCmd
      {
        // FIXME: ここを実装してね (2行程度)
        // HINT: cmd.file のストリームを createWriteStream で作成し runcmd を再帰的に呼び出す

        // よくわからない。上記のHINTの通り実装してみたらとりあえず動いた。
        //　出力リダイレクト（ファイルに保存する）機能の実装。
        const outStream = fs.createWriteStream(cmd.file); // ファイル書き込み用ストリームを作成する
        await runcmd(cmd.cmd, null, outStream); // runcmd を再帰的に呼び出した

      }
      break;

    case "<": // RedirCmd
      {
        // FIXME: ここを実装してね (2行程度)
        // HINT: cmd.file のストリームを createReadStream で作成し runcmd を再帰的に呼び出す

        // よくわからない。上記のHINTの通り実装してみたらとりあえず動いた。
        // 入力リダイレクト(ファイルからデータを読み込み、コマンドの入力として使う)機能の実装。
        const inStream = fs.createReadStream(cmd.file); // ファイルを読み込み用ストリーム作成を作成する
        await runcmd(cmd.cmd, inStream); // ファイルの内容を入力として使用してruncmd を再帰的に呼び出す

      }
      break;

    case "|": // PipeCmd
      {
        // FIXME: ここを実装してね (4行程度)
        // HINT: cmd.left と cmd.right に対して runcmd を再帰的に呼び出し Promise.all で待つ
        // HINT: left と right を繋ぐには new PassThrough() で作成したストリームを使用する

        // パイプ（コマンドの出力を別のコマンドの入力に渡す)機能の実装。
        const passThrough = new PassThrough(); // PassThroughはデータを連続的に処理できる箱のようなもの
        await runcmd(cmd.left, null, passThrough), // 左側のコマンドの出力をpassThroughに入れる
        await runcmd(cmd.right, passThrough) // passThrougを右側のコマンドの入力として使う
        passThrough.end(); // パイプを閉じる
      }
      break;

    default:
      console.error("unknown runcmd");
      process.exit(-1);
  }
}

// メイン関数
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
    terminal: false,
  });

  rl.prompt(); // > を表示

  for await (const rawLine of rl) {
    const line = rawLine.trim();
    if (line === "") {
      rl.prompt();
      continue;
    }
    if (line.startsWith("cd ")) {
      const dir = line.slice(3).trim();
      try {
        process.chdir(dir.trim());
      } catch (err) {
        console.error(`cannot cd ${dir}`);
      }
    } else {
      const cmd = parsecmd(line);
      try {
        rl.pause();
        await runcmd(cmd);
      } catch (err) {
        console.error(err);
      } finally {
        rl.resume();
      }
    }
    rl.prompt();
  }
}

// コマンドのパースに使用する文字
const symbols = "<>";

// コマンド文字列を解析する関数
function parsecmd(input) {
  const cmds = input.split("|").map((cmd) => cmd.trim());
  const parsedCmds = cmds.map((cmd) => parseexec(tokenize(cmd)));
  return parsedCmds.reduce((prev, curr) => new PipeCmd(prev, curr));
}

// 入力をトークンに分割する関数
function tokenize(input) {
  // NOTE: `A B "C D" 'E F G'` は ["A", "B", "C D", "E F G"] に変換される
  return input
    .match(/'[^']*'|"[^"]*"|\S+/g)
    .map((s) => s.replace(/^['"]|['"]$/g, ""))
    .filter((s) => s !== "");
}

// ">" や "<" を見つけて RedirCmd に変換する
function parseredirs(cmd, tokens) {
  let redirectIndex = tokens.findIndex((token) => symbols.includes(token));

  while (redirectIndex !== -1) {
    const symbol = tokens[redirectIndex];
    const file = tokens[redirectIndex + 1];

    if (!file) {
      console.error("missing file for redirection");
      process.exit(-1);
    }

    cmd = new RedirCmd(cmd, file, symbol);
    tokens.splice(redirectIndex, 2);
    redirectIndex = tokens.findIndex((token) => symbols.includes(token));
  }

  return cmd;
}

function parseexec(tokens) {
  const argv = [];
  // NOTE: parsedirs によって tokens の中身が変更される (">", "foo.txt" といったリダイレクトが削除)
  const cmd = parseredirs(new ExecCmd(argv), tokens);
  // NOTE: 残った tokens を argv に追加する
  argv.push(...tokens);
  return cmd;
}

main();
