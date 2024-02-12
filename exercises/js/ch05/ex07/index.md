予想
falseが出力される。
return が書かれると即座に関数が終了するイメージがあるが、finallyは必ず実行されるため、恐らくtry内のreturn trueがfalseに上書きされてからf()が終了すると予想した。

結果
falseが出力された