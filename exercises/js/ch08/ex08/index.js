export function counterGroup() {
    let totalCounter = 0; // すべてのカウンターの合計を追跡する変数

    return {
        newCounter: function() {
            let n = 0; // このカウンターのローカルカウント
            return {
                count: function() {
                    totalCounter++; // 共通のトータルカウンターをインクリメント
                    return n++; // ローカルカウントをインクリメントし、返す
                },
                reset: function() {
                    totalCounter -= n; // 共通のトータルカウンターからこのカウンターのカウントを減算
                    n = 0; // ローカルカウントをリセット
                }
            };
        },
        total: function() {
            return totalCounter; // 共通のトータルカウンターの値を返す
        }
    };
}
