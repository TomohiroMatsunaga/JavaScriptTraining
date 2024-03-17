export function getAllPropertyNames(obj) {
    let props = [];
  
    // オブジェクトの独自プロパティ名（シンボルを除く）を取得して追加
    Object.getOwnPropertyNames(obj).forEach(prop => {
      if (props.indexOf(prop) === -1) { //見つからなかったら-1を返す(教科書P190)
        props.push(prop);
      }
    });
  
    // オブジェクトの独自シンボルプロパティ名を取得して追加
    Object.getOwnPropertySymbols(obj).forEach(sym => {
      if (props.indexOf(sym) === -1) {
        props.push(sym);
      }
    });
  
    // オブジェクトの列挙可能な継承プロパティ名を取得して追加（ただし、独自プロパティと重複しないように）
    let currentObj = obj;
    while ((currentObj = Object.getPrototypeOf(currentObj))) {
      Object.getOwnPropertyNames(currentObj).concat(Object.getOwnPropertySymbols(currentObj)).forEach(prop => {
        if (currentObj.propertyIsEnumerable(prop) && props.indexOf(prop) === -1) {
          props.push(prop);
        }
      });
    }
  
    return props;
  }
  
  //テスト
  const obj = Object.create({ inheritedProp: 'inherited' }, {
    ownProp: { value: 'own', enumerable: true },
    nonEnumerableProp: { value: 'non-enumerable', enumerable: false },
    [Symbol('symbolProp')]: { value: 'symbol', enumerable: true }
  });
  
  console.log(getAllPropertyNames(obj));
  