const m = function (...arg) {
    console.log(arg[1]);
  };
  m("a", "b");

  const n = (...args) => {
    console.log(args[1]);
  };
  n("a", "b");
  