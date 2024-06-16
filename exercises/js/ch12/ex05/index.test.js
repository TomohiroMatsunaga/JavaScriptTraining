import { readLines } from './index.js';

describe("readLines", () => {
  const testFilePath = './ch12/ex05/momotaro.txt';

  it("ファイルを改行ごとに読み込む", () => {
    const gen = readLines(testFilePath);
    expect(gen.next().value).toBe("むかし、むかし、ある所におじいさんとおばあさんが住んでいました。");
    expect(gen.next().value).toBe("おじいさんは山へしば刈りに、おばあさんは川へ洗濯に行きました。");
    expect(gen.next().value).toBe("おばあさんが川で洗濯をしていると大きな桃が流れてきました。");
    expect(gen.next().value).toBe("「なんと大きな桃じゃろう！家に持って帰ろう。」");
    expect(gen.next().value).toBe("とおばあさんは背中に担いで家に帰り、その桃を切ろうとすると、なんと桃から大きな赤ん坊が出てきたのです。");
    expect(gen.next().value).toBe("「おっとたまげた。」");
    expect(gen.next().done).toBe(true); //すべての行が読み込まれたことを確認
  });
});
