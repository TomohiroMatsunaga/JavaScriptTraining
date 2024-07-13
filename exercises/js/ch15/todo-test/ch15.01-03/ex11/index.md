以下のhtmlを開き、ボタン押下時のコンソール出力結果を確認しなさい。
→以下が出力された
div	index.html:13
button	index.html:18

次にcaptureの値を変更しdivとbuttonのコンソール出力順序が逆になることを確認しなさい。
→以下が出力された
button	index.html:18
div	index.html:13

最後にブラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listners)で、btn等に登録されているイベントをそれぞれ確認しなさい。
→以下のイベントが登録されていた
divに対してhandler: () => { console.log("div"); }
btnに対してhandler: () => { randomEventTarget.trigger(); }
btnに対してhandler: () => { console.log("button"); }