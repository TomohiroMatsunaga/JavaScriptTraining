import { escapeCharactersIfElse, escapeCharactersSwitch } from "./index.js";

describe("escapeCharactersIfElse", () => {
    it("文字 '0' をヌル文字にエスケープする", () => {
        expect(escapeCharactersIfElse("ヌル文字にエスケープする「0」")).toBe("ヌル文字にエスケープする「\0」");
    });

    it("文字 'b' をバックスペースにエスケープする", () => {
        expect(escapeCharactersIfElse("バックスペースにエスケープする「b」")).toBe("バックスペースにエスケープする「\b」");
    });

    it("文字 't' をタブにエスケープする", () => {
        expect(escapeCharactersIfElse("タブにエスケープする「t」")).toBe("タブにエスケープする「\t」");
    });

    it("文字 'n' を改行にエスケープする", () => {
        expect(escapeCharactersIfElse("改行にエスケープする「n」")).toBe("改行にエスケープする「\n」");
    });

    it("文字 'v' を垂直タブにエスケープする", () => {
        expect(escapeCharactersIfElse("垂直タブにエスケープする「v」")).toBe("垂直タブにエスケープする「\v」");
    });

    it("文字 'f' を改ページにエスケープする", () => {
        expect(escapeCharactersIfElse("改ページにエスケープする「f」")).toBe("改ページにエスケープする「\f」");
    });

    it("文字 'r' をキャリッジリターンにエスケープする", () => {
        expect(escapeCharactersIfElse("キャリッジリターンにエスケープ「r」")).toBe("キャリッジリターンにエスケープ「\r」");
    });

    it("ダブルクオート '\"' をエスケープする", () => {
        expect(escapeCharactersIfElse('ダブルクオートをエスケープする「"」')).toBe('ダブルクオートをエスケープする「\"」');
    });

    it("シングルクオート '\'' をエスケープする", () => {
        expect(escapeCharactersIfElse("シングルクオートをエスケープする「'」")).toBe("シングルクオートをエスケープする「\'」");
    });
});

describe("escapeCharactersSwitch", () => {
    it("文字 '0' をヌル文字にエスケープする", () => {
        expect(escapeCharactersSwitch("ヌル文字にエスケープする「0」")).toBe("ヌル文字にエスケープする「\0」");
    });

    it("文字 'b' をバックスペースにエスケープする", () => {
        expect(escapeCharactersSwitch("バックスペースにエスケープする「b」")).toBe("バックスペースにエスケープする「\b」");
    });

    it("文字 't' をタブにエスケープする", () => {
        expect(escapeCharactersSwitch("タブにエスケープする「t」")).toBe("タブにエスケープする「\t」");
    });

    it("文字 'n' を改行にエスケープする", () => {
        expect(escapeCharactersSwitch("改行にエスケープする「n」")).toBe("改行にエスケープする「\n」");
    });

    it("文字 'v' を垂直タブにエスケープする", () => {
        expect(escapeCharactersSwitch("垂直タブにエスケープする「v」")).toBe("垂直タブにエスケープする「\v」");
    });

    it("文字 'f' を改ページにエスケープする", () => {
        expect(escapeCharactersSwitch("改ページにエスケープする「f」")).toBe("改ページにエスケープする「\f」");
    });

    it("文字 'r' をキャリッジリターンにエスケープする", () => {
        expect(escapeCharactersSwitch("キャリッジリターンにエスケープ「r」")).toBe("キャリッジリターンにエスケープ「\r」");
    });

    it("ダブルクオート '\"' をエスケープする", () => {
        expect(escapeCharactersSwitch('ダブルクオートをエスケープする「"」')).toBe('ダブルクオートをエスケープする「\"」');
    });

    it("シングルクオート '\'' をエスケープする", () => {
        expect(escapeCharactersSwitch("シングルクオートをエスケープする「'」")).toBe("シングルクオートをエスケープする「\'」");
    });
});
