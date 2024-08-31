index.js でdocument.cookie プロパティを console.logで表示する
→何も表示されない。HttpOnlyがcookieに設定されているためJavaScriptからcookieの値が見えない。


ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する
→表示される。e5ca4757-bc46-4615-9c24-286a314abd59


ToDo アプリのタブをリロードする
→表示される。変わらない。e5ca4757-bc46-4615-9c24-286a314abd59


同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する
→表示される。変わらない。e5ca4757-bc46-4615-9c24-286a314abd59


シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する
→表示される。異なる。e1295633-cc56-4152-bce0-21659f44de75

http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する
→表示される。異なる。9d9db4b7-16dc-4efd-8bb2-819ce1b85d63
→サーバーとして別物として扱われるため