## 主要套件

- `Vite`: Dev Server 與打包編譯
- `TypeScript`
- `Emotion`： CSS-in-JS
- `Chakra-UI`: 主要 UI 元件庫
- `TanStack Router`: Router 設置
- `TanStack Query` (`React Query`): Server State Management
- `Redux Toolkit`: Client Global Management
- `Axios`: API fetch
- `Vitest`: 測試框架
- `Testing-Library`: 元件測試
- `ESLint`: airbnb 設置
- `Storybook`: 元件庫文檔與互動
- `React-i18next`: i18n 國際化

## 運行指令

- `npm run dev`: 開啟 dev 模式
- `npm run storybook`: 開啟 storybook 本地 dev (port: 6006)
- `npm run test`：開啟測試
- `npm run build-storybook`: 編譯 storybook 至靜態檔

## 專案結構

```
.
├── .storybook
│   ├── main.ts -- 負責 storybook 整體配置
│   └── preview.tsx -- 負責 storybook default 渲染
└── src
    ├── app
    │   ├── i18n -- 處理 i18n 相關配置
    │   ├── routes -- TanStack Router 實際配置 (file-based)
    │   ├── app.tsx
    │   ├── app-providers.tsx
    │   ├── index.css
    │   └── routeTree.gen.ts -- TanStack Router 生成檔案
    ├── components -- 通用性元件
    ├── features -- 以模組功能劃分, 主要使用 colocation 的概念
    │   └── heros
    │       ├── apis -- 模組相關 api service 和 tanstack query
    │       ├── components -- 模組相關元件
    │       └── constants
    ├── lib -- 放置通用性的自製函式庫
    │   └── api
    │       ├── interceptors
    │       ├── api-service-factory.ts
    │       └── setup-axios.ts
    ├── configs
    ├── tests
    ├── types
    ├── utils
    └── main.tsx
```

## Node 版本建議

> 20.11.1 (LTS)

Vite 要求 18+, 20+

### 自動切換 Node 版本

本專案資料夾已設立 `.nvmrc`，如果有安裝 nvm，可在 ~/.zshrc 添加以下腳本，終端機切換此資料夾，就會自動切換版本

