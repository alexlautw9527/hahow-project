import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    // 將 tsconfig.json 中的路徑配置同步到 vite.config.ts 中
    tsconfigPaths(),
    svgr(),
    TanStackRouterVite(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
