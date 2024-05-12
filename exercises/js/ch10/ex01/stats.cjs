const sum = (x, y) => x + y;
const square = x => x * x;

// データセットの平均値を計算する。
exports.mean = function (data) {
    return data.reduce(sum, 0) / data.length;
}

// データセットの標準偏差を計算する。
exports.stddev = function (d) {
    const m = exports.mean(d);
    return Math.sqrt(d.map(x => square(x - m)).reduce(sum, 0) / (d.length - 1));
}
