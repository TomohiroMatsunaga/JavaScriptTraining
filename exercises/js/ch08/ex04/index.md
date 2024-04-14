回答：nmはオブジェクトnestに属しているため、thisはnestである。一方、arrowは関数でネストされている場合thisを継承するが、オブジェクトでネストされている場合は継承しないのではないかと予想した。
つまり、
false true
false true
と予想した。

結果は、
false true
false true
だった。
arrowはオブジェクトでネストされていてもthisを継承していた。