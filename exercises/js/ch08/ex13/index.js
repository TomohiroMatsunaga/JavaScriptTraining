function f(input) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
  }
  
  // 悪意のある入力例：3秒間処理を遅延
  f('setTimeout(() => console.log("3 seconds delay"), 3000); "World"');