import文の前後やimport先のコードの実行順序はどうなりますか?
予想
「ログ出力A > import(ログ出力ありB) > ログ出力C > ログ出力D > import(ログ出力Bあり) > ログ出力E」の順でコードを書いた。
importは巻き上げられるので、
ログの出力は「B > B > A > C > D > E」の順になると予想した。

実行結果
「B > A > C > D > E」の順だった。
同じimportは複数あっても1度しかインポートされなかった。