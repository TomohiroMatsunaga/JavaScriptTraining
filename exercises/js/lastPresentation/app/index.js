document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const currentTimeDisplay = document.getElementById('current-time');

    // local storageにデータが保存されているとき、初期値として入力する
    // 曲の選択（ラジオボタン）
    const savedSong = localStorage.getItem("selectedSong");
    if (savedSong) {
        const songRadio = document.querySelector(`input[name="song"][value="${savedSong}"]`);
        if (songRadio) {
            songRadio.checked = true;
        }
    }
    // アラームの時間（時）
    const savedHour = localStorage.getItem("alarmHour");
    if (savedHour) {
        const hourSelect = document.getElementById("alarm-hour");
        if (hourSelect) {
            hourSelect.value = savedHour;
        }
    }
    // アラームの時間（分）
    const savedMinute = localStorage.getItem("alarmMinute");
    if (savedMinute) {
        const minuteSelect = document.getElementById("alarm-minute");
        if (minuteSelect) {
            minuteSelect.value = savedMinute;
        }
    }
    // IPアドレス入力
    const savedIpAddress = localStorage.getItem("ipAddress");
    if (savedIpAddress) {
        const ipInput = document.getElementById("ip-address");
        if (ipInput) {
            ipInput.value = savedIpAddress;
        }
    }

    // 現在時刻を表示する関数
    function updateCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}`;
    }

    // １秒ごとに現在の時間を更新
    setInterval(updateCurrentTime, 1000);

    // 設定ボタンが押されたら
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // ユーザー入力値の取得
        const ipAddress = document.getElementById('ip-address').value;
        const music = document.querySelector('input[name="song"]:checked')?.value;
        const [cHour, cMinute] = currentTimeDisplay.textContent.split(':');
        const aHour = document.getElementById('alarm-hour').value;
        const aMinute = document.getElementById('alarm-minute').value;

        // バリデーション
        if (!ipAddress) {
            alert('IPアドレスを入力してください');
            return;
        }
        if (!music) {
            alert('曲を選択してください');
            return;
        }

        // JSONデータの作成
        const data = {
            message: "Hello", // 任意の文字列
            music: music === "ジングルベル" ? "Jingle Bells" : "Ode to Joy",
            cYear: "2024", // 固定値
            cMonth: "12",  // 固定値
            cDate: "25",   // 固定値
            cHour: cHour,
            cMinute: cMinute,
            aHour: aHour,
            aMinute: aMinute
        };

        try {
            // リクエストを送信
            const response = await fetch(`http://${ipAddress}:8080`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // レスポンスの確認
            if (response.ok) {
                // 正常に送信できたとき、設定値をlocal storageに保存する
                localStorage.setItem("selectedSong", music); // 曲の選択（ラジオボタン）
                localStorage.setItem("alarmHour", aHour); // アラームの時間（時）
                localStorage.setItem("alarmMinute", aMinute); // アラームの時間（分）
                localStorage.setItem("ipAddress", ipAddress); // IPアドレス入力

                alert('正常に送信されました');
            } else {
                alert(`エラーが発生しました: ${response.status}`);
            }
        } catch (error) {
            alert(`通信エラーが発生しました: ${error.message}`);
        }
    });

    // ページ読み込み時に現在の時間を更新
    updateCurrentTime();
});
