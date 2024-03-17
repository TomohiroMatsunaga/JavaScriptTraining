const prototype1 = {
  property : "value"
};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// Expected output: true
