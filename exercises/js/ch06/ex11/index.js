export const polar = {
    r: 0,
    theta: 0,
  
    get r() {
      return this.r;
    },
  
    set r(value) {
      this.r = value;
    },
  
    get theta() {
      return this.theta;
    },
  
    set theta(value) {
      this.theta = value;
    },
  
    get x() {
      return this.r * Math.cos(this.theta);
    },
  
    set x(value) {
      if (isNaN(value)) {
        throw new Error("x cannot be NaN");
      }
      const y = this.y;
      this.r = Math.sqrt(value ** 2 + y ** 2);
      this.theta = Math.atan2(y, value);
    },
  
    get y() {
      return this.r * Math.sin(this.theta);
    },
  
    set y(value) {
      if (isNaN(value)) {
        throw new Error("y cannot be NaN");
      }
      const x = this.x;
      this.r = Math.sqrt(x ** 2 + value ** 2);
      this.theta = Math.atan2(value, x);
    },
  };
  