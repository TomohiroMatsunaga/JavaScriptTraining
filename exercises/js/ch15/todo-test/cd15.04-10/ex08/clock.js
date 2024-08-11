//即時関数を定義して実行
(function updateClock() { // SVG時計の画像を更新して現在時刻を表示する
    let now = new Date(); // 現在時刻
    let sec = now.getSeconds(); // 秒
    let min = now.getMinutes() + sec / 60; // 小数部を持つ分
    let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時

    let secangle = sec * 6; //【追加したコード】 1秒あたり6度
    let minangle = min * 6; // 1分あたり6度
    let hourangle = hour * 30; // 1時間あたり30度

    // 時計の針のSVG要素を取得する
    let clock = document.querySelector("#clock"); //【追加したコード】
    let sechand = document.querySelector("#clock .secondhand"); //【追加したコード】
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");

    // 【追加したコード】秒針が存在しない場合は追加する
    if (!sechand) {
        sechand = document.createElementNS("http://www.w3.org/2000/svg", "line"); // 第一引数に名前空間を指定し、新しいSVGの要素を作成
        sechand.setAttribute("class", "secondhand"); //secondhandは空のクラス。定義していない。
        sechand.setAttribute("x1", "50"); // 線の始点のx座標
        sechand.setAttribute("y1", "50"); // 線の始点のy座標
        sechand.setAttribute("x2", "50"); // 線の終点のx座標
        sechand.setAttribute("y2", "15"); // 線の終点のy座標
        clock.appendChild(sechand);
    }

    // SVG属性を設定して、時計盤の中で回転する
    sechand.setAttribute("transform", `rotate(${secangle},50,50)`); //【追加したコード】
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

    // 【修正したコード】1秒後にこの関数を再度実行する
    setTimeout(updateClock, 1000);
})();
