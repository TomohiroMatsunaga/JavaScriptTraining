export class C {
    #x = 42;
  
    getX() {
      return this.#x;
    }
  }
  

export function createC() {
    let x = 42;
  
    class C {
      getX() {
        return x;
      }
    }
  
    return C;
  }
