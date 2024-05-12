export function modifyUrl({ base, addQuery, path }) {
    try {
      const url = new URL(base); // URLインスタンスを作成
  
      //パスの追加
      if (path) {
        url.pathname = new URL(path, url.href).pathname; // 引数に相対パス, 絶対パスを入れてURLを更新
      }
  
      // クエリパラメータの追加
      if (addQuery) {
        addQuery.forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }
  
      // 最終的なURLを文字列として返す
      return url.href;
    } catch (error) {
      throw new Error("Invalid URL format");
    }
  }
  