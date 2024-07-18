export function typeNameTemplate(strings, ...values) { //文字列部分と補間部分を受け取る
    const value = values[0];
    const typeName = value !== undefined ? typeof value : 'undefined'; //補間部分の型をチェック
  
    return typeName;
  }