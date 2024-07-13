document.addEventListener("DOMContentLoaded", () => {
    // 1. nav 要素内のリンク (<a>)
    console.log("nav 要素内のリンク (<a>):", document.querySelectorAll("nav a"));   //[.]が無いための引数内で指定したタグの要素を全て取得。querySelectorAllであるためヒットした全ての要素
  
    // 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
    console.log("商品リスト (.product-list) 内の最初の商品 (.product-item):", document.querySelector(".product-list .product-item"));   //[.]があるためクラス引数内で指定したクラスの要素を取得。querySelectorであるため最初にヒットした要素を取得
  
    // 3. カートアイコンの画像 (<img>)
    console.log("カートアイコンの画像 (<img>):", document.querySelector(".cart img")); //cartクラスのimgタグの要素を取得
  
    // 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
    console.log("商品リスト (.product-list) 内の価格 (.price) を表示する要素:", document.querySelectorAll(".product-list .price")); //product-listクラス内の最初の要素のpriceクラスの最初の要素を取得
  
    // 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
    console.log("商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>):", document.querySelectorAll(".product-list .product-item img"));
  
    // 6. 検索バー (.search-bar) 内の検索ボタン (<button>)
    console.log("検索バー (.search-bar) 内の検索ボタン (<button>):", document.querySelector(".search-bar button"));
  
    // 7. フッター (footer) 内のパラグラフ (<p>) 要素
    console.log("フッター (footer) 内のパラグラフ (<p>) 要素:", document.querySelector("footer p"));
  
    // 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
    console.log("商品リスト (.product-list) 内の偶数番目の商品 (.product-item):", document.querySelectorAll(".product-list .product-item:nth-child(even)"));
  
    // 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
    console.log("ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>):", document.querySelector(".account img"));
  
    // 10. ナビゲーションリンクのうち、"会社情報" のリンク
    console.log("ナビゲーションリンクのうち、'会社情報' のリンク:", document.querySelector("nav a[href='#about']"));    //navタグ中の、aタグ中の、href属性が#aboutのものを取得
  });
  
// nav 要素内のリンク (<a>): NodeList(4) [ a, a, a, a ]index.js:3:13
// 商品リスト (.product-list) 内の最初の商品 (.product-item): <div class="product-item">index.js:6:13
// カートアイコンの画像 (<img>): <img src="./30" alt="カート">index.js:9:13
// 商品リスト (.product-list) 内の価格 (.price) を表示する要素: NodeList(4) [ p.price, p.price, p.price, p.price ]index.js:12:13
// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>): NodeList(4) [ img, img, img, img ]index.js:15:13
// 検索バー (.search-bar) 内の検索ボタン (<button>): <button>index.js:18:13
// フッター (footer) 内のパラグラフ (<p>) 要素: <p>index.js:21:13
// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item): NodeList [ div.product-item, div.product-item ]index.js:24:13
// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>): <img src="./30" alt="アカウント">index.js:27:13
// ナビゲーションリンクのうち、'会社情報' のリンク: <a href="#about"></a>index.js:30:13