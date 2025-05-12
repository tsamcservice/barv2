# LINE Flex Message 即時編輯器 (barv2)

## 專案概述
這是一個 LINE Flex Message 即時編輯器，支援卡片編輯、即時預覽、圖片上傳、OG 頁、會員專屬網址等功能。

## 技術選型
- **前端框架**: Next.js
- **Flex Message 預覽**: [PamornT/flex2html](https://github.com/PamornT/flex2html)
- **資料庫**: Supabase (PostgreSQL)
- **部署平台**: 
  - GitHub Pages (main 分支)
  - Vercel (手動部署)

## 系統架構
詳細系統架構請參考 [系統架構文件](docs/system-architecture.md)

## 帳號資訊
### GitHub
- 帳號: tsamcservice@gmail.com
- 使用者名稱: tsamcservice
- 專案名稱: barv2
- 專案網址: https://github.com/tsamcservice/barv2

### Vercel
- 帳號: tsamcservice@gmail.com
- 使用者名稱: tsamcservice
- Vercel ID: Bl4rZWibBD66RsmaaBtGN6js
- Project ID: prj_Oi63xzfzmf6TeJC4zU0AcE6N3ij5
- 部署網域: https://barv2-aubnk01tn-tsamcservices-projects.vercel.app
- 測試頁面: https://barv2-aubnk01tn-tsamcservices-projects.vercel.app/test

## 檔案系統
```
/uploads/
├── public/           # 公開圖片
│   ├── templates/    # 範本圖片
│   └── shared/       # 共享圖片
├── vip/             # VIP 會員專用
│   └── {user_id}/   # 各會員專屬目錄
└── private/         # 私人圖片
    └── {user_id}/   # 各會員私人目錄
```

## 開發與部署流程
1. 所有開發都在 main 分支進行
2. 每次更新都會自動同步到 main 分支
3. 部署流程：
   - GitHub: 自動同步到 main 分支
   - Vercel: 手動部署

## 引用來源
- [PamornT/flex2html](https://github.com/PamornT/flex2html) - Flex Message 預覽技術
- [均民部落格教學](https://www.junmin.tw/) - Flex Message 設計參考

## 環境變數設定
請參考 [系統架構文件](docs/system-architecture.md) 中的環境變數設定章節。

## 安全性考量
請參考 [系統架構文件](docs/system-architecture.md) 中的安全性考量章節。

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
SUPABASE_URL=https://ijuazjipzgsxtkfmundr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdWF6amlwemdzeHRrZm11bmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODUzMjUsImV4cCI6MjA2MjM2MTMyNX0.FrSppTXpYhx9Co-eBbl1zEHQYiOS4kEocNQHgTmxXr8
LIFF_ID=2007327814-BdWpj70m
```

#### 設定說明
1. 登入 Vercel，進入專案 Settings → Environment Variables。
2. 新增 `SUPABASE_URL` 與 `SUPABASE_ANON_KEY`，值如上。
3. 設定完成後請重新部署專案。
4. 若本地開發，請於 `.env.local` 也加入上述變數。

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

## Flex2HTML 預覽技術

### 正確引用方式
- CSS：
  `<link rel="stylesheet" href="/js/flex2html.css">`
- JS：
  `<script src="/js/flex2html.min.js"></script>`
- HTML：
  `<div id="flex2html"></div>`
- JS 呼叫：
  `flex2html('flex2html', flexJson);`
- Flex Message JSON 結構：
  ```json
  {
    "type": "flex",
    "altText": "Flex Message",
    "contents": { ...bubble or carousel... }
  }
  ```

### 來源與教學
- [PamornT/flex2html GitHub](https://github.com/PamornT/flex2html)
- [均民部落格教學](https://taichunmin.idv.tw/blog/2021-04-09-line-flex2html.html)

### 常見錯誤與解法
- **未顯示卡片**：Flex JSON 結構需有 `type: flex`、`altText`、`contents`。
- **JS/CSS 未載入**：請確認 public/js/ 目錄下有正確檔案，且 HTML 正確引用。
- **CDN 失效**：建議下載 JS/CSS 至本地，避免外部連結失效。

### 測試頁面部署與驗證
- 測試頁面：`/public/test.html`
- Vercel 部署網址：`https://barv2-xxxxxx-tsamcservices-projects.vercel.app/test.html`
- 驗證流程：每次修改後自動部署，並於 Vercel 頁面驗證預覽效果。 

## 會員卡片與宣傳卡片資料結構

### 會員卡片（member_cards）
- id (UUID, PK)
- user_id (UUID, FK)
- card_title
- main_image_url
- main_image_link
- snow_image_url
- calendar_image_url
- amember_id
- pageview (int, default 0)
- main_title_1
- main_title_1_color
- main_title_2
- main_title_2_color
- member_image_url
- member_image_link
- display_name
- name_color1
- name_color2
- button_1_text
- button_1_url
- button_1_color
- s_button_text
- s_button_url
- s_button_color
- created_at
- updated_at

#### 規則
- 每個會員可有多組卡片（每個網頁一組）
- 每組卡片可累計瀏覽次數

### 宣傳卡片（promo_cards）
- id (UUID, PK)
- user_id (UUID, FK)
- card_id (UUID, FK)  // 所屬會員卡片
- json_content (JSONB)
- sort_order (int)
- created_at
- updated_at

#### 規則
- 每組會員卡片可不選、可多選宣傳卡片
- 宣傳卡片可調整左右順序

### 會員資料表（users）
- id (UUID, PK)
- line_user_id
- email
- display_name
- avatar_url
- created_at
- updated_at

### 頁面互動邏輯
- 會員登入（LINE LIFF）後可管理多組卡片
- 每組卡片可即時編修、預覽、儲存
- 宣傳卡片可多選、排序，並與主卡片一起預覽
- 每組卡片有獨立瀏覽次數累計 

## 會員卡片自動查詢/自動建立邏輯
1. 使用者經由 LINE LIFF 登入（且已加好友）。
2. 前端取得 LINE userId，呼叫 `/api/cards/list?userId=xxx` 查詢會員卡片。
3. 若查無資料：自動建立一筆「初始會員卡片」與預設宣傳卡片，並帶入表單。
4. 若有資料：自動帶入該會員已存檔的卡片內容。
5. 使用者可直接編修、即時預覽、儲存。

## 初始卡片資料抽離設計
- 所有卡片型態的初始資料皆集中於 JS 變數 `defaultCards`，未來可輕鬆擴充多種卡片型態。
- 例如：
```js
const defaultCards = {
  member: { ... },
  event: { ... },
  ...
};
```
- 新增卡片型態時只需擴充 `defaultCards` 物件。

## API 路徑與錯誤處理設計
- 所有 API 路徑皆以 `/api/` 開頭，Vercel 路由設定已優先導向 API，避免被靜態頁面覆蓋。
- 前端 fetch API 時會檢查回應的 content-type，若非 JSON 或 HTTP 狀態非 200，會顯示友善錯誤訊息。
- 例外狀況（如 API 連線失敗、資料庫連線失敗）會彈窗提示，方便 debug。 