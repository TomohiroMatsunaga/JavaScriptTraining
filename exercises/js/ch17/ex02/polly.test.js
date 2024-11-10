// 実行方法
// ディレクトリch17で「npm test -- ex02/polly.test.js」を実行

// new Pollyを実行してから、polly.stop()を呼び出すまのhttpリクエストが自動的にインターセプト（補足）されて、ファイルに保存される。
// ２回目のテスト実行時には保存された情報が利用される

// Pollyと関連モジュールを先にインポート
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

// Polly に必要なアダプターとパーシスターを登録
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// Polly の登録が完了した後にモジュールをインポート
import { createIssue, closeIssue, listOpenIssues } from './index.js';


describe('GitHub操作関数のテスト', () => {
  let polly;
  const token = 'bazz'; // ハードコーディングで記入
  const user = 'bizz'; // ハードコーディングで記入
  const repo = 'buzz'; // ハードコーディングで記入
  const issueNum = 28; // ハードコーディングで適切なissue番号を記入
  const title = 'Test Issue Title';
  const body = 'Test Issue Body';
  

  const headers = {
    'Authorization': `token ${token}`,
    'User-Agent': 'Node.js',  //このHTTPリクエストを送信するクライアントが何かを伝える
    'Content-Type': 'application/json' //リクエストとレスポンスのボディのデータ型を定義
  };

  // テストの前にPollyを設定
   // 実行記録をファイルに保存する
  beforeAll(() => {
    polly = new Polly('GitHub API Tests', {
      adapters: ['node-http'],
      persister: 'fs',
      logging: false,
      persisterOptions: {
        fs: {
          recordingsDir: '__recordings__',
        },
      },
    });
  });

  // テスト後にPollyを停止
  afterAll(async () => {
    await polly.stop();
  });

  test('createIssue', async () => {

    const result = await createIssue(
      headers,
      user,
      repo,
      title,
      body,
    );

    // タイトルとボディが一致していることを確認
    expect(result.title).toBe(title);
    expect(result.body).toBe(body);
  });

  test('closeIssue', async () => {
    const result = await closeIssue(
      headers,
      user,
      repo,
      issueNum,
    );

    // issueの状態がclosedになったことを確認
    expect(result.state).toBe('closed');
  });

  test('listOpenIssues', async () => {
    const issues = await listOpenIssues(headers, user, repo);

    // 配列を受け取れたことを確認
    expect(Array.isArray(issues)).toBe(true);

    // クローズしたissueNumのissueが含まれていないことを確認
    const issueExists = issues.some(issue => issue.number === issueNum); // someはtrueを返すまでArrayの要素に対して（）内の処理を実行
    expect(issueExists).toBe(false);
  });
});
