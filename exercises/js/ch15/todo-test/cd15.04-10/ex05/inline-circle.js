customElements.define("inline-circle", class InlineCircle extends HTMLElement {
  connectedCallback() {
    this.style.display = "inline-block";
    this.style.borderRadius = "50%";
    this.style.transform = "translateY(10%)";

    if (!this.style.width) {
      this.style.width = "0.8em";
      this.style.height = "0.8em";
    }

    //border-coloerの設定されていなかったら、デフォルトで黒色にする
    if(!this.style.border){
      this.style.border = "solid black 1px";
    }
  }

  static get observedAttributes() {
    return ["diameter", "color", "border-color"]; //通知して欲しい要素border-colorを追加
  }

  //要素が初めて解釈されるときに呼ばれる
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "diameter":
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      case "color":
        this.style.backgroundColor = newValue;
        break;
      case "border-color": // ボーダーカラーの設定を追加
        this.style.border = `solid ${newValue} 1px `;
        break;
    }
  }

  get diameter() { return this.getAttribute("diameter"); }
  set diameter(diameter) { this.setAttribute("diameter", diameter); }
  get color() { return this.getAttribute("color"); }
  set color(color) { this.setAttribute("color", color); }
});
