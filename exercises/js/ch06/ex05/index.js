// プロトタイプオブジェクトの定義
const prototypeObject = {
  numberProp: 42,
  stringProp: "Hello"
};

// プロトタイプを継承するオブジェクトの作成
const myObject = Object.create(prototypeObject);

// プロトタイプと同名の列挙不可のプロパティをオブジェクトに追加
Object.defineProperty(myObject, "numberProp", {
  value: 100,
  enumerable: false // 列挙不可
});

// プロトタイプと同名ではない列挙可のプロパティをオブジェクトに追加
myObject.anotherNumberProp = 123;
myObject.anotherStringProp = "World";

// for/in ループでオブジェクトのプロパティを列挙
for (const prop in myObject) {
  console.log(`${prop}: ${myObject[prop]}`);
}

// 直接 myObject に属するプロパティを確認（列挙不可のプロパティも含む）
console.log(myObject.numberProp); // 列挙不可のプロパティも直接アクセス可能
