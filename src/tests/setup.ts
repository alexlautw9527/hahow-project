import "@testing-library/jest-dom";
import { server } from "@mocks/node";
import { setupI18n } from "@/i18n";

/**
 * 這個程式會在每個測試檔案執行前執行
 */

setupI18n({ isTestingMode: true });

beforeAll(() => {
  // 測試開啟 msw node server
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// antd Form 表單元件會用到, 需要進行 mock
// reference: https://github.com/ant-design/ant-design/issues/21096
Object.defineProperty(window, "matchMedia", {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});