[將此腳本](https://github.com/nvm-sh/nvm?tab=readme-ov-file#zsh)添加在 `~/.zshrc` 中，**nvm 初始化之後**， 並 `source ~/.zshrc` 啟動

## 絕對路徑 Path Alias 設置

在 `tsconfig.paths.json` 設置後，ESLint、Vite、Vitest 都會同步設置，可使用 path alias

本專案使用如下方式

```json
"paths": {
	"@/*": ["./*"]
}
```

就可以使用 `@/components`、`@/features` 以絕對路徑方便取用資料夾

## TanStack Router 設置

開啟 Vite 的開發模式後，會自動偵測 `@/app/routes/` 底下的變動、檔名、資料夾結構，編譯生成 `routeTree.gen.ts`，並且在檔案存檔時自動生成 Route 內容，於下面詳細解說

> 所以，除非需要新增路徑或 layout，請留意不要在此處隨意新增檔案

### Flat Route：利用檔名創造 Nested Route

step1: 在 `routes/` 底下創建一個 `@/app/routes/artist.$artistId.song.$songId.tsx` (舉例)

step2: 打開 `artist.$artistId.song.$songId.tsx`，按下儲存

以下程式碼就會自行生成

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/artist/$artistId/song/$songId')({
  component: () => <div>Hello /artist/$artistId/song/$songId!</div>,
});
```

### Directory Route：利用資料夾結構創造 Nested Route

step1: 在以下路徑與檔名新增一個空的 tsx 檔案 `/routes/books/$bookId/chapter/$chapterId.tsx` (舉例)

step2: 打開`$chapterId.tsx`，按下儲存

以下程式碼就會自行生成

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/books/$bookId/chapter/$chapterId')({
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

## State Management 原則

- **預設使用 React Query 進行管理**，大部分情境都是 API 取得資料並且單純渲染
  - 可以藉由相同 query key 取得 fetch 過的資料（cache）
- 使用 Redux Toolkit 進行管理的時機
  - 全域性資料，或是橫跨多個元件的狀態
  - 複雜的資料互動功能：例如表格動態編輯（拖曳、編輯等），則用 React Query 拉取資料，並同步至 RTK
- `useMutation` 和 `useQuery` 的差異
  - `useMutation`：有 `onSuccess`，可以在裡面 dispatch
  - `useQuery`：沒有 `onSuccess`，需從 useEffect 監聽，dispatch 到 RTK

## 專案其他配置

### i18n

本專案使用 `react-i18next` 配置 i18n 設定，可於畫面左下角的語言選擇框進行切換

主要以模組來切分 namespace（也就是 `public/locales` 裡面各個 JSON 檔名），在 i18n JSON 檔中會使用元件作為劃分來切分 key 值，方便進行維護

### API Service Lib

詳見 `@/src/lib/api/api-service-factory.ts` 註解

### Storybook

#### Why Storybook

- **強迫促進「元件化思考」**，更去思考如何打造乾淨可重用的元件，進行關注點分例
- 友善介面，一目了然看到已有元件
  - 設計、前端、PM 方便溝通，也可以連動 Figma 一起對照
  - 避免重工
  - 思考到目前產品的元件規模都非常龐大，若有 storybook 或許能快速得知元件規格，方便除錯與開發
- 高度互動化文檔
- 開發元件時，可使用 Storybook 作為獨立的開發環境，方便調試

#### i18n in StoryBook

在元件的上方點擊地球 icon，可方便切換語系，也可以關閉，只顯示 i18n key

> 要注意的是，如果那個 Story 的 parameters中，`isTestingMode: true`，切換語系會無作用，以維持測試抓取元件的一致性

### Pre-commit Hook

本專案使用 husky、lint-staged、commitlint 來達到品質一致性，在 `npm install` 後會自動設立好，會在 git commit 後觸發，不符合規範會擋住

> 如果這個 commit 只是想單純的 stash 怎麼辦？ 請使用 `git commit --no-verify` 繞過

- `lint-staged`: 將本次 git stage 的檔案進行 lint 和 auto-fix
- `commitlint`: commit message 需符合[下列規範](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 相關設置
  - `lint-staged.config.js`: 設定哪些副檔名要執行 lint ([ts check 的 tsconfig 設置](https://github.com/lint-staged/lint-staged/issues/825#issuecomment-620018284))
  - `commitlint.config.js`: commitlint 配置設定
  - `.husky/pre-commit` 等: 執行 git 動作的觸發腳本

## 元件測試 Style Guide

為了保持一致性，元件測試會使用 i18next 的 "cimode" 來顯示單純 i18n key，故抓取元件請直接使用 i18n key，**並皆需帶上 namespace**

例如：`.toHaveTextContent('hero:character-editor.text.remaining-points')`

## 在程式碼中寫註解的原則、遇到什麼狀況會寫註解

主要原則：程式碼的執行邏輯，應以盡量本身的可讀性、模組化來說明，而不是註解，若碰到複雜情況，邏輯的複雜度無法再降低，可適度以註解補充

會寫註解的情境：

- 對於 work-around 作法或是修補，附上在 github issue 或是 stackoverflow 的來源作為備查
  - 例如，為了排除套件之間相容性問題，查了到在 github issue 的解法，就在程式碼周圍附上參考連結
- 對於無法一眼看穿意圖的函數或程式碼，說明來龍去脈，往後看到可以回憶起脈絡
- 某些配置或是程式，會有隱性的行為，可能會造成 bug
- 從結構非顯而易見，但資料或狀態面可能有耦合關係的程式碼，可以互相補充說明
  - 例如 react query 與 redux slice

## 在這份專案中遇到的困難、問題，以及解決的方法

這次小專案在一禮拜時限之內，要完成以下事項，具有挑戰性

- 從 wireframe 構思出實際的可接受的介面，並且構思可以添加什麼酷炫的樣式
- 規劃資料夾專案配置
- 實際開發元件與 API 邏輯串接，並重新熟悉 CSS-in-JS
- 加入其他可以使專案更完整的配置，例如 i18n、Storybook、測試

其中構思出實際可接受的介面，並加入酷炫的樣式，可能一開始卡的比較久一些，因為目前工作經驗都在處理元件和邏輯功能居多

後來發現 API 回傳的資料是漫威英雄，就從相關風格去搜尋靈感，最終想到先前玩過 Marvel Snap，從中得到 3D Tilt Card 的點子，並從中尋找類似作法並實際開發

再來是 i18n、Storybook 和測試，彼此要兼容在一起也需要花許多功夫，需探討的議題有：

- i18n 怎麼在測試階段架設起來？測試要用什麼文字為基準來抓取元件？（後來是使用 cimode 來統一使用 bare key 來抓取）
- i18n 怎麼納入 Storybook？有沒有可能在 Storybook 裡面可以切換語言？

以上兼容性的問題在 Chat GPT 通常不會得到很好的解答，最可靠的還是靠著精準的關鍵字搜尋，在 stackoverflow 或是 github issue 尋找別人的作法，並且 try & error
