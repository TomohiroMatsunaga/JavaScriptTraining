// 実行方法
// ディレクトリch17で「npm test -- ex02/jest.test.js」を実行

// jestをインポート
import { jest } from '@jest/globals';

// github操作の関数をもつindex.jsをモック化。
// ES Modulesで行うにはunstable_mockModuleを使う必要がある。unstable：将来変更の可能性ありということ
await jest.unstable_mockModule('./index.js', () => ({
  createIssue: jest.fn(),
  closeIssue: jest.fn(),
  listOpenIssues: jest.fn(),
}));

// 上記でモック化したindex.jsが持つモック関数をインポート
const { createIssue, closeIssue, listOpenIssues } = await import('./index.js');

describe('GitHub操作関数のテスト', () => {
  test('モック関数が正しい引数で呼び出されていることを確認', () => {
    // モック関数を呼び出す
    createIssue('test-token', 'test-user', 'test-repo', 'Issue Title', 'Issue Body');
    closeIssue('test-token', 'test-user', 'test-repo', 123);
    listOpenIssues('test-token', 'test-user', 'test-repo');

    // 引数を確認
    expect(createIssue).toHaveBeenCalledWith(
      'test-token',
      'test-user',
      'test-repo',
      'Issue Title',
      'Issue Body'
    );
    expect(closeIssue).toHaveBeenCalledWith(
      'test-token',
      'test-user',
      'test-repo',
      123
    );
    expect(listOpenIssues).toHaveBeenCalledWith(
      'test-token',
      'test-user',
      'test-repo'
    );
  });
});
