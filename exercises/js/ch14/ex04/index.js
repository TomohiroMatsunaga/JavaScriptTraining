// HiraganaChar クラスを定義
export class HiraganaChar {
    constructor(char) {
      if (!char || char.length !== 1 || !char.match(/[\u3040-\u309F]/)) { //すべてのひらがなのUnicodeの範囲
        throw new Error("ひらがな1文字を指定してください");
      }
      this.char = char; // ひらがな1文字
      this.code = char.charCodeAt(0); // ひらがなのUTF-16コード単位
    }
  
    // Symbol.toPrimitive を使用してカスタムの型変換を実装
    [Symbol.toPrimitive](arg) {
      if (arg === "number") { // 数字が期待される場合は
        return this.code; //UTF-16コード単位を返す
      }
      return this.char; // 文字列が期待される場合やその他の場合はひらがなを返す
    }
  }