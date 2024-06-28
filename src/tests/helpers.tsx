import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import i18n from "@/i18n";
import { I18nextProvider } from "react-i18next";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * 測試時能提供 QueryClient 的 Provider 以及設立 userEvent
 *
 * source:
 * https://github.com/TanStack/query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17
 * https://tkdodo.eu/blog/testing-react-query
 * https://testing-library.com/docs/user-event/intro
 */

/**
 * reference: https://testing-library.com/docs/user-event/setup/
 */
export function setupUserEvent() {
  // 設置 userEvent
  const user = userEvent.setup();
  return user;
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  const queryClient = new QueryClient();
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </I18nextProvider>
    ),
    ...options,
  });
};

// 重新導出所有 @testing-library/react 的方法
export * from "@testing-library/react";

// 覆蓋原本的 render 方法
export { customRender as render };
