import type { ValueOf } from "@customTypes";

const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  LANGUAGE: "language",
} as const;

type LocalStorageKey = ValueOf<typeof LOCAL_STORAGE_KEYS>;

function setLocalStorageItem<T = string>(key: LocalStorageKey, value: T): void {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

function getLocalStorageItem<T = string>(key: LocalStorageKey): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item) as T;
}

function removeLocalStorageItem(key: LocalStorageKey): void {
  localStorage.removeItem(key);
}

export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  LOCAL_STORAGE_KEYS,
};

export type { LocalStorageKey };
