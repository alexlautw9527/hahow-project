import type { InternalAxiosRequestConfig } from 'axios';

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
    const { url = '', pathParams = {} } = config;
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
          new Error(`Missing path parameters: ${missingPathParams.join(', ')}`)
        );
      }
      return { ...config, url: replacedUrl };
    }
    return config;
  },
};

export { urlPathParamInterceptor };
