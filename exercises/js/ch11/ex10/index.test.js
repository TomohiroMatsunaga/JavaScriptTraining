import { getDaysInMonth, countWeekdaysBetween, getWeek, getFirstDayOfLastMonth } from "./index.js";

describe("Date utilities", () => {
  it("特定の年月の日数を返します。", () => {
    expect(getDaysInMonth(2024, 2)).toBe(29); // うるう年
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it("指定された期間の土日以外の日数を返す", () => {
    expect(countWeekdaysBetween('2024-05-01', '2024-05-17')).toBe(13);
  });

  it("特定の日付の曜日をローケルの形式の文字列で返す", () => {
    expect(getWeek('2024-05-13', 'en-US')).toBe('Monday');
    expect(getWeek('2024-05-13', 'fr-FR')).toBe('lundi'); // フランス語
  });

  it("先月の1日のDateオブジェクトを返す", () => {
    const now = new Date();
    const expectedMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0).getMonth();
    expect(getFirstDayOfLastMonth().getMonth()).toBe(expectedMonth);
  });
});
