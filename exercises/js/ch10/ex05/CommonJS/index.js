const myModule = require('./exportModule');

const bob = new myModule.Person('Bob', 25);
bob.introduce();

myModule.greet();