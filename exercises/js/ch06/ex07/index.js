export function assign(target, ...sources) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
  
    const result = Object(target);
  
    sources.forEach(source => {
      if (source != null) {
        // Symbolを含む列挙可能な独自プロパティをコピー
        Object.keys(source).concat(Object.getOwnPropertySymbols(source)).forEach(key => {
            result[key] = source[key];
        });
      }
    });
  
    return result;
  }
  