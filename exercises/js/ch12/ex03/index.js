export function* resettableCounter() {
    let count = 0;
    while (true) {
        try {
            console.log("tryの最初")
            yield count++;
            console.log("tryの最後")
        } catch (e) {
            if (e === "reset") {
                count = 0;  //"reset"例外を受け取ったときにカウンタをリセット
                yield count //（※）ここでyieldを記述することで、次にnext()関数が呼ばれたときの開始位置をnext()関数の先頭からにしている
            } else {
                throw e;  //それ以外の例外はスロー
            }
        }
    }
}

const counter = resettableCounter();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2

counter.throw("reset");

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1