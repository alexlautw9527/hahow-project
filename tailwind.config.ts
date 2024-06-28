import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // 移除 Tailwind CSS 的預設樣式, 以便使用 antd 的預設樣式 (reset.css)
    preflight: false,
  },
} satisfies Config;
