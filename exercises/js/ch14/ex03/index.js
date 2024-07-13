// IgnoreAccentPattern クラスを定義
class IgnoreAccentPattern {
    constructor(pattern) {
      if (typeof pattern === 'string') {
        this.pattern = pattern; // パターンとして文字列を保存
        this.flags = ''; // フラグを空に設定
      } else if (pattern instanceof RegExp) {
        this.pattern = pattern.source; // パターンのソース（文字列表現）を保存
        this.flags = pattern.flags; // 正規表現のフラグ(複数検索、大小区別...)を保存
      } else {
        throw new TypeError('Pattern must be a string or RegExp');
      }
    }
  
    // 文字列を正規化（NFD表記）してダイアクリティカルマークを除去するメソッド
    normalize(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
  
    // 保存したパターンを正規化して正規表現オブジェクトに変換するメソッド
    toRegex() {
      // 正規化したパターンを使って新しい正規表現オブジェクトを作成し、返す
      return new RegExp(this.normalize(this.pattern), this.flags);
    }
  
    // 比較元の文字列中でパターンを検索するメソッド（Symbol.search のカスタマイズ）
    [Symbol.search](str) {
      // 比較元の文字列を正規化してダイアクリティカルマークを除去
      const normalizedStr = this.normalize(str);
      // 正規化してダイアクリティカルマークを除去したパターンを使って検索し、その結果を返す
      return normalizedStr.search(this.toRegex());
    }
  
    // 比較元の文字列中でパターンにマッチする部分を見つけるメソッド（Symbol.match のカスタマイズ）
    [Symbol.match](str) {
      // 比較元の文字列を正規化してダイアクリティカルマークを除去
      const normalizedStr = this.normalize(str);
      // 正規化してダイアクリティカルマークを除去したパターンを使ってマッチングし、その結果を返す
      return normalizedStr.match(this.toRegex());
    }
  }
  
  // IgnoreAccentPattern クラスをエクスポート
  export { IgnoreAccentPattern };
  