// sum: 配列内の数値の合計を計算
export function sum(array = []) {
    return array.reduce((x, y) => x + y, 0);
}

// join: 配列内のすべての要素を文字列に連結
export function join(array, separator = ',') {
    if (!Array.isArray(array) || array === undefined) {
        throw new Error('array is required');
    }
    return array.reduce((x, y, index) => {
        const prefix = index > 0 ? separator : '';
        const value = (y === null || y === undefined) ? '' : y;
        return `${x}${prefix}${value}`;
    }, '');
}


// reverse: 配列の要素の順序を逆順に
export function reverse(array) {
    if (array === undefined) throw new Error('array is required');
    return array.reduce((x, y) => [y, ...x], []);
}

// every: 配列内のすべての要素が指定したテスト関数を満たすかどうかを確認
export function every(array, test) {
    return array.length === 0 || Object.keys(array).reduce((x, key) => {
        return x && test(array[key], Number(key), array);
    }, true);
}

// some: 配列内の少なくとも一つの要素が指定したテスト関数を満たすかどうかを確認
export function some(array, test) {
    return Object.keys(array).reduce((x, key) => {
        return x || test(array[key], Number(key), array);
    }, false);
}



