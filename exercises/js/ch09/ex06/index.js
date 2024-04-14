//Mapが持つメソッド
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
export class TypedMap {
    constructor(keyType, valueType, entries) {
        this.keyType = keyType;
        this.valueType = valueType;

        // entriesが渡されている場合、型チェックを行います。
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`エントリの型が間違っています (${k}, ${v})`);
                }
            }
            // 型チェック後、エントリを使ってMapを初期化します。
            this.map = new Map(entries);
        } else {
            this.map = new Map(); // entriesがなければ空のMapを初期化
        }
    }

    set(key, value) {
        // キーと値の型が異なる場合はエラーを投げます。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} は型 ${this.keyType} ではありません`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} は型 ${this.valueType} ではありません`);
        }

        // 型が正しい場合、内部のMapインスタンスに値を設定します。
        return this.map.set(key, value);
    }

    // Mapのメソッドを委譲
    get(key) { return this.map.get(key); }
    get size() { return this.map.size; }
    clear() { this.map.clear(); }
    delete(key) { return this.map.delete(key); }
    entries() { return this.map.entries(); }
    forEach(callback, thisArg) { this.map.forEach(callback, thisArg); }
    has(key) { return this.map.has(key); }
    keys() { return this.map.keys(); }
    values() { return this.map.values(); }

    static groupBy(items, callbackFn) {
        return Map.groupBy(items, callbackFn);
    }
}
