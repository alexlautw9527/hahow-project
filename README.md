## 主要套件

- `Vite`: Dev Server 與打包編譯
- `TypeScript`
- `Tailwind CSS`
- `Ant Design`: 主要 UI 元件庫
- `TanStack Router`: Router 設置
- `TanStack Query` (`React Query`): Server State Management
- `Redux Toolkit`: Client Global Management
- `React Hook Form`: 表單驗證
- `Zod`: TypeScript-based 驗證
- `Mock Service Worker`: API Mock
- `Axios`: API fetch
- `Vitest`: 測試框架
- `Testing-Library`: 元件測試
- `ESLint`: airbnb 設置
- `Storybook`: 元件庫文檔與互動，研擬以此作為整合測試與元件測試
- `React-i18next`: i18n 國際化

## Node 版本建議

> 20.11.1 (LTS)

Vite 要求 18+, 20+

### 自動切換 Node 版本

本專案資料夾已設立 `.nvmrc`，如果有安裝 nvm，可在 ~/.zshrc 添加以下腳本，終端機切換此資料夾，就會自動切換版本

記得添加在 ~/.zshrc 中，**nvm 初始化之後**， 並 `source ~/.zshrc` 啟動

```zsh
# place this after nvm initialization!
autoload -U add-zsh-hook

load-nvmrc() {
  local nvmrc_path
  nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version
    nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  elif [ -n "$(PWD=$OLDPWD nvm_find_nvmrc)" ] && [ "$(nvm version)" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

[以上腳本源自 nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#zsh)

## 指令與 env 環境變數

- `npm run dev`: 開啟 dev 模式，`--mode localhost`，啟用 `.env.localhost` (port: 5173)
- `npm run dev:mock`: 開啟 dev msw mock 模式 ，`--mode mock`，啟用 `.env.mock` (port: 5173)
- `build` 系列: 編譯專案，並自動刪除編譯出來的 `mockServiceWorker.js`
  - `build:develop`: `--mode develop`，啟用 `.env.develop`
  - `build:staging`: `--mode staging`，啟用 `.env.staging`
  - `build:production`: `--mode production`，啟用 `.env.production`
- `npm run storybook`: 開啟 storybook 本地 dev (port: 6006)
- `npm run build-storybook`: 編譯 storybook 至靜態檔

詳情參閱 https://vitejs.dev/guide/env-and-mode

## Path Alias 設置

在 `tsconfig.paths.json` 設置後 ESLint、Vite、Vitest 都會同步設置，可使用 path alias

## Pre-commit Hook

本專案使用 husky, lint-staged, commitlint 來達到品質一致性，在 `npm install` 後會自動設立好，會在 git commit 後觸發，不符合規範會擋住

> 如果這個 commit 只是想單純的 stash 怎麼辦？ 請使用 `git commit --no-verify` 繞過

- lint-staged: 將本次 git stage 的檔案進行 lint 和 auto-fix
- commitlint: commit message 符合[下列規範](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 相關設置
  - `lint-staged.config.js`: 設定哪些副檔名要執行 lint ([ts check 的 tsconfig 設置](https://github.com/lint-staged/lint-staged/issues/825#issuecomment-620018284))
  - `commitlint.config.js`: commitlint 配置設定
  - `.husky/pre-commit` 等: 執行 git 動作的觸發腳本

## Router

開啟 Vite 的開發模式後，會自動偵測 `routes/` 底下的變動、檔名、資料夾結構，編譯生成 `routeTree.gen.ts`，並且在檔案存檔時自動生成 Route 內容，於下面詳細解說

> 所以，除非需要新增路徑或 layout，請留意不要在此處隨意新增檔案

### Flat Route：利用檔名創造 Nested Route

step1: 在 `routes/` 底下創建一個 `/routes/artist.$artistId.song.$songId.tsx` (舉例)

step2: 打開 `artist.$artistId.song.$songId.tsx`，按下儲存

以下程式碼就會自行生成

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/artist/$artistId/song/$songId")({
  component: () => <div>Hello /artist/$artistId/song/$songId!</div>,
});
```

### Directory Route：利用資料夾結構創造 Nested Route

step1: 在以下路徑與檔名新增一個空的 tsx 檔案 `/routes/books/$bookId/chapter/$chapterId.tsx` (舉例)

