export function generateFibonacciWhile() {
    const result = [1, 1];
    while (result.length < 10) {
        const nextValue = result[result.length - 2] + result[result.length - 1];
        result.push(nextValue);
    }
    return result;
}

export function generateFibonacciDoWhile() {
    const result = [1, 1];
    do {
        const nextValue = result[result.length - 2] + result[result.length - 1];
        result.push(nextValue);
    } while (result.length < 10);
    return result;
}

export function generateFibonacciFor() {
    const result = [1, 1];
    for (let i = 2; i < 10; i++) {
        const nextValue = result[i - 2] + result[i - 1];
        result.push(nextValue);
    }
    return result;
}
