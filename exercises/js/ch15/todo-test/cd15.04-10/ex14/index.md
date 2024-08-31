問題:
①ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？
②pushState はいつ実行されているだろうか？
③15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？

回答
①HTMLをリクエストする通信（ページのリロード）は発生していない。
②pushStateはリンクをクリックしたときに実行されている。
③15.4-10.12 でpushState を使った実装でページのリロード時に正しく動作しなかった問題は解決している。今回使用したNext.jsではサーバーサイドレンダリング（SSR）が使用されているため問題なくリロードすることができた。
サーバーサイドレンダリング（SSR）とは、ブラウザからリクエストが来たときに、サーバー側でページを作り出して（レンダリングして）、その完成したページをブラウザに返します。そのため、ページをリロードしてもサーバーが正しいページを返すことができる。

補足
npx create-next-appのコマンドでNext.jsを使ったプロジェクトを作っている。