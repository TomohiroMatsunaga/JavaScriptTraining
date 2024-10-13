import request from 'supertest';  // Supertestを使用してHTTPリクエストをテストする
import { serve } from './index.js';  // テスト対象のserve関数をインポート
import path from 'path';  // パス操作のための標準モジュール
import { fileURLToPath } from 'url';  // ファイルのURLをパスに変換するためのモジュール

// 実行しているテストファイルの絶対パスを取得
const filename = fileURLToPath(import.meta.url);
// 実行しているテストファイルがあるディレクトリのパスを取得
const dirname = path.dirname(filename);

let server;  // サーバーインスタンスを格納する変数

// テスト用のルートディレクトリを指定
const rootDirectory = path.resolve(dirname, './test');


describe('HTTPサーバーからのGET', () => {

    // テスト開始前に実行される処理
    beforeAll((done) => {
        // テスト用のサーバーを指定したディレクトリとポート8000で起動
        server = serve(rootDirectory, 8000);
        done();  // 非同期操作の完了を通知
    });

    // テスト終了後に実行される処理
    afterAll((done) => {
        // サーバーを停止する
        server.close(done);
    });

    test('ファイルを正しく返すか', async () => {
        // GETリクエストを送信
        const response = await request('http://localhost:8000').get('/testfile.txt');

        // ステータスコードが200（成功）であることを確認
        expect(response.statusCode).toBe(200);
    });

    test('存在しないファイルの場合はエラーを返す', async () => {
        // 存在しないファイルにGETリクエストを送信
        const response = await request('http://localhost:8000').get('/nonexistent.txt');

        // ステータスコードが404（ファイルが見つからない）であることを確認
        expect(response.statusCode).toBe(404);
    });
});
