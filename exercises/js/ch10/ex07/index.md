[date-fns]
日付操作やに関する機能を提供している。
年に関する計算、月に関する計算、などの粒度で1つのファイルに書かれていて、テストとセットで1つのフォルダに入っている。整理されていてとても見やすい。
ES Modulesで書かれている。利用者は各ファイルをインポートして使う。内部実装とインポートするクラスが一緒になっている。

[Luxon]
日付と時刻の操作に関する機能を提供している。
日付と時刻に関連する機能、期間や時間の長さに関連する機能、などの粒度で1つのファイルに書かれていて、srcフォルダの中に直置きされている。
ES Modulesで書かれている。luxon/src/luxon.jsでユーザーに提供するクラスを際エクスポートしており、内部実装と切り分けられている。

[Day.js]
日付と時刻を解析、検証、操作、表示する機能を提供している。
src直下にあるindex.jsにDaysクラスがあり、ここに主要な機能が詰まっている。
ES Modulesで書かれている。利用者はDay.jsをインストールし、Daysクラスをインポートすることで使える(ファイルパス不要)。内部実装とインポートするクラスが一緒になっている。