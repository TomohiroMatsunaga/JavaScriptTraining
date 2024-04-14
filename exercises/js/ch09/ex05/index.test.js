import { instanceOf } from "./index.js";
class Base {} //基底
class Derived extends Base {} //派生
class Unrelated {} //無関係

describe('instanceOfのテスト', () => {
    it('プロトタイプオブジェクトが見つかった場合に true を返す', () => {
        const derivedInstance = new Derived();
        expect(instanceOf(derivedInstance, Base)).toBe(true);
    });

    it('プロトタイプオブジェクトが見つからない場合に false を返す', () => {
        const unrelatedInstance = new Unrelated();
        expect(instanceOf(unrelatedInstance, Base)).toBe(false);
    });
});
