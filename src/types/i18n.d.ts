// import 所有 namespace 來編譯型別, 只取用 default 語言即可
import { NAMESPACE_KEYS } from '@/app/i18n/config';

import common from '../../public/locales/zh-TW/common.json';
import hero from '../../public/locales/zh-TW/hero.json';

/**
 * 根據 i18next 官網所設置的 .d.ts 檔案, 來擴充 i18next 的型別
 * reference: https://www.i18next.com/overview/typescript
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: defaultNS;
    resources: {
      [NAMESPACE_KEYS.HERO]: typeof hero;
      [NAMESPACE_KEYS.COMMON]: typeof common;
    };
  }
}
