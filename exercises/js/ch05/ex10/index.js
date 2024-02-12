const obj = {a: 1};

console.time('Without with');
for (let i = 0; i < 1000000; i++) {
    let value = obj.a;
}
console.timeEnd('Without with');

console.time('With with');
for (let i = 0; i < 1000000; i++) {
    with (obj) {
        let value = a;
    }
}
console.timeEnd('With with');
