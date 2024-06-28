import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  LOCAL_STORAGE_KEYS,
  LocalStorageKey,
} from '@/utils/localStorage';

describe('setLocalStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('應能設置 localStorage', () => {
    const key: LocalStorageKey = LOCAL_STORAGE_KEYS.ACCESS_TOKEN;
    const value = 'myAccessToken';

    setLocalStorageItem(key, value);

    const result = localStorage.getItem(key);

    expect(result).toBe(JSON.stringify(value));
  });
});

describe('getLocalStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('應該從 localStorage 中獲取一個項目', () => {
    const key: LocalStorageKey = LOCAL_STORAGE_KEYS.ACCESS_TOKEN;
    const value = 'myAccessToken';
    localStorage.setItem(key, JSON.stringify(value));

    const result = getLocalStorageItem<string>(key);

    expect(result).toBe(value);
  });

  it('對於 localStorage 不存在的項目，應該返回 null', () => {
    const key: LocalStorageKey = LOCAL_STORAGE_KEYS.ACCESS_TOKEN;

    const result = getLocalStorageItem(key);

    expect(result).toBeNull();
  });
});

describe('removeLocalStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('應該從 localStorage 中刪除一個項目', () => {
    const key: LocalStorageKey = LOCAL_STORAGE_KEYS.ACCESS_TOKEN;
    const value = 'myAccessToken';
    localStorage.setItem(key, JSON.stringify(value));

    removeLocalStorageItem(key);

    const result = localStorage.getItem(key);

    expect(result).toBeNull();
  });
});
