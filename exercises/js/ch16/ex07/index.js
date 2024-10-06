import { stat } from 'fs/promises';  // fsモジュールのpromises APIをインポート

//パスの文字列を引数に受ける
export async function checkEntry(path) {
  try {
    // 指定されたパスの情報を取得
    const stats = await stat(path);

    // ファイルかディレクトリかを判定
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'directory';
    }
  } catch (err) {
    // ファイルやディレクトリが存在しない場合などのエラー処理
    console.error('エラー:', err);
    return 'path does not exist';
  }
}