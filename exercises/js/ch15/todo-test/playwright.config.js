// playwright.config.js
module.exports = {
    projects: [
      {
        name: 'firefox',
        use: {
          browserName: 'firefox',
          headless: false, // 必要に応じてヘッドレスモードを無効に
        },
      },
    ],
  };
  