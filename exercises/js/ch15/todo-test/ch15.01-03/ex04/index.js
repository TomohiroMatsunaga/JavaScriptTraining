console.log("globalThis.undefined:", globalThis.undefined);

//globalThis.undefinedの再定義
try {
    undefined = "I am not undefined";
    console.log("再定義後の globalThis.undefined:", undefined);
} catch (e) {
    console.error("globalThis.undefinedを再定義できません:", e);
}


console.log("最終的な undefined:", globalThis.undefined);
