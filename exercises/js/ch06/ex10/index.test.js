describe("sum", () => {
    it("オブジェクトの比較", () => {
        const obj1 = {
            foo: Math.random(),
            bar: Math.random(),
        };

        const obj2 = {
            fizz: Math.random(),
            buzz: Math.random(),
        };

        const obj3 = {
            bar: Math.random(),
            buzz: Math.random(),
        };

        const num1 = Math.random();
        const num2 = Math.random();

        const arr1 = [Math.random(), Math.random(), Math.random()];
        const arr2 = [Math.random(), Math.random()];

        const obj = {
            num1: num1,
            num2: num2,
            foo: obj1.foo,
            bar: obj3.bar,
            fizz: obj2.fizz,
            buzz: obj2.buzz,
            arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
        };

        const answer = {
            num1, //プロパティ名の宣言を省略
            num2,
            ...obj1, //オブジェクトの上書きにより記述量を減少
            ...obj3,
            ...obj2,
            arr: [...arr1, num1, ...arr2], //スプレッド演算子により記述量を減少
        };

        expect(answer).toEqual(obj);


    });
});
