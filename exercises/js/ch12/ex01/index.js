function counterIter(max) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },
        return(value) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
    } finally {
        console.log("counterGen: finally");
    }
}




//counterIterへの操作
console.log("counterIterへの操作");
//counterIterの生成
const iter = counterIter(3); //"counterIter"が出力された

//Symbol.iteratorを呼び出す
console.log(iter[Symbol.iterator]() === iter);  //"counterIter: Symbol.iterator"が出力された。true が出力された。（自身を返した。）

//next()を使用して値を取得
console.log(iter.next().value);  //"counterIter: next"が出力された。1が出力された。
console.log(iter.next().done);   //"counterIter: next"が出力された。falseが出力された。
console.log(iter.next().value);  //"counterIter: next"が出力された。3が出力された。
console.log(iter.next().done);   //"counterIter: next"が出力された。trueが出力された。
console.log(iter.next().value); //"counterIter: next"が出力された。undefinedが出力された。

// return()の呼び出し
console.log(iter.return("終了").value);  //"counterIter: return: 終了"を出力た。"終了"が出力された。
console.log(iter.return("終了").done);  ////"counterIter: return: 終了"を出力た。trueが出力された。

// throw()の呼び出し
try {
    iter.throw(new Error("エラー"));    //"counterIter: throw: Error: エラー"が出力された。エラー発生箇所が出力された。
} catch (e) {
    console.error(e.message);  //"エラー"が出力された。
}



// counterGen() への操作
console.log("counterGenへの操作");
// counterGen のジェネレータを生成
const gen = counterGen(3);  //"counterGen"が出力された

//next()を使用して値を取得
console.log(gen.next().value);  //"counterGen: next"が出力された。1が出力された。
console.log(gen.next().done);   //"counterGen: next"が出力された。falseが出力された。
console.log(gen.next().value);  //"counterGen: next"が出力された。3が出力された。"counterGen: finally"が出力された。（try内の処理が終わり、finallyに移った）
console.log(gen.next().done);   //trueが出力された。(yeildを使っているループを抜けているため"counterGen: next"が出力されない)
console.log(gen.next().value); //undefinedが出力された。

// return()の呼び出し
console.log(gen.return("終了").value);  //"終了"が出力された。

// throw() の呼び出し
try {
    gen.throw(new Error("エラー発生"));
} catch (e) {
    console.error(e.message);  //"エラー発生"が出力された。
}


//以下ログ出力結果
// counterIterへの操作
// counterIter
// counterIter: Symbol.iterator
// true
// counterIter: next
// 1
// counterIter: next
// false
// counterIter: next
// 3
// counterIter: next
// true
// counterIter: next
// undefined
// counterIter: return: 終了
// 終了
// counterIter: return: 終了
// true
// counterIter: throw: Error: エラー
//     at file:///C:/Cheetah/JavaScriptTraining/exercises/js/ch12/ex01/index.js:67:20
//     at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
//     at async loadESM (node:internal/process/esm_loader:34:7)
//     at async handleMainPromise (node:internal/modules/run_main:113:12)
// エラー
// counterGenへの操作
// counterGen
// counterGen: next
// 1
// counterGen: next
// false
// counterGen: next
// 3
// counterGen: finally
// true
// undefined
// 終了
// エラー発生