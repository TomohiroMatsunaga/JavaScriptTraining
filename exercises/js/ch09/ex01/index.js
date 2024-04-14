export class C {
    // 静的メソッド
    static method() {
      return 1;
    }
  
    // インスタンスメソッド
    method() {
      return 2;
    }
  
    // 静的プロパティにクラスCを定義
    static C = class {
      static method() {
        return 3;
      }
  
      method() {
        return 4;
      }
    }
  
    // インスタンスプロパティとしてクラスCを定義
    constructor() {
      this.C = class {
        static method() {
          return 5;
        }
  
        method() {
          return 6;
        }
      }
    }
  }

//Cクラスの静的メソッド
//Cインスタンスのメソッド
//Cクラスの静的プロパティに割り当てられたクラスCの静的メソッド
//クラスCの静的プロパティに割り当てられたクラスCのインスタンスのメソッド
//クラスCのインスタンスのプロパティが持つクラスCの静的メソッド
//クラスCのインスタンスが持つクラスCのインスタンスが持つメソッド