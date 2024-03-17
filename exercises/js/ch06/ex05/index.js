export function getAllPropertyNames(obj) {
  let props = new Set();

  // 自身のプロパティ名を追加
  for (let prop of Object.getOwnPropertyNames(obj)) {
    props.add(prop);
  }
  // 自身のシンボルプロパティを追加
  for (let sym of Object.getOwnPropertySymbols(obj)) {
    props.add(sym);
  }

  let currentObj = obj;
  while ((currentObj = Object.getPrototypeOf(currentObj))) {
    for (let prop of Object.getOwnPropertyNames(currentObj)) {
      if (currentObj.propertyIsEnumerable(prop)) {
        props.add(prop);
      }
    }
  }

  return Array.from(props);
}
