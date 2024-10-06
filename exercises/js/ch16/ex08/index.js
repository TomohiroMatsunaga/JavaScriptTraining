//実行方法
//Issueの作成
//node index.js --token <GITHUB_TOKEN> --user <USERNAME> --repo <REPOSITORY_NAME> create "Issue Title" "Issue Body"
//Issueのクローズ
//node index.js --token <GITHUB_TOKEN> --user <USERNAME> --repo <REPOSITORY_NAME> close <ISSUE_NUMBER>
//オープンなIssueの一覧を表示
//node index.js --token <GITHUB_TOKEN> --user <USERNAME> --repo <REPOSITORY_NAME> list


import https from 'https'; //httpリクエストを送るためのライブラリ

// コマンドライン引数を取得
const args = process.argv;
//argsの中身の例
//['/usr/local/bin/node'(Node.jsの実行パス), '/path/to/your/script/index.js'(実行されているスクリプトのパス), '--token', <GITHUB_TOKEN>, '--user', <USERNAME>, '--repo', <REPOSITORY_NAME>]


// アクセストークン、ユーザー名、リポジトリ名を取得
const token = args[args.indexOf('--token') + 1];
const user = args[args.indexOf('--user') + 1];
const repo = args[args.indexOf('--repo') + 1];

// verboseオプションの確認(より詳細な情報を出力するオプション)
const verbose = args.includes('-v') || args.includes('--verbose');

// ヘルプオプションがあるとき、使い方を出力する
if (args.includes('-h') || args.includes('--help')) {
  console.log(`
    使い方: node index.js --token <GITHUB_TOKEN> --user <USERNAME> --repo <REPOSITORY_NAME> [options]

    Options:
      create "Issue Title" "Issue Body"   新しいIssueを作成する
      close <ISSUE_NUMBER>    指令した番号のIssueをクローズする
      list                    IssueのIDとタイトルを一覧表示する
      -h, --help              ヘルプを表示する
      -v, --verbose           HTTPログを出力する
  `);
}

// HTTPリクエストのヘッダーを設定する
const headers = {
  'Authorization': `token ${token}`,
  'User-Agent': 'Node.js',  //このHTTPリクエストを送信するクライアントが何かを伝える
  'Content-Type': 'application/json' //リクエストとレスポンスのボディのデータ型を定義
};

// HTTPリクエストのオプションをログを出力する（verboseのとき）
function logRequestOptions(options) {

  // JSONを使ったディープコピー
  const optionsCopy = JSON.parse(JSON.stringify(options));
  // optionsCopyのheadersのAuthorizationをセキュリティの観点から変更しておく
  optionsCopy.headers['Authorization'] = 'Bearer new-token';

  if (verbose) {
    console.log('Request Options:', optionsCopy);
  }
}

// レスポンスをログに出力する（verboseのとき）
function logResponseData(data) {
  if (verbose) {
    console.log('Response Data:', data);
  }
}

// GitHubのIssueを作成する関数
function createIssue(title, body) {
  // リクエストのボディに書き込むJSON
  const data = JSON.stringify({
    title,
    body
  });

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${user}/${repo}/issues`,
    method: 'POST',
    headers: headers
  };

  logRequestOptions(options);  // リクエストのオプションをログに出力

  const req = https.request(options, (res) => {
    let responseBody = '';

    //サーバーから送られてくるデータをchunkという小さな部分ごとに受け取る
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      console.log('Issue created successfully');
      logResponseData(responseBody);  // レスポンスのデータをログに出力する
    });
  });

  // リクエストに問題が発生したとき
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(data); //リクエストのボディにJSONデータを書き込む
  req.end(); //送信する（Nodeにリクエストの作成が完了したことを伝えている）
}

// GitHubのIssueをクローズする関数
function closeIssue(issueNumber) {
  // リクエストのボディに書き込むJSON
  const data = JSON.stringify({
    state: 'closed'
  });

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${user}/${repo}/issues/${issueNumber}`, //Issueの番号をここで指定
    method: 'PATCH', //リソースの部分的な変更で使われるリクエスト
    headers: headers
  };

  logRequestOptions(options);  // リクエストのオプションをログに出力する

  const req = https.request(options, (res) => {
    let responseBody = '';

    //サーバーから送られてくるデータをchunkという小さな部分ごとに受け取る
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      console.log(`Issue #${issueNumber} closed successfully.`);
      logResponseData(responseBody);  // レスポンスのデータをログに出力する
    });
  });

  // リクエストに問題が発生したとき
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(data); //リクエストのボディにJSONデータを書き込む
  req.end(); //送信する（Nodeにリクエストの作成が完了したことを伝えている）
}

// オープンなIssue一覧を取得する関数
function listOpenIssues() {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${user}/${repo}/issues?state=open`,
    method: 'GET',
    headers: headers
  };

  logRequestOptions(options);  // リクエストオプションをログに出力

  https.get(options, (res) => { //リクエストのボディーがないので、そのまま送信される
    let responseBody = '';

    //サーバーから送られてくるデータをchunkという小さな部分ごとに受け取る
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        // レスポンスをJSONとして解析
        const issues = JSON.parse(responseBody);

        console.log('Open Issues:');
        issues.forEach(issue => {
          console.log(`ID: ${issue.id}, Title: ${issue.title}`);
        });
      } catch (e) {
        //レスポンスの解析に失敗したとき
        console.error('Error parsing response:', e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
}

// コマンドライン引数から実行するアクションを判断して実行する
if (args.includes('create')) {
  const title = args[args.indexOf('create') + 1];
  const body = args[args.indexOf('create') + 2] || '';
  createIssue(title, body);
} else if (args.includes('close')) {
  const issueNumber = args[args.indexOf('close') + 1];
  closeIssue(issueNumber);
} else if (args.includes('list')) {
  listOpenIssues();
}
