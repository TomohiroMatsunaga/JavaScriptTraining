export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name} and I'm ${this.age} years old.`);
    }
}

export function greet() {
    console.log(`Hello!`);
}