import axios from 'axios';

import { urlPathParamInterceptor } from '@/lib/api/interceptors/request-interceptors';
import { apiDomain } from '@/configs/domain';

export const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: apiDomain,
});

/**
 * 於應用程式啟動時, 設定 axios 的 interceptors
 * 由於避免循環引用, 不直接 import router 做 navigation, 往後使用注入 callback 的方式
 */
export const setupAxiosInterceptors = () => {
  // 先清除所有攔截器
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();

  /**
   * request 攔截器
   * axios 中, 最「後」添加的攔截器會最先執行
   */

  axiosInstance.interceptors.request.use(urlPathParamInterceptor.onFulfill);

  /**
   * response 攔截器
   * axios 中, 最「先」添加的攔截器會最先執行
   */
};
