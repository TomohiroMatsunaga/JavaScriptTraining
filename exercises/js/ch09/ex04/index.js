//クラス
export class Warrior {
    constructor(atk) {
        this.atk = atk;
    }

    attack() {
        return this.atk * 2;
    }
}

export class MagicWarrior extends Warrior {
    constructor(atk, mgc) {
        super(atk);
        this.mgc = mgc;
    }

    attack() {
        return this.atk + this.mgc;
    }
}


//プロトタイプ
export var WarriorPro = {
  init: function(atk) {
    this.atk = atk;
    return this;
  },
  attack: function() {
    return this.atk * 2;
  }
};

export var MagicWarriorPro = Object.create(WarriorPro); // WarriorPro をプロトタイプとして継承

MagicWarriorPro.init = function(atk, mgc) { //initをoverride
    WarriorPro.init.call(this, atk); // 親の init を呼び出し
    this.mgc = mgc;
    return this;
};

MagicWarriorPro.attack = function() {
    return this.atk + this.mgc
}
