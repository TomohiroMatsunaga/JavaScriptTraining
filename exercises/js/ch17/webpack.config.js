import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // webpack.config.jsがあるディレクトリを取得

export default {
  entry: './ex06/index.js', // エントリーポイントのファイルを指定
  output: {
    filename: 'bundle.js', // 出力ファイル名
    path: path.resolve(__dirname, 'ex06', 'webpack'), // 出力先ディレクトリ
  },
  mode: 'production', // デバッグがしやすくなる情報を含むbundleを生成する場合はmode: 'development'
  devtool: 'source-map', // ソースマップを生成する設定を追加
};
