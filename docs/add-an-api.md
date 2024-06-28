// TODO: 要重新整理

# 增加一個 API 的流程

## BASIC: 定義 API 路徑 `@services/apiPath.ts`

在 `createService` 或 mock handler 的時候，都可以從這裡取用

```ts
login: {
  path: "/account/auth",
  // 使用小寫, 讓 axios 和 msw 都能使用
  method: "post",
},
```

## BASIC: `@services/apis/*.ts` 來創建 service（以 `auth.ts` 為例）

- 定義 request body 和 response data 的型跌

```tsx
// __Data 是 POST、PUT、PATCH 等的 request body data 的格式型別
export type BasicLoginData = {
  email: string;
  password: string;
};

export type FullLoginData = BasicLoginData & {
  productId: typeof MIGO_PRODUCT_ID.LIT_JOURNEY;
};

// __Payload 是 API response.data 的核心資料格式型別
export type LoginPayload = {
  accessToken: string;
};
```

- 定義該 API 的 key constant object
  - 使用 `as const` + `ValueOf` 達到 enum 的效果，卻可以有比較好的相容性

```tsx
// 使用 UPPER_SNAKE_CASE
// 這裡的 key 後端會回傳的 key, 會對應到 i18n public/locales/**/api.json
export const LOGIN_BACKEND_MSG_KEYS = {
  PASSWORD_ERROR: "login.passwordError",
  PASSWORD_ERROR_EXCEED: "login.passwordErrorExceed",
  NO_PRODUCT_PURCHASED: "login.noProductPurchased",
  IP_NOT_ALLOW: "login.ipNotAllow",
} as const;

// 這是 object value 的聯合型別
export type LoginBackendMsgKey = ValueOf<typeof LOGIN_BACKEND_MSG_KEYS>;
```

- 實際創建 service

`createService` 會生成實際的 API service，使用泛型參數，來對實際的 service 達到型別規範

```ts
// createService<TReqOptions, TData>
// 詳細說明參照 @services/apiServiceFactory.ts
const login = createService<{ reqBody: FullLoginReqBody }, LoginData>({
  url: apiPath.login.path,
  method: apiPath.login.method,
  baseURL: accountApiBaseURL,
  requiresAuth: false,
});

// 實際上 login 的型別就會是：
// (property) login: (reqOptions: {
//     reqBody: FullLoginReqBody;
// }) => Promise<ServiceResultFormat<LoginData>>
```

## BASIC: 將 `@services/apis/*.ts` 打包至 `@services/index.ts`

這樣就可以統一從 `@services` import

```ts
export {
  authApi,
  LOGIN_BACKEND_MSG_KEYS,
  SEND_RESET_PWD_BACKEND_MSG_KEYS,
} from "@services/apis/auth";

export type {
  BasicLoginData,
  FullLoginData,
  BasicSendResetPwdData,
  FullSendResetPwdData,
  LoginPayload,
  GetUserPayload,
  LoginBackendMsgKey,
  SendResetPasswordEmailMsgKey,
} from "@services/apis/auth";
```

## BASIC: `public/locales/**/api.json` 加入 API msg key

```json
{
  "login": {
    "noProductPurchased": "此產品未獲授權，請洽銷售窗口",
    "passwordError": "密碼錯誤 {{passwordErrorCounts}} 次，連續錯誤 5 次系統將鎖定",
    "passwordErrorExceed": "帳號已鎖定，請點擊「$t(auth:loginPage.buttons.forgotPassword)」進行重設",
    "ipNotAllow": "無法登入，您的登入IP不符合"
  },
  "others": {
    "unexpectedError": "發生未預期錯誤，請聯繫管理者"
  }
}
```
