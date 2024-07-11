１、グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。
ブラウザでは window
Node.js では global
ブラウザとnode問わずではglobalThis

２、ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい
①open: 新しいウィンドウを開く(https://developer.mozilla.org/ja/docs/Web/API/Window/open)
②localStorage:期限のないストレージ(https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
③sessionStorage:ページのセッションが終了するときに消去されるストレージ(https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage)
④alert:任意のメッセージを含むダイアログを表示し、ユーザーがそのダイアログを閉じるまで待機する(https://developer.mozilla.org/ja/docs/Web/API/Window/alert)
⑤navigator:ブラウザに関する情報を取得する(https://developer.mozilla.org/ja/docs/Web/API/Window/navigator)
⑥location現在の文書の現在位置についての情報を持つ(https://developer.mozilla.org/ja/docs/Web/API/Window/location)
⑦history:これはブラウザーのセッション履歴 (現在のページが読み込まれているタブまたはフレームで訪れたことがあるページ群) を操作するためのインターフェイス(https://developer.mozilla.org/ja/docs/Web/API/Window/history)
⑧screen:現在のウィンドウがレンダリング(現在のウィンドウがレンダリングされている画面のプロパティ)されている画面のプロパティを持つ(https://developer.mozilla.org/ja/docs/Web/API/Window/screen)
⑨innerHeight:ウィンドウの内部の高さをピクセル単位で返す(https://developer.mozilla.org/ja/docs/Web/API/Window/innerHeight)
⑩innerWidth:ウィンドウの内部の幅をピクセル単位で返す(https://developer.mozilla.org/ja/docs/Web/API/Window/innerWidth)

３、グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。
古いJavaScriptでは、undefined が再定義可能だったため、他の値にうわ書きされて予測できないバグの原因となっていた。
