const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
    viewport: { width: 1280, height: 900 }
  },
  webServer: {
    command: "node tools/dev-server.js 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  }
});
