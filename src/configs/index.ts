export {
  apiBaseUrl,
  accountApiBaseUrl,
  authPageBaseUrl,
} from "@configs/domainConfig";
export {
  isLocal,
  isDevelopment,
  isStaging,
  isProduction,
  isLocalOrDevelopment,
  isStagingOrProduction,
  isEnableMock,
} from "@configs/envConfig";
export {
  LANGUAGE_CODES,
  NAMESPACE_KEYS,
  defaultNamespace,
  supportedLanguageList,
  supportedNamespaces,
  isI18nDebugMode,
} from "@configs/i18nConfig";

export type { SupportedLanguage } from "@configs/i18nConfig";
