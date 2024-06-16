予想
1秒以上経ってもコンソールに"Hello, world!"が表示されない。
コード実行直後にsetTimeout()とlongRunningFunction()が実行される。
longRunningFunction()の無限ループによってスレッドが占有され続ける。

結果
予想通り、1秒以上経ってもコンソールに"Hello, world!"が表示されなかった。
JavaScriptのイベントはタスクキューとマイクロタスクキューに積まれる。
タスクキューの1つのタスクが実況完了した後、他のJavaScript コードに制御を返していなければマイクロタスクのキューに積まれたタスクを全て実行します。
タスクにはプログラムの初期実行、イベントコールバックの実行、インターバルやタイムアウトの発生など、標準的なメカニズムによって実行がスケジュールされる JavaScript コードが積まれます。setTimeout もこっちに積まれます。
マイクロタスクにはPromiseのthenやcatchコールバックが積まれます。

今回のコードではsetTimeout()もlongRunningFunction()もsetTimeout()のコールバックもタスクに積まれるが、
longRunningFunction()がタスクを占有続けていたためにsetTimeout()のコールバックが実行されなかった。