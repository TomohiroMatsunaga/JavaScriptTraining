class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name} and I'm ${this.age} years old.`);
    }
}

function hello() {
    console.log(`Hello!`);
}

module.exports = {
    Person: Human,
    greet: hello
};
