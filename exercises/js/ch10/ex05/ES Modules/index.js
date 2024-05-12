import { Person, greet } from './exportModule.js';

const bob = new Person('Bob', 25);
bob.introduce();

greet();