// 特定の年と月を受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を受け取り、その期間の土日以外の日数を返す関数
export function countWeekdaysBetween(startDate, endDate) {
    let count = 0;
    let start = new Date(startDate);
    let end = new Date(endDate);
    while (start <= end) {
        const week = start.getDay();
        if (week !== 0 && week !== 6) { // 日曜は0、土曜は6
            count++;
        }
        start.setDate(start.getDate() + 1); //日にちを1日進める
    }
    return count;
}

// 日付とロケールを受け取り、その日の曜日をロケール形式の文字列で返す関数
export function getWeek(date, locale) {
    const day = new Date(date);
    return day.toLocaleString(locale, { weekday: 'long' }); //long:Monday, short:Mon, narrow:M
}


// ローカルタイムゾーンにおいて先月1日0時0分0秒のDateオブジェクトを返す関数
export function getFirstDayOfLastMonth() {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    return lastMonth;
}
