問題
また、主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

回答
SIGTERM
Graceful Shutdown（優雅な終了）のためにはSIGTERMが一般的なシグナル。
必要な終了処理を行ってから終了するように促す。