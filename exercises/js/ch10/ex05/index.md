【Nodeのモジュール方式】
エディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
module.exports = { Person, greet };がmodule.exports = { Person: Human,greet: hello };になり、問題なく実行できた。

デフォルトエクスポート
エクスポート側でmodule.exports = Person;のように書く。インポート側はインポートする名前を知っている必要がある。const Person = require('./myModule');

名前変更を伴うインポート
直接はサポートされていないが、以下のように書くことで同様の効果が得られる。
const { Person: Human } = require('./myModule');
const bob = new Human('Alice', 30);

名前変更の再エクスポート
myModule.jsのmodule.exports = { Person, greet };がmodule.exports = { Person: Human,greet: hello };になり、問題なく実行できた。

【ES6のモジュール方式】
エディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
import { Person, greet } from './myModule.js';がimport { Human, hello } from './myModule.js';になり、問題なく実行できた。

デフォルトエクスポート
export default class Person { // クラス定義 }を書くことで、インポート側は任意の名前でインポートできる。import AnyName from './myModule.js';

名前変更を伴うインポート
import { Person as AnyName } from './myModule.js';のようにインポート側で任意に名前を付けられる。

名前変更の再エクスポート
再エクスポート用にexport { Person, greet} from './myModule.js';だけが書かれたexportModule.jsを用意し、myModule.js側の名前変更を行たところ、
exportModule.jsの記述がexport { Human as Person, hello as greet} from './myModule.js';に変化し、問題なく実行できた。