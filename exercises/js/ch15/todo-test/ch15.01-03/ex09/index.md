React, jQuery などの主要なフロントエンドフレームワークを選び、そのフレームワークを使っていればどのように XSS 対策がされるか、また使っていてもどのような XSS の危険が残るか記述しなさい。

【回答】
ReactにはJSXというJavaScriptファイル内にHTMLのようなコードを記述できるJavaScriptの構文拡張機能がある。JSXでXSSが発生するコードを書くと、Reackが自動でエスケープ(無害化)する。
一方で、dangerouslySetInnerHTMLという属性があり、XSSのコードをそのままHTMLに組み込むことができてしまう。

jQueryにはtext()メソッドがあり、XSSの記述をただのテキストとして表示することができる。
一方で、html()メソッドがあり、直接HTMLを挿入することができ、XXSを発生させることができてしまう。