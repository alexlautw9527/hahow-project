import {
  getLocalStorageItem,
  LOCAL_STORAGE_KEYS,
  setLocalStorageItem,
} from "@helpers";

import {
  LANGUAGE_CODES,
  supportedLanguageList,
  isI18nDebugMode,
  supportedNamespaces,
} from "@configs";

import type { SupportedLanguage } from "@configs";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return Object.values(LANGUAGE_CODES).includes(language as SupportedLanguage);
}

function initializeLanguageSetting() {
  // 嘗試從 localStorage 獲取語言設置
  // 如果 localStorage 中沒有語言設置，則根據瀏覽器偏好設置
  // navigator.language 如果碰到 zh 開頭的語言, 一律使用 zh-TW
  // 其餘語言使用前兩碼 (en-US -> en)
  const currentLang =
    getLocalStorageItem(LOCAL_STORAGE_KEYS.LANGUAGE) ||
    (navigator.language.startsWith("zh")
      ? "zh-TW"
      : navigator.language.split("-")[0]);

  // 檢查語言是否在支援列表中，如果不在則使用 'zh-TW'
  const finalLang = isSupportedLanguage(currentLang)
    ? currentLang
    : LANGUAGE_CODES.ZH_TW;

  // 將最終的語言設置保存到 localStorage
  setLocalStorageItem(LOCAL_STORAGE_KEYS.LANGUAGE, finalLang);

  return finalLang;
}

const defaultLanguage = initializeLanguageSetting();

/**
 * i18n 初始化
 * note: 將語言設為 "cimode" 可以只顯示 key
 * reference: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
 */
export function setupI18n(
  config: { isTestingMode: boolean } | undefined = undefined,
) {
  // true 為 storybook 使用
  const { isTestingMode } = config || { isTestingMode: false };

  i18n
    .use(initReactI18next)
    // .use(LanguageDetector)
    .use(Backend)
    .init({
      // 讓 locale 明確是 "zh-TW" 而不是 "zh"
      // https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      supportedLngs: supportedLanguageList,
      nonExplicitSupportedLngs: false,
      load: "currentOnly",
      ns: supportedNamespaces,
      debug: isI18nDebugMode,
      // cimode 可以只顯示 key
      lng: isTestingMode ? "cimode" : defaultLanguage,
      fallbackLng: isTestingMode ? "cimode" : defaultLanguage,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      react: {
        // 測試時不使用 Suspense 以避免在 getByText 時抓不到
        useSuspense: !isTestingMode,
      },
      appendNamespaceToCIMode: true,
    });
}

export default i18n;
