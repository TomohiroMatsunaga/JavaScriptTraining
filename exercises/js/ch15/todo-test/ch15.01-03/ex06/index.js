// ページが読み込まれた後に実
document.addEventListener("DOMContentLoaded", () => {
    // ユーザーエージェント情報を取得
    const userAgent = navigator.userAgent;
    // ユーザーエージェント情報をHTMLに表示
    document.getElementById('user-agent').textContent = `利用しているデバイスとブラウザ: ${userAgent}`;

    // 位置情報が利用できるか確認
    if ('geolocation' in navigator) {
        // 位置情報を取得する関数を呼び出す
        navigator.geolocation.getCurrentPosition((position) => {
            // 取得した位置情報から緯度と経度を取り出す
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // 緯度と経度を表示
            document.getElementById('location').textContent = `緯度: ${latitude}, 経度: ${longitude}`;
        });
    }
});
