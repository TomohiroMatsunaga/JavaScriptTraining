// webpack.config.cjs
module.exports = {
  mode: 'none',
  entry: './ch10/ex01/index.cjs',  // エントリーポイントを正確に一度だけ指定
  output: {
    path: __dirname + '/ch10/ex01/dist',
    filename: 'main.js',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.mjs$|\.cjs$/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
