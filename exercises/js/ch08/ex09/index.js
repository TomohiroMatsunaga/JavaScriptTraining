export function withResource(resource, callback) {
    try {
      // コールバック関数を呼び出し、リソースを使用する
      callback(resource);
    } finally {
      // エラーの有無にかかわらず、必ずリソースをクローズする
      resource.close();
    }
  }
  