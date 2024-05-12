export class TypeMap {
    constructor() {
        this.map = new Map();
    }

    set(key, value) {
        if (typeof key !== 'function') {
            throw new Error("キーはコンストラクタ関数である必要があります");
        }
        if (!(value instanceof key)) {
            throw new Error("値はキーのコンストラクタ関数のインスタンスである必要があります");
        }
        this.map.set(key, value);
    }

    get(key) {
        return this.map.get(key);
    }
}