step2: 打開`$chapterId.tsx`，按下儲存

以下程式碼就會自行生成

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/$bookId/chapter/$chapterId")({
  component: () => <div>Hello /books/$bookId/chapter/$chapterId!</div>,
});
```

### 混和使用

可以視情況混和使用「Directory Route」和「Flat Route」

[官方說明](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees#mixed-flat-and-directory-routes)

### Route Context

> 目前先留下研究後記錄，專案內並無使用 Route Context

TanStack Router 可注入 context

這些 context 在各個 route 的生命週期都可以取用，目前已知

- `createFileRoute`的 `beforeLoad`、`loader`
- Route底下的元件調用 `Route.useRouteContext`

皆可取得 context

context 會有三處地方需要設置

- `@routes/__root.ts`: `createRootRouteWithContext` 泛型加入 context 型別
- `src/router.ts`: `createRouter` 設定 context 初始值
- `src/main.tsx`: `RouterProvider` 實際傳入 context 值

若有需要，可再 route 內使用 `router.invalidate()` 來重新偵測 context 變化並重新運行 `beforeLoad`、`loader`

[參考來源](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
[Invalidating TanStack Router after a mutation](https://tanstack.com/router/latest/docs/framework/react/guide/data-mutations#invalidating-tanstack-router-after-a-mutation)

## Component 資料夾結構

- `@components`
  - 共用性高、跨頁面使用
    - `@components/units`
    - `@components/widgets`
    - `@components/containers`
  - 隸屬不同功能模組底下的特定元件，例如
    - `@components/pages/auth`
    - `@components/pages/auth/widgets`: auth 模組底下的 widget
    - `@components/pages/auth/containers`: auth 模組底下的 containers

## State Management 原則

- **預設使用 React Query 進行管理**，大部分情境都是 API 取得資料並且單純渲染
  - 其他地方可以從 query key 取得 fetch 過的資料（cache）
- 使用 Redux Toolkit 進行管理的時機
  - 全域性資料：例如 登入狀態 (目前包裝為 `useAuth` )
  - 複雜的資料互動功能：例如表格動態編輯（拖曳、編輯等），則用 React Query 拉取資料，並同步至 RTK
    - `useQuery`：沒有 `onSuccess`，需從 useEffect 監聽，dispatch 到 RTK
    - `useMutation`：有 `onSuccess`，可以在裡面 dispatch

## API 架構 & Mock

使用 axios，並且使用 msw 作為 mock API

- `@services/apiPath` 定義 service 路徑、HTTP method、是否需要驗證
  - `@service/apis`、`@mocks/`的 handler設置，皆會從這裡取用，以達到統一
- `@services/apiFactory`：定義 `createService` 來生成 service -`@service/apis`：生成實際的抽象化 API service
  - `createService` 時會藉由泛型參數傳入，規範調用service 所需要 request 參數（例如 path params、request body 等）

### 攔截器

詳情請參閱 `@services/interceptors` 註解

## 專案重要狀態管理

- `useAuth` 基底使用 redux，儲存登入狀態、login api fetch 狀態、登出登入 handler

## Storybook

storybook 相關文件說明，請參閱 `@stories/Configure.mdx`

## TypeScript Style Guide

請參見 [TypeScript Style Guide](./docs/typescript-style-guide.md)

## i18n Style Guide

請參見 [i18n Style Guide](./docs/i18n-style-guide.md)

## 元件測試 Style Guide

為了保持一致性，元件測試會使用 i18next 的 "cimode" 來顯示單純 i18n key，故抓取元件請直接使用 i18n key，**並皆需帶上 namespace**

例如：`getByLabelText("auth:loginForm.labels.email")`

## 其他注意事項

- 本專案使用共用工具庫 cross-storage 進行跨域 localStorage 處理，並使用 git submodule 載入，在 `package.json` 中是以本地檔案路徑進行安裝
  - 路徑請參考 `.gitmodules`
- `package.json` 中的 `preinstall` 會在 npm install 開始前運行，用以更新 git submodule
- Vite 在 `npm run dev` 模式預設的環境參數如下
  - MODE: `development`
  - 預設載入的環境變數: `.env.development`
  - 注意：本專案中， `.env.develop` 使用於測試機環境 build（為了和 `docker-compose.develop.yml` 的命名慣例一致），`.env.localhost` 使用於 `npm run dev`
