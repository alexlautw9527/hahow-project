import type { AxiosError, AxiosResponse } from "axios";
import { API_SERVICES, apiPath } from "@services/constants";

/**
 * 如果 response status 是 401 授權錯誤, 則執行 unauthorizedCallback
 */
const createUnauthorizedInterceptor = (
  unauthorizedCallback: (() => Promise<void>) | (() => void),
) => ({
  onFulfill: (response: AxiosResponse) => response,

  onError: async (error: AxiosError) => {
    // 判斷 request 是否為 Login 頁相關流程, 若是則不執行 unauthorizedCallback
    // 不然如果是登入失敗碰到的 401 或 403, 會重複跳轉

    const loginPagePath: string[] = [apiPath[API_SERVICES.auth].path];
    const isLoginPage = loginPagePath.includes(
      error?.response?.config?.url || "",
    );

    const isAuthError =
      error?.response?.status === 401 || error?.response?.status === 403;

    if (isAuthError && !isLoginPage) {
      await unauthorizedCallback();
      return Promise.reject(error);
    }
    // 返回 Promise 錯誤
    return Promise.reject(error);
  },
});

export { createUnauthorizedInterceptor };
