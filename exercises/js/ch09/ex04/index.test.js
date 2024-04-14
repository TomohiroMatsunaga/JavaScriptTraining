import { Warrior, MagicWarrior, WarriorPro, MagicWarriorPro } from "./index.js";

describe("クラスのテスト", () => {
  it("Warrior が攻撃すると、攻撃力の2倍のダメージを返す", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toBe(20);
  });

  it("MagicWarrior が攻撃すると、攻撃力に魔力を加えたダメージを返す", () => {
    const magicWarrior = new MagicWarrior(10, 15);
    expect(magicWarrior.attack()).toBe(25);
  });

  it("WarriorPro が攻撃すると、攻撃力の2倍のダメージを返す", () => {
    const warriorPro = Object.create(WarriorPro).init(10);
    expect(warriorPro.attack()).toBe(20);
  });

  it("MagicWarriorPro が攻撃すると、攻撃力に魔力を加えたダメージを返す", () => {
    const magicWarriorPro = Object.create(MagicWarriorPro).init(10, 15);
    expect(magicWarriorPro.attack()).toBe(25);
  });
});
