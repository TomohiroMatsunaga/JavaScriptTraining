function fizzbuzz(n) {
    //n個の要素を持つ配列を作り、配列番号を使って処理を行う
    Array.from({ length: n }, (_, i) => i + 1).map(i =>
      console.log(`${i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i}`)
    );
  }
  
  function sumOfSquaredDifference(f, g) { //差の二乗和
    return f.map((v, i) => (v - g[i]) ** 2).reduce((acc, cur) => acc + cur, 0);
  }
  
  function sumOfEvensIsLargerThan42(array) { //偶数の合計は42よりも大きい
    return array.filter(v => v % 2 === 0).reduce((acc, cur) => acc + cur, 0) >= 42;
  }
  
  fizzbuzz(30);
  console.log(`差の二乗和([1,2,3], [4,5,6]), ${sumOfSquaredDifference([1,2,3], [4,5,6])}`);
  console.log(`偶数の合計は42よりも大きい([1,2,3,4,5,6,7,8,9,10,11,12]), ${sumOfEvensIsLargerThan42([1,2,3,4,5,6,7,8,9,10,11,12])}`);
