import axios from "axios";

import { apiBaseUrl } from "@configs";

import {
  urlPathParamInterceptor,
  attachTokenInterceptor,
  createTokenExpirationInterceptor,
  attachProductIdInterceptor,
} from "@services/interceptors/requestInterceptors";
import { createUnauthorizedInterceptor } from "@services/interceptors/responseInterceptors";

export const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: apiBaseUrl,
});

/**
 * 於應用程式啟動時, 設定 axios 的 interceptors
 * 由於避免循環引用, 不直接 import router 做 navigation, 而是使用注入 callback 的方式
 */
export const setupAxiosInterceptors = ({
  tokenExpiredCallback,
  unauthorizedCallback,
}: {
  tokenExpiredCallback: () => void;
  unauthorizedCallback: () => void;
}) => {
  const tokenExpirationInterceptor =
    createTokenExpirationInterceptor(tokenExpiredCallback);
  const unauthorizedInterceptor =
    createUnauthorizedInterceptor(unauthorizedCallback);

  // 先清除所有攔截器
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();

  /**
   * request 攔截器
   * axios 中, 最「後」添加的攔截器會最先執行
   */

  axiosInstance.interceptors.request.use(urlPathParamInterceptor.onFulfill);
  axiosInstance.interceptors.request.use(tokenExpirationInterceptor.onFulfill);
  axiosInstance.interceptors.request.use(attachProductIdInterceptor.onFulFill);
  axiosInstance.interceptors.request.use(attachTokenInterceptor.onFulFill);

  /**
   * response 攔截器
   * axios 中, 最「先」添加的攔截器會最先執行
   */
  axiosInstance.interceptors.response.use(
    unauthorizedInterceptor.onFulfill,
    unauthorizedInterceptor.onError,
  );
};
