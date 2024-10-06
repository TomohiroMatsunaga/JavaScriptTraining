import crypto from "crypto";
//---回答部分Start---
import fs from "fs/promises";  // ファイル操作用
//---回答部分End---

// AESのアルゴリズム
const algorithm = "aes-256-cbc";

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  //---回答部分Start---
  return crypto.randomBytes(32); // 256ビット（32バイト）の鍵を生成
  //---回答部分End---
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  //---回答部分Start---
  // 128ビット（16バイト）のIVを生成。同じ平文が毎回同じ暗号文にならないようにランダム性を追加するデータ。
  const iv = crypto.randomBytes(16); 
  //---回答部分End---

  // 暗号化とBase64エンコード
  //---回答部分Start---
  const cipher = crypto.createCipheriv(algorithm, key, iv); // AES-256-CBCで暗号化
  let encryptedBase64 = cipher.update(text, "utf8", "base64"); // 平文を暗号化
  encryptedBase64 += cipher.final("base64"); // 128ビットで割り切れなかった場合、残りの部分にパディングして暗号化
  //---回答部分End---

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  //---回答部分Start---
  await fs.writeFile("key.json", JSON.stringify({ key: key.toString("base64") }));
  //---回答部分End---
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  //---回答部分Start---
  //初期化ベクトルは同じ平文であっても異なる暗号文を生成するよう、ランダム性を追加するだけのものであり、知られても安全性に影響を与えないように設計されている。
  await fs.writeFile("encrypted.json", JSON.stringify(data)); // 暗号データを保存
  //---回答部分End---
}

async function readKey() {
  //---回答部分Start---
  const data = await fs.readFile("key.json"); //ファイルからKeyを読み込む
  const { key } = JSON.parse(data);
  return Buffer.from(key, "base64"); // Base64からバッファに変換して返す
  //---回答部分End---
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  //---回答部分Start---
  const data = await fs.readFile("encrypted.json");
  return JSON.parse(data); // JSON形式でデータを返す
  //---回答部分End---
}

// 復号して平文を返す
function decrypt64(data, key) {
  //---回答部分Start---
  const iv = Buffer.from(data.iv, "base64"); // Base64からIVを取得
  const decipher = crypto.createDecipheriv(algorithm, key, iv); // AES-256-CBCで復号化
  let decrypted = decipher.update(data.value, "base64", "utf8"); // 暗号文を復号化
  decrypted += decipher.final("utf8"); // 残りを復号化
  return decrypted; // 平文を返す
  //---回答部分End---
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey(); //ファイルからKeyを読み込む
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
