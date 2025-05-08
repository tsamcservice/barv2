# LINE Flex Message 即時編輯器 (barv2)

這是一個獨立的 LINE Flex Message 即時編輯器專案，提供卡片編輯、預覽和管理功能。

## 專案結構

- `frontend/` - 前端應用
  - `index.html` - 編輯器主頁面
  - `preview/` - 預覽頁面
  - `admin/` - 後台管理頁面
  - `css/` - 樣式檔案
  - `js/` - JavaScript 檔案
- `backend/` - 後端 API
  - `api/` - API 路由
    - `cards/` - 卡片相關 API
    - `admin/` - 後台管理 API

## 功能特點

1. 即時編輯
   - 支援多種元件（box、text、image、button）
   - 即時預覽
   - 自動儲存

2. 預覽功能
   - 即時預覽
   - 分享到 LINE
   - 複製分享連結

3. 後台管理
   - 使用者管理
   - 卡片管理
   - 搜尋功能

## 部署資訊

### 1. Vercel 部署
- 主網域: https://barv2-xxxx.vercel.app
- 部署路徑:
  - 編輯器: /
  - 預覽頁面: /preview
  - 後台管理: /admin

### 2. 環境變數設定
```
SUPABASE_URL=您的 Supabase URL
SUPABASE_KEY=您的 Supabase Key
LIFF_ID=2007327814-BdWpj70m
```

### 3. LINE 設定
- LIFF ID: 2007327814-BdWpj70m
- LIFF URL: https://liff.line.me/2007327814-BdWpj70m
- 端點 URL: 您的 Vercel 部署網址

## API 端點

### 卡片 API
```
POST /api/cards/save - 儲存卡片
GET /api/cards/list - 取得卡片列表
DELETE /api/cards/delete - 刪除卡片
```

### 後台 API
```
GET /api/admin/users/search - 搜尋使用者
GET /api/admin/cards/search - 搜尋卡片
DELETE /api/admin/cards/delete - 刪除卡片
```

## 管理員資訊
- 帳號: admin
- 密碼: admin55688

## 部署步驟

1. 在 Vercel 上建立新專案：
   - 連接到您的 GitHub 倉庫
   - 選擇專案根目錄
   - 設定環境變數

2. 在 LINE Developers Console 設定 LIFF：
   - 新增 LIFF 應用
   - 設定 Endpoint URL
   - 設定必要的 Scope

3. 部署後測試：
   - 測試編輯器功能
   - 確認預覽功能
   - 測試後台管理

## 常見問題與解法
- LIFF 無法登入：確認 Vercel 網域設定
- API 錯誤：檢查環境變數
- 資料庫連線問題：確認 Supabase 設定 

## 會員卡片圖片與 OG 頁設計

- 會員上傳圖片會存放於 `/uploads/{line_user_id}/`，VIP 初始圖片存於 `/uploads/vip/`
- 每位會員的卡片有獨立網址（如 `/og/{line_user_id}`），網址可用 LINE USER ID 編碼
- OG 頁會自動產生 og:title、og:image、og:description 等 meta，支援 LINE/FB 等社群預覽
- 每次訪問 OG 頁會自動統計瀏覽次數
- 前端圖片上傳支援即時預覽，並自動產生對外連結 

## Flex2html 預覽技術說明

本專案使用 [PamornT/flex2html](https://github.com/PamornT/flex2html) 作為 LINE Flex Message 的即時預覽渲染器。

### 引用方式
- 於 `frontend/index.html` 及 `flex2html-test/preview.html` 皆以 CDN 方式引用：
  - CSS: `https://cdn.jsdelivr.net/gh/PamornT/flex2html@main/css/flex2html.css`
  - JS:  `https://cdn.jsdelivr.net/gh/PamornT/flex2html@main/js/flex2html.min.js`

### 即時預覽
- 主頁 (`frontend/index.html`) 於 Flex Message 欄位變更時，會即時呼叫 `flex2html('flex2html', currentCard)` 進行渲染。
- 若 flex2html 尚未載入，會自動重試。

### 另開視窗預覽
- 點擊「另開視窗預覽」按鈕時，會將目前卡片 JSON 存入 localStorage（key: `flex2html-preview`），並開啟 `flex2html-test/preview.html`。
- `preview.html` 會自動從 localStorage 讀取 JSON 並渲染。

### flex2html-test/preview.html 用途
- 提供與主頁分離的 Flex Message 預覽視窗，方便多視窗同步預覽。
- 若 localStorage 無資料，會顯示錯誤提示。

### 注意事項
- flex2html 為泰國 LINE 官方工程師開發的半官方專案，渲染效果與 LINE App 可能略有差異，僅供設計參考。
- 若需最終效果驗證，建議於 LINE 官方工具或 App 內測試。

### 相關參考與引用
- [PamornT/flex2html 官方 GitHub 專案](https://github.com/PamornT/flex2html)
- [中文教學：在網頁上使用開源專案預覽 LINE Flex 訊息（均民部落格）](https://taichunmin.idv.tw/blog/2021-04-09-line-flex2html.html) 

## 帳號與部署資訊

### GitHub
- 帳號 Email：tsamcservice@gmail.com
- 使用者名稱：tsamcservice
- 專案名稱：barv2

### Vercel
- 帳號 Email：tsamcservice@gmail.com
- 使用者名稱：tsamcservice
- Vercel ID：Bl4rZWibBD66RsmaaBtGN6js 