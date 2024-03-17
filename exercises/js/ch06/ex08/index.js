export function restrict(target, template) {
    Object.keys(target).forEach((key) => {
      if (!template.hasOwnProperty(key)) {
        delete target[key];
      }
    });
    return target;
  }
  
  export function substract(target, ...sources) {
    sources.forEach((source) => {
      Object.keys(source).forEach((key) => {
        if (target.hasOwnProperty(key)) {
          delete target[key];
        }
      });
    });
    return target;
  }