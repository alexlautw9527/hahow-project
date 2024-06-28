import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from 'vite'

export default defineConfig({
  plugins: [tsconfigPaths()], // 將 tsconfig.json 中的路徑配置同步到 vite.config.ts 中
  test: {
    // test 檔案可直接使用 globals(例如 describe, expect), 不用再另外 import
    globals: true,
    environment: "jsdom",
    setupFiles: ['./src/tests/setup.ts'],

    // 使用 .env.mock
    env: loadEnv('mock', process.cwd(), ''),
  },
});
