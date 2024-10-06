setInterval(() => {
  console.log("child processing...");
  if (Math.random() < 1 / 3) { //3分の１の確率でこのif分が実行される
    console.log("An error occurred. Exiting...");
    process.exit(1); //プログラムの終了
  }
}, 100); //このコードを0.0秒ごとに繰り返す