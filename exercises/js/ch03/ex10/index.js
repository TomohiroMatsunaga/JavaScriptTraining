let obj = {
  name: "Mike",
  age: 28,
  city: "Yokohama"
};

console.log("プロパティ名一覧:");
for (let key in obj) {
  console.log(key);
}

console.log("値の一覧:");
for (let key in obj) {
  console.log(obj[key]);
}
