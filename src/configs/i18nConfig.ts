import { isLocal, isLocalOrDevelopment } from "@configs/envConfig";
import type { ValueOf } from "@customTypes";

export const isI18nDebugMode = isLocal;

export const LANGUAGE_CODES = {
  EN: "en",
  ZH_TW: "zh-TW",
} as const;

export type SupportedLanguage = ValueOf<typeof LANGUAGE_CODES>;

export const NAMESPACE_KEYS = {
  COMMON: "common",
  AUTH: "auth",
  API: "api",
} as const;

export const defaultNamespace = NAMESPACE_KEYS.COMMON;

// i18next 參數
export const supportedLanguageList: SupportedLanguage[] = isLocalOrDevelopment
  ? [LANGUAGE_CODES.ZH_TW, LANGUAGE_CODES.EN]
  : [LANGUAGE_CODES.ZH_TW];

// i18next 參數
export const supportedNamespaces = [...Object.values(NAMESPACE_KEYS)];
