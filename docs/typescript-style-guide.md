## 物件型別 type vs. interface

預設使用 type 來定義物件型別，除非：

- 需要使用 declare module + interface 來直接該套件的擴展該型別，例如

```ts
declare module "axios" {
  export interface AxiosRequestConfig {
    // 擴展 custom axios config, 「調用」 service 函數時使用, 用實際值來替換 url 中的 path params
    // 例如: /user/:id, path: { id: 123 } => /user/123
    path?: Record<string, any>;

    // 擴展 custom axios config, 「生成」 service 函數時使用, 用來標記這個 request 是否需要 token
    requiresAuth?: boolean;
  }
}
```

因為 interface 的性質（範例如下），如果要直接擴展全域變數型別如 `Window` 或是套件的型別，會很有幫助

```ts
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

// 這樣 Box 就定義 height、width、scale 三個 property
```
