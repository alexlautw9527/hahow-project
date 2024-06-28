import { accountApiBaseUrl } from "@configs";
import { PRODUCT_IDS } from "@constants";
import { checkTokenExpired, getLocalStorageItem } from "@helpers";
import { LOCAL_STORAGE_KEYS } from "@helpers/common/localStorage";
import type { InternalAxiosRequestConfig } from "axios";

/**
 * 用於處理 URL 中的 path param 的攔截器
 * 例如：/user/:id
 * 從 URL 中提取 :id
 * 調用 service 時會則會傳入 path object, 將它們替換為對應的欄位
 * ex: { id: "123"} => /user/123
 * 如果 path object 中缺少任何 path param, 則拋出錯誤
 */

const urlPathParamInterceptor = {
  onFulfill: (config: InternalAxiosRequestConfig) => {
    const { url = "", pathParams = {} } = config;
    if (Object.keys(pathParams).length > 0) {
      const missingPathParams: string[] = [];

      // 用 path object 中的實際值替換 URL 中的 path param
      // ex /book/:bookId/chapter/:chapterId
      // 並檢查是否有缺少的 path param
      const replacedUrl = url.replace(/:([^/]+)/g, (_, pathToReplace) => {
        if (!pathParams[pathToReplace]) {
          missingPathParams.push(pathToReplace);
        }
        return pathParams[pathToReplace] as string;
      });

      if (missingPathParams.length) {
        return Promise.reject(
          new Error(`Missing path parameters: ${missingPathParams.join(", ")}`),
        );
      }
      return { ...config, url: replacedUrl };
    }
    return config;
  },
};

/**
 * 用於處理在 request 自動附加 token 的攔截器
 */
const attachTokenInterceptor = {
  onFulFill: (config: InternalAxiosRequestConfig) => {
    const { authRequired } = config;

    if (!authRequired) {
      return config;
    }

    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
    return config;
  },
};

/**
 * 處理 token 過期的攔截器
 * 若 token 過期, 則執行 tokenExpiredCallback
 * 因為避免循環引用, 不直接 import router 做 navigation
 * 而是使用注入 callback 並生成實際 interceptor
 */
const createTokenExpirationInterceptor = (
  tokenExpiredCallback: (() => void) | (() => Promise<void>),
) => ({
  onFulfill: async (config: InternalAxiosRequestConfig) => {
    const { authRequired } = config;

    if (!authRequired) return config;

    let token = config.headers?.Authorization || "";

    if (authRequired && !token) {
      await tokenExpiredCallback();
      throw new Error("No Token Provided");
    }

    token = (token as string).replace("Bearer ", "");

    if (checkTokenExpired(token)) {
      await tokenExpiredCallback();
      throw new Error("Token expired");
    }

    return config;
  },
});

/**
 * 碰上 migo account 相關的 API, request body 會自動附加 productId
 */
const attachProductIdInterceptor = {
  onFulFill: (config: InternalAxiosRequestConfig) => {
    const MODIFIABLE_METHODS = ["post", "patch", "put", "delete"];
    if (
      config.baseURL?.includes(accountApiBaseUrl) &&
      MODIFIABLE_METHODS.includes(config.method?.toLowerCase() ?? "")
    ) {
      const updatedConfig = {
        ...config,
        data: {
          ...config.data,
          productId: PRODUCT_IDS.LIT_JOURNEY,
        },
      };
      return updatedConfig;
    }
    return config;
  },
};

export {
  urlPathParamInterceptor,
  attachTokenInterceptor,
  createTokenExpirationInterceptor,
  attachProductIdInterceptor,
};
