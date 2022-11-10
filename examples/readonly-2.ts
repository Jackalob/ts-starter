/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */

// Readonly and Static in Typescript Classes

class Doggy {
  constructor(public readonly name: string, public readonly age: number) {
    this.name = name;
    this.age = age;
  }
}

// type Doggy 可以直接當作是 readonly版的 { name: string, age: number }

const firstDog = new Doggy('Dus', 5);
const secondDog = new Doggy('Bebe', 7);

class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() {}

  public addDog(newDog: Doggy) {
    this.doggies.push(newDog);
  }

  // static method
  static addDog2(newDog: Doggy) {
    DogList.instance.doggies.push(newDog);
  }

  getDogs() {
    return this.doggies;
  }
}

// instance 必須是 static 才能在 class 上直接取得值
DogList.instance.addDog(firstDog);
DogList.addDog2(secondDog);

console.log(DogList.instance.getDogs());

// 避免下面的方式可以建立 DogList 的 instance，可以在 DogList 上寫一個 private 的 constructor
// const dl = new DogList()
