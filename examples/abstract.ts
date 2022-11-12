abstract class StreetFighter {
  constructor() {}

  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }
  abstract getSpecialAttack(): string; // 要被 implement 的 method
  abstract get name(): string; // 要被 implement 的變數
}

// abstract 的 class 無法被 instanciate
// extends 這個 class 的新 class 必須去實現 abstract 的 屬性

// const ryu = new StreetFighter() // 會報錯

class Ryu extends StreetFighter {
  getSpecialAttack() {
    return 'Hadoken';
  }

  get name() {
    return 'Ryu';
  }
}

const ryu = new Ryu();

ryu.fight();
