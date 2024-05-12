const myModule = require('./myModule');

const bob = new myModule.Person('Bob', 25);
bob.introduce();

myModule.greet();