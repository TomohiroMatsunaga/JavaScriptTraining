document.addEventListener("DOMContentLoaded", () => {
    const div = document.getElementById("editor-front");
    const input = document.getElementById("editor-back");
  
    // editor-frontの初期背景色を白色に設定
    div.style.backgroundColor = "white";
  
    // editor-frontをクリックするとeditor-backがフォーカスされる
    div.addEventListener("click", () => {
      input.focus();
    });
  
    // editor-backにフォーカスされるとeditor-frontの色が灰色になる
    input.addEventListener("focus", () => {
      div.style.backgroundColor = "silver";
    });
  
    // フォーカスが外れたときeditor-frontの色が城に戻る
    input.addEventListener("blur", () => {
      div.style.backgroundColor = "white";
    });
  
    // editor-backに入力された textがeditor-frontのにも表示される
    input.addEventListener("input", () => {
      div.textContent = input.value;
    });
  });
  