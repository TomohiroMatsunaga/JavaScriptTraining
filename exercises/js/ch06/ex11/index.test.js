import { polar } from "./index.js";

describe("極座標", () => {
  it("極座標からデカルト座標への変換テスト", () => {
    polar.r = 5;
    polar.theta = Math.PI / 4; // 45度
    expect(polar.x).toBeCloseTo(5 * Math.sqrt(2) / 2); //x=rcos(θ), cos(45度)は(√2)/2
    expect(polar.y).toBeCloseTo(5 * Math.sqrt(2) / 2); //y=rsin(θ), sin(45度)は(√2)/2
  });

  it("デカルト座標から極座標への変換テスト", () => {
    polar.x = 5 * Math.sqrt(2) / 2;
    polar.y = 5 * Math.sqrt(2) / 2;
    expect(polar.r).toBeCloseTo(5);
    expect(polar.theta).toBeCloseTo(Math.PI / 4);
  });

  it("NaNをセットしようとしたときにエラーが投げられることを確認", () => {
    expect(() => {
      polar.x = NaN;
    }).toThrow("x cannot be NaN");

    expect(() => {
      polar.y = NaN;
    }).toThrow("y cannot be NaN");
  });
});
