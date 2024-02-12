function bitCount(n) {
    let count = 0;
    while (n !== 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}

console.log(bitCount(0b111));
console.log(bitCount(0b1111111111111111111111111111111));
