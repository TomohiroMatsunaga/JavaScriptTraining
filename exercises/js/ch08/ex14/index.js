export function any(...funcs) {
    return function (...args) {
        //配列の各要素（受け取った複数の関数）に対してargsを引数に実行して、その戻り値をbooleanとして解釈する。
        //someは１つでもtrueがあったらtrueを返す。
        return funcs.some(func => func(...args));
    };
}

export function catching(func, errorHandler) {
    return function (...args) {
        try {
            // 最初の関数を実行
            return func(...args);
        } catch (e) {
            // 例外が発生した場合、errorHandler 関数を呼び出す
            return errorHandler(e);
        }
    };
}
