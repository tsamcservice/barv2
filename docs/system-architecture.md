# 系統架構文件

## 1. 資料庫結構 (Supabase)

### 1.1 會員資料表 (users)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    display_name VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_vip BOOLEAN DEFAULT FALSE,
    vip_expiry_date TIMESTAMP WITH TIME ZONE
);
```

### 1.2 Flex Message 設計稿表 (flex_designs)
```sql
CREATE TABLE flex_designs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT FALSE
);
```

### 1.3 個人化欄位表 (custom_fields)
```sql
CREATE TABLE custom_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    field_name VARCHAR NOT NULL,
    field_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 1.4 圖片資源表 (images)
```sql
CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    file_name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    file_size INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT FALSE
);
```

## 2. 檔案系統結構

### 2.1 上傳目錄結構
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

### 2.2 目錄權限設定
- `/uploads/public/`: 所有用戶可讀
- `/uploads/vip/`: 僅 VIP 會員可讀
- `/uploads/vip/{user_id}/`: 僅該會員可讀寫
- `/uploads/private/{user_id}/`: 僅該會員可讀寫

## 3. 環境變數設定

### 3.1 Supabase 設定
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3.2 檔案上傳設定
```env
UPLOAD_DIR=/uploads
MAX_FILE_SIZE=5242880  # 5MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

## 4. API 端點設計

### 4.1 會員相關
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/profile

### 4.2 Flex Message 相關
- GET /api/flex-designs
- POST /api/flex-designs
- GET /api/flex-designs/:id
- PUT /api/flex-designs/:id
- DELETE /api/flex-designs/:id

### 4.3 檔案上傳相關
- POST /api/upload/public
- POST /api/upload/vip
- POST /api/upload/private
- GET /api/files/:type/:filename

## 5. 安全性考量

### 5.1 檔案上傳安全
- 檔案類型驗證
- 檔案大小限制
- 檔案名稱消毒
- 病毒掃描

### 5.2 資料庫安全
- 資料加密
- 定期備份
- 存取權限控制
- SQL 注入防護

### 5.3 API 安全
- JWT 認證
- Rate limiting
- CORS 設定
- 輸入驗證 

## 6. Flex2HTML 預覽技術

### 6.1 正確引用方式
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

### 6.2 來源與教學
- [PamornT/flex2html GitHub](https://github.com/PamornT/flex2html)
- [均民部落格教學](https://taichunmin.idv.tw/blog/2021-04-09-line-flex2html.html)

### 6.3 常見錯誤與解法
- **未顯示卡片**：Flex JSON 結構需有 `type: flex`、`altText`、`contents`。
- **JS/CSS 未載入**：請確認 public/js/ 目錄下有正確檔案，且 HTML 正確引用。
- **CDN 失效**：建議下載 JS/CSS 至本地，避免外部連結失效。

### 6.4 測試頁面部署與驗證
- 測試頁面：`/public/test.html`
- Vercel 部署網址：`https://barv2-xxxxxx-tsamcservices-projects.vercel.app/test.html`
- 驗證流程：每次修改後自動部署，並於 Vercel 頁面驗證預覽效果。 