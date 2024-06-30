import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from 'axios';
import { axiosInstance } from '@/lib/api/setup-axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 擴展 custom axios config, 「調用」 service 函數時使用, 用實際值來替換 url 中的 path params
    // 例如: /user/:id, path: { id: 123 } => /user/123
    pathParams?: Record<string, any>;

    // 擴展 custom axios config, 「生成」 service 函數時使用, 用來標記這個 request 是否需要 token
    authRequired?: boolean;
  }
}

// createService (生成一個 service 函數) 的基本設定, 規定輸入 url 和 method
// 並且可以自行加入其他 axios config, 例如 headers, timeout 等等, 達到更大的彈性
export type ServiceMetaConfig = AxiosRequestConfig & {
  url: NonNullable<AxiosRequestConfig['url']>;
  // 統一從 apiPath.ts 傳入, 限制小寫, 讓 axios 和 msw 都能使用
  method: Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
};

// 後端 result 經由包裝後, service 函數回傳的格式
export type ServiceResult<TData = null> = {
  data: TData;
  err: AxiosError | Error | null;
  rawResponse: AxiosResponse<TData> | null;
};

export class ServiceError extends Error {
  err: ServiceResult['err'];

  rawResponse: ServiceResult['rawResponse'];

  constructor(message: string, serviceResult: Omit<ServiceResult, 'data'>) {
    super(message);
    this.err = serviceResult?.err;
    this.rawResponse = serviceResult?.rawResponse;
  }
}

// 規範 service 函數需要的參數 object 型別
// 會在 createService 時使用泛型參數 TReqOptions 來規範
// 如 request body, query string, path params
export type ReqOptions = {
  // request body 參數，對應 AxiosRequestConfig.data
  reqBody?: { [key: string]: any };

  // URL 的 query string參數，對應 AxiosRequestConfig.params
  queryParams?: AxiosRequestConfig['params'];

  // 用來指定 path params 實際值，會在 interceptors 中替換成 path params
  pathParams?: AxiosRequestConfig['pathParams'];
};

/**
 * createService 是一個工廠函數, 用來產生一個封裝後的 axios api service 函數, 例如 getUser, login 等等
 * @template TReqOptions - 用來規範「產出後」的 axios api service 函數之參數型別
 * @template TData - 用來規範「產出後」的 axios api service 函數之回傳型別, 主要是 BackendResultFormat.data 的型別 (AxiosResponse.data.data)
 * @param serviceMetaConfig - 這個 api fetching 函數的基本設定, 通常是 url, method
 *
 * 泛型功能說明實例:
 * 假設使用 createService, 產出函數 「login」
 * 並且藉由泛型參數 ReqOptions 規定 reqBody 的資料格式 (例如 {email: string, password: string})
 * 在實際調用 「login」 純取 API 時, 如果沒有傳入 reqBody 作為參數、或是型別有錯誤, 會由 TypeScript 的型別檢查錯誤提示
 */

// 使用函數重載, 來規範不同的 createService 使用方式
// 若 TReqOptions 為 null, 則生成出來的 service 函數不需要傳入任何 reqOptions 參數
// 若 TReqOptions 為 ReqOptions, 則規範生成出來的 service 函數需要傳入一個 TReqOptions 規範的 reqOptions 參數
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function createService<TReqOptions extends null, TData>(
  serviceMetaConfig: ServiceMetaConfig
): () => Promise<ServiceResult<TData>>;

function createService<TReqOptions extends ReqOptions, TData>(
  serviceMetaConfig: ServiceMetaConfig
): (reqOptions: TReqOptions) => Promise<ServiceResult<TData>>;

function createService<TReqOptions, TData = null>(
  serviceMetaConfig: ServiceMetaConfig
) {
  return async (reqOptions: TReqOptions) => {
    const { authRequired } = serviceMetaConfig;

    const { pathParams, queryParams, reqBody } =
      (reqOptions as ReqOptions) || {};

    const mergedConfig: ServiceMetaConfig = {
      params: queryParams,
      data: reqBody,
      pathParams,
      ...serviceMetaConfig,

      authRequired: authRequired ?? true,

      headers: {
        ...serviceMetaConfig.headers,
      },
    };

    try {
      const rawResponse: AxiosResponse<TData, ServiceMetaConfig> =
        await axiosInstance.request<TData>(mergedConfig);

      return {
        err: null,
        data: rawResponse?.data || null,
        rawResponse,
      } as ServiceResult<TData>;
    } catch (err: any) {
      // 任何從 axios 中拋出的錯誤，包含攔截器或 400、500 等錯誤, 都會被這裡的 catch 捕捉
      // 並且重新包裝成 ServiceError, 以便後續處理
      console.log(err);

      // 拋出異常, 方便 react-query 或 thunk 處理
      const serviceResult = {
        err,
        rawResponse: err.response || null,
      };

      throw new ServiceError('Service Error', serviceResult);
    }
  };
}

export { createService };
