import { isLocal } from '@/configs/env';
import type { ValueOf } from '@/types';

export const isI18nDebugMode = isLocal;

export const LANGUAGE_CODES = {
  EN: 'en',
  ZH_TW: 'zh-TW',
} as const;

export type SupportedLanguage = ValueOf<typeof LANGUAGE_CODES>;

export const NAMESPACE_KEYS = {
  COMMON: 'common',
  HERO: 'hero',
} as const;

export const defaultNamespace = NAMESPACE_KEYS.COMMON;

// i18next 參數
export const supportedLanguageList: SupportedLanguage[] = [
  LANGUAGE_CODES.ZH_TW,
  LANGUAGE_CODES.EN,
];

// i18next 參數
export const supportedNamespaces = [...Object.values(NAMESPACE_KEYS)];
