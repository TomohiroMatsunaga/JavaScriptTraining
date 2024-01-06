let obj1 = { x: 1 };
obj1.y = 2;
console.log(obj1);

let obj2 = { x: 1, y: 2 };
console.log(obj2);
console.log(obj1 === obj2);


export function equals(objA, objB) {
  for (let key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  for (let key in objB) {
    if (objB[key] !== objA[key]) {
      return false;
    }
  }

  return true;
}

