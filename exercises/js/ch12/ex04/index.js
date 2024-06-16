export function* primeGenerator() {
    let primes = []; //見つけた素数を格納するリスト
    let candidate = 2; //素数候補の初期値

    while (true) {
        let isPrime = true;

        // 候補数が素数かどうかを判定
        for (const prime of primes) {
            if (candidate % prime === 0) {
                isPrime = false;
                break; // 割り切れた場合、素数ではないためループを抜ける
            }
        }

        // 素数であればリストに追加して、値を返す
        if (isPrime) {
            primes.push(candidate);
            yield candidate;
        }

        // 次の候補数に移る
        candidate++;
    }
}