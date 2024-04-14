//泣くことができる動物専用のクラス(CanMakeSound)を作り、makeSound()を定義する。

class Animal {
    eat() {
      console.log("食べる");
    }
  }
  
  class CanMakeSound {
    makeSound() {
      console.log("鳴く");
    }
  }
  
  class Dog extends Animal {
    constructor() {
      super();
      this.makeSoundBehavior = new CanMakeSound();
    }
  
    bite() {
        console.log("噛みつく");
      }

    makeSound() {
      this.makeSoundBehavior.makeSound();
    }    
  }
  
  class Husky extends Dog {}

  class Cat extends Animal {
    constructor() {
      super();
      this.makeSoundBehavior = new CanMakeSound();
    }
  
    scratch() {
        console.log("ひっかく");
      }

    makeSound() {
      this.makeSoundBehavior.makeSound();
    }
  }
  
  class Bird extends Animal {
    constructor() {
      super();
      this.makeSoundBehavior = new CanMakeSound();
    }

    fly() {
        console.log("飛ぶ");
    }
  
    makeSound() {
      this.makeSoundBehavior.makeSound();
    }
  }
  
  class Fish extends Animal {
    swim() {
      console.log("泳ぐ");
    }
  }
  

  const dog = new Dog();
    console.log("犬の行動:");
    dog.eat();
    dog.makeSound();
    dog.bite();

    const husky = new Husky();
    console.log("ハスキーの行動:");
    husky.eat();
    husky.makeSound();
    husky.bite();

    const cat = new Cat();
    console.log("猫の行動:");
    cat.eat();
    cat.makeSound();
    cat.scratch();

    const bird = new Bird();
    console.log("鳥の行動:");
    bird.eat();
    bird.makeSound();
    bird.fly();

    const fish = new Fish();
    console.log("魚の行動:");
    fish.eat();
    fish.swim();
    // fish.makeSound(); //これは定義されていないためエラー