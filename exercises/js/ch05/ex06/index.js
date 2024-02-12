try {
    console.log('tryブロック開始');

    throw new Error('これはエラーです');

    console.log('tryブロック終了'); //このコードは実行されない
} catch (error) {
    console.log('catchブロック実行: ', error.message); //catchブロック実行:  これはエラーです
} finally {
    console.log('finallyブロック実行');
}
