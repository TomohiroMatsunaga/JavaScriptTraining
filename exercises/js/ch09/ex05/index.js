export function instanceOf(object, constructor) {
    let currentObject = Object.getPrototypeOf(object);

    while (currentObject !== null) { //一致するプロトタイプオブジェクトが見つかるか、プロトタイプオブジェクトが取得できなくなるまでループ
        if (currentObject === constructor.prototype) {
            return true;
        }
        currentObject = Object.getPrototypeOf(currentObject);
    }

    return false;
}
