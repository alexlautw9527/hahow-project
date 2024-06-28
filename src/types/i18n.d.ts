// import 所有 namespace 來編譯型別, 只取用 default 語言即可
import { NAMESPACE_KEYS } from "@configs";

import auth from "../../public/locales/zh-TW/auth.json";
import common from "../../public/locales/zh-TW/common.json";
import api from "../../public/locales/zh-TW/api.json";

/**
 * 根據 i18next 官網所設置的 .d.ts 檔案, 來擴充 i18next 的型別
 * reference: https://www.i18next.com/overview/typescript
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: defaultNS;
    resources: {
      [NAMESPACE_KEYS.AUTH]: typeof auth;
      [NAMESPACE_KEYS.COMMON]: typeof common;
      [NAMESPACE_KEYS.API]: typeof api;
    };
  }
}
