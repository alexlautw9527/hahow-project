import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import checker from 'vite-plugin-checker'

import type { PluginOption } from 'vite'

const noncePlugin = (nonceName = 'cm1vaw=='): PluginOption => ({
  name: 'add-nonce-script-attr',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace(new RegExp('<script', 'g'), `<script nonce="${nonceName}"`)
      .replace(new RegExp('<link', 'g'), `<link nonce="${nonceName}"`)
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 將 tsconfig.json 中的路徑配置同步到 vite.config.ts 中
    tsconfigPaths(), 
    svgr(),
    TanStackRouterVite(),
    noncePlugin(),
    checker({
      typescript: true,
    }),
  ], 
});
