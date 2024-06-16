export function fibonacci() {
    let x = 0, y = 1;
    //イテレーターは「反復結果オブジェクトを返すnext()」と「自分自身を返す[Symbol.iterator]関数」を持つ
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const current = y;
            [x, y] = [y, x + y];
            return { value: current, done: false }; //done は常に false
        }
    };
}

function* fibonacciSequence() {
    let x = 0, y = 1;
    for (;;) {
        yield y;
        [x, y] = [y, x + y]; // 分割代入を使用している
    }
}
