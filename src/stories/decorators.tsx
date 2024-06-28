/* eslint-disable @typescript-eslint/no-shadow */
import { App, ConfigProvider } from "antd";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@/store";

/**
 * 創造一個 root route, 並把 <Story/> 元件加入到 root route 中
 * Story 展示的元件中, 若用到 tanStack router 相關的 hook, 可以不報錯
 * reference: https://github.com/TanStack/router/discussions/952
 */
export const withRouter = (Story: any) => {
  const rootRoute = createRootRoute();
  const storyRoute = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: Story,
  });
  rootRoute.addChildren([storyRoute]);

  const storyRouter = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute,
    defaultNotFoundComponent: () => <div>Story 外的頁面</div>,
  });

  return <RouterProvider router={storyRouter} />;
};

const queryClient = new QueryClient();

/**
 * 將專案裝的 Provider 包裹至 Story 元件中
 * 可以在 Meta 層級或是 Story 層級機動使用
 */
export const withProviders = (Story: any) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        getPopupContainer={() =>
          document.getElementById("storybook-root") ?? document.body
        }
      >
        <App>
          <Story />
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  </Provider>
);

export const decorators = [withProviders, withRouter];
