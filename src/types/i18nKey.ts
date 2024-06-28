import { ParseKeys } from "i18next";
import type { Namespace, DefaultNamespace } from "i18next";

/**
 * 從 typeScript 運算合法的 i18n key 值範圍
 * Note: 這個 type 是先暫時記錄用, 以便不時之需
 * reference: https://github.com/i18next/react-i18next/issues/1530
 */
export type I18nKey<TNamespace extends Namespace = Namespace> = ParseKeys<
  TNamespace,
  {},
  DefaultNamespace
>;
