// 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す関数
export const repeatAndReturn = (n, c) => {
    Array.from({length: n}).forEach(() => console.log(c)); // 文字cをn回コンソール出力
    return Array.from({length: n}, () => c); // 文字cをn個含む配列を返す (p173)
  };

// 数値xを引数にとり、xの二乗の数値を返す関数
export const square = x => x ** 2;

// 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す関数
export const getCurrentTime = () => ({ now: new Date() });


  