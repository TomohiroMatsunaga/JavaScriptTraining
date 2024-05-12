const stats = require("./stats.cjs");
const { BitSet } = require("./sets.cjs");

let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);

let average = stats.mean([...s]);
console.log(`Average: ${average}`);  // 平均値を出力