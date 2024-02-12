undefinedが書き換え可能なグローバル変数として存在していたから。
例えば誰かがundefinedに"something"と入れてしまったfoo === undefinedが成り立たなくなってしまう。
そこで、確実にundefinedを返すvoid 0を使用していた。