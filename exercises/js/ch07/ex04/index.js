const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1. mathの全員の合計点
const totalMath = data.reduce((x, y) => x + y.math, 0);
console.log(`数学の合計点: ${totalMath}`);

// 2. クラスAのchemistryの平均点
const classAChemistry = data.filter(student => student.class === 'A').map(student => student.chemistry);
const averageChemistryA = classAChemistry.reduce((x, y) => x + y, 0) / classAChemistry.length;
console.log(`クラスAの化学の平均点: ${averageChemistryA}`);

// 3. 3科目合計点のクラスC内での平均点
const classCTotalPoints = data.filter(student => student.class === 'C').map(student => student.math + student.chemistry + student.geography);
const averageTotalC = classCTotalPoints.reduce((x, y) => x + y, 0) / classCTotalPoints.length;
console.log(`クラスCの3科目合計の平均点: ${averageTotalC}`);

// 4. 3科目合計点が最も高い人のname
const maxTotalName = data.map(student => ({
    name: student.name,
    total: student.math + student.chemistry + student.geography
})).reduce((x, y) => y.total > x.total ? y : x).name;
console.log(`3科目合計点が最も高い人: ${maxTotalName}`);

// 5. 全体のgeographyの標準偏差
const meanGeography = data.map(student => student.geography).reduce((x, y) => x + y, 0) / data.length; //平均値
const variance = data.map(student => student.geography).reduce((x, y) => x + Math.pow(y - meanGeography, 2), 0) / data.length; //分散
const stdDevGeography = Math.sqrt(variance); //標準偏差
console.log(`地理の標準偏差: ${stdDevGeography}`);