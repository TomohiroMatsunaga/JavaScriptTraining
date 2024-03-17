export function addMatrices(A, B) {
    const result = A.map((row, i) =>
        row.map((val, j) => val + B[i][j])
    );

    return result;
}

export function multiplyMatrices(A, B) {
    const result = new Array(A.length).fill(0).map(() => new Array(B[0].length).fill(0)); //undefinedに対してmapが使えないため0で初期化

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}
