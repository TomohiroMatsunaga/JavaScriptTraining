export function sortJapanese(strings) {
    const collator = new Intl.Collator('ja', { sensitivity: 'base' }); //{sensitivity: base}オプションを指定することで、大文字と小文字、濁点と半濁点の違いを無視してくれた
    return strings.sort((a, b) => collator.compare(a, b));
}

export function toJapaneseDateString(date) {
    return date.toLocaleDateString('ja-JP-u-ca-japanese', {dateStyle: 'long'}); //ja-JP-u-ca-japaneseで和暦に変換。{dateStyle: 'long'}で令和6年5月17日の形式
}
