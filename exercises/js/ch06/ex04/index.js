const object = {};

Object.defineProperty(object, 'key', {
  value: 1,
  writable: true, // 値の変更を許可
  enumerable: true, // 列挙に含める
  configurable: true // 設定の変更や削除を許可
});

console.log(object.key); // 1

// keyの値を変更
object.key = 2;
console.log(object.key); // 2

// keyがobjectのプロパティか確認
console.log(object.hasOwnProperty('key')); // true

// key が列挙可能か確認
console.log(object.propertyIsEnumerable('key')); // true

// key プロパティを削除
delete object.key;
console.log(object.key); // undefined

// 新たに key プロパティを定義し、writable, enumerable, configurable を false に設定
Object.defineProperty(object, 'key', {
  value: 3,
  writable: false, // 値の変更を禁止
  enumerable: false, // 列挙に含めない
  configurable: false // 設定の変更や削除を禁止
});

console.log(object.key); // 3

// key プロパティの値を変更しようとする
try {
    object.key = 4;
}catch(e){
    console.log(e)
}
console.log(object.key); // 3 (変更不可)

//  key がobjectのプロパティか確認
console.log(object.hasOwnProperty('key')); // true

// propertyIsEnumerable で key が列挙可能か確認
console.log(object.propertyIsEnumerable('key')); // false (列挙不可)

// key プロパティを削除しようとする
try {
    delete object.key;
}catch(e){
    console.log(e)
}
console.log(object.key); // 3 (削除不可)
