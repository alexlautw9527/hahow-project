// TODO: 要重新整理

# i18n 翻譯檔 style guide

## 主要原則

- `public/locales`

  - `/en`
    - `common.json`
    - `auth.json`
    - `otherNameSpace1.json`
    - `otherNameSpace2.json`
  - `/zh-TW/`
    - `common.json`
    - `auth.json`
    - `otherNameSpace1.json`
    - `otherNameSpace2.json`

- 使用 camelCase 小駝峰
- 以 json 檔名劃分 i18next 的 namespace
- `common` 置放普遍性的單字翻譯檔，其他 namespace 以模組功能劃分，例如 `auth`

## 翻譯檔內 object 結構與命名原則

以下列檔案結構作為範例

- `@component/pages/auth/widget/LoginForm/`
  - `LoginForm.tsx`
  - `LoginForm.schema.ts`
- `@pages/auth/`
  - `LoginPage.tsx`

轉換原則

- 元件思考先行
- 將元件檔名轉化為 camelCase，作為第一層 key，例如 `LoginForm.tsx` -> `loginForm`
- 如果有附屬相關檔案需要用到翻譯檔，例如 `LoginForm.schema.ts`，則巢狀為 `loginForm.schema`

可參考以下

`

```json
{
  "loginForm": {
    "schema": {
      "invalidEmailFormat": "請輸入正確有效的 E-mail 格式"
    },
    "labels": {
      "email": "電子郵件信箱",
      "password": "密碼"
    },
    "placeholders": {
      "email": "example@email.com",
      "password": "輸入您的登入密碼"
    },
    "buttons": {
      "submitLogin": "登入",
      "loadingLogin": "登入中..."
    }
  },
  "loginPage": {
    "buttons": {
      "forgotPassword": "忘記密碼？"
    }
  }
}
```

> 有關元件的文字，命名可遵循 antd

key 值的制定應該「具體」、「具語義」、「可一眼看清上下文」，例如：

`t("loginForm.labels.email")` 即可看出是在 `LoginForm` 元件的 email label

## 如何新增一個 namespace

- `public/locales` 各個語言底下新增 json 檔，**檔名即為 namespace**
  - 例如 `public/locales/en/auth.json`，namespace 即為 `auth`
- 在 `src/i18.ts`之中的 `enum I18nNamespaces` 新增該 namespace
- `@types/i18n.d.ts` import 該 namespace 的 json （zh-TW 底下的即可），以取得翻譯檔架構作為型別，並將該 json 塞入 `resources`，如 `[I18nNamespaces.AUTH]: typeof auth;`

## 如何讀取特定 namespace

[參考來源](https://react.i18next.com/latest/usetranslation-hook#loading-namespaces)

```js
// load a specific namespace
// the t function will be set to that namespace as default
const { t, i18n } = useTranslation("ns1");
t("key"); // will be looked up from namespace ns1

// load multiple namespaces
// the t function will be set to first namespace as default
const { t, i18n } = useTranslation(["ns1", "ns2", "ns3"]);
t("key"); // will be looked up from namespace ns1
t("key", { ns: "ns2" }); // will be looked up from namespace ns2
```

```js
// having JSON in namespace "translation" like this:
/*{
    "very": {
      "deeply": {
        "nested": {
          "key": "here"
        }
      }
    }
}*/
// you can define a keyPrefix to be used for the resulting t function
const { t } = useTranslation("translation", {
  keyPrefix: "very.deeply.nested",
});
const text = t("key"); // "here"
```

這種用法可以避免每次調用 `t` 都要使用很長的 key，特別適用元件內的情況，例如

```js
// LoginForm.tsx
const { t } = useTranslation(I18nNamespaces.AUTH, { keyPrefix: "loginForm" });
```

另外要注意，如果 key 有加上 namespace 前綴，就不要使用 `keyPrefix` 這用法了

```js
// Do not use the keyPrefix option if you want to use keys with prefixed namespace notation:
const { t } = useTranslation("translation", {
  keyPrefix: "very.deeply.nested",
});
const text = t("ns:key"); // this will not work
```

## 使用原則

### Good：非 API 的 i18n key，使用上應帶完整的 key 值

```ts
// 代表鎖定 namespace = auth 模組
const { t } = useTranslation("auth");
t("loginForm.labels.email");
```

### Not Good：非 API 的 i18n key，加入 keyPrefix 前綴

```ts
const { t } = useTranslation("auth", keyPrefix: "loginForm");
t("labels.email")
```

### Why

加入前綴雖然很方便，但是搜尋查找的時候容易發生重複，帶上完整 key，unique 性質比較完備，搜尋取代時比較精準

由於後端來的 i18n key，所有權是在後端，則由前端配合彈性使用 keyPrefix
