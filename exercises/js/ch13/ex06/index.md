jQueryはJavaScriptを使ったWeb開発を簡単にするために設計されたJavaScriptライブラリ。jQueryは2006年に初めてリリースされ、jQueryのDeferredは2011年からリリースされた。
DeferredはPromiseと同様に非同期処理を管理するメカニズムであり、Promiseがthen()、catch()、finally()を持つのと同様にDeferredもdone()、fail()、always()を持つ。
DeferredはPromiseとは異なりresolve、rejectのメソッドを持っており、非同期操作の完了、失敗を外部から操作できる。notifyのメソッドから進行中の非同期操作の進行状況を把握することができる。
Deferredはpromise()のメソッドを持っており、promiseオブジェクトを取得することも可能。