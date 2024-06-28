import { Provider } from "react-redux";
import { store } from "@/store";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterProvider, createRouter } from "@tanstack/react-router";
// 實則從 src/routeTree.gen.ts 擴充的
import { routeTree } from "@/routeTree.gen";

import { useAuth } from "@hooks/useAuth";
import { setupAxiosInterceptors } from "@services/setupAxios";
import { isLocal } from "@configs";

import { App as AntdApp, ConfigProvider, message } from "antd";
import {
  LOCAL_STORAGE_KEYS,
  redirectToLoginPage,
  removeLocalStorageItem,
} from "@helpers";
import { ServiceError } from "@services/apiServiceFactory";

import type { ApiMsgKey } from "@services";

import { useTranslation } from "react-i18next";

import type { MessageInstance } from "antd/es/message/interface";
import { antDesignGlobalToken } from "./styles/global";

const router = createRouter({
  routeTree,
});

// TanStack Router 型別安全的起手式
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const useConfiguredQueryClient = ({
  messageApi,
}: {
  messageApi: MessageInstance;
}) => {
  const { t } = useTranslation(["api"]);

  // 預設 message 使用 error, 從這參數決定哪些 key 使用 warning
  const messageWarningList: ApiMsgKey[] = [];

  const ignoreErrorList: ApiMsgKey[] = [];

  const handleError = (error: Error | ServiceError) => {
    if (error instanceof ServiceError) {
      const msgKey = (error.backendResult?.msg ??
        "others.unexpectedError") as ApiMsgKey;

      const msgParams = error.backendResult?.msgParams;

      if (ignoreErrorList.includes(msgKey)) {
        return;
      }

      const errorMsg: string = msgParams
        ? t(msgKey, { ...msgParams, defaultValue: "others.unexpectedError" })
        : t(msgKey, { defaultValue: "others.unexpectedError" });

      // 如果是 warning list 內的 key, 顯示 warning 樣式
      if (messageWarningList.includes(msgKey)) {
        messageApi.warning(errorMsg);
        return;
      }

      messageApi.error(errorMsg);
      return;
    }

    messageApi.error(t("others.unexpectedError"));
  };

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  });

  return queryClient;
};
export function Providers({ children }: { children: React.ReactNode }) {
  // 使用 const {message} = Antd.useApp() 要在 children 內的子元件調用才可以成功
  // 若要在最上層使用, 使用 useMessage 傳出的 contextHolder 和 messageApi, 才能吃到 antd config
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useConfiguredQueryClient({ messageApi });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {isLocal && <ReactQueryDevtools initialIsOpen={false} />}
        <ConfigProvider theme={antDesignGlobalToken}>
          <AntdApp>
            {contextHolder}
            {children}
          </AntdApp>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default function App() {
  const { logout } = useAuth();

  // 純記錄如何取得 path 型別
  // const loginRoute = "/login" as keyof FileRoutesByPath;

  const loginRedirect = async () => {
    logout();
    removeLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    redirectToLoginPage();
  };
  setupAxiosInterceptors({
    tokenExpiredCallback: loginRedirect,
    unauthorizedCallback: loginRedirect,
  });

  return <RouterProvider router={router} />;
}
