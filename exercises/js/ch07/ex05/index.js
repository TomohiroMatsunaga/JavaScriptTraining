// pop: 配列の最後の要素を除去した新しい配列を返す
export function pop(array) {
    return array.slice(0, -1);
}

// push: 配列の末尾に一つ以上の要素を追加した新しい配列を返す
export function push(array, ...elements) {
    return [...array, ...elements];
}

// shift: 配列の最初の要素を除去した新しい配列を返す
export function shift(array) {
    return array.slice(1);
}

// unshift: 配列の先頭に一つ以上の要素を追加した新しい配列を返す
export function unshift(array, ...elements) {
    return [...elements, ...array];
}

// sort: 指定された比較関数に従って配列の要素をソートした新しい配列を返す
export function sort(array, compareFunction) {
    return [...array].sort(compareFunction);
}

