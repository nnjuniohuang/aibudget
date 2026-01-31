# 🚀 快速開始指南

## 📋 本地開發

### 安裝依賴

```bash
npm install
```

### 啟動開發服務器

```bash
npm run dev
```

訪問 **http://localhost:3000** 或 **http://localhost:3001**（如果 3000 被佔用）

---

## 🔑 環境變數設置

確保 `.env.local` 存在並包含：

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxx...
```

⚠️ **不要將此檔案上傳到 GitHub！** 它已在 `.gitignore` 中。

---

## 📱 使用功能

### 1. 上傳/拍照識別發票
- 點擊「**選擇圖片**」或「**開啟相機（手機）**」
- AI 會自動辨識金額、店家、日期、類別
- 結果會自動保存到本地

### 2. 手動修正
- 表格中每筆記錄都有「**修正**」按鈕
- 修改後點擊「✅ 保存」

### 3. 手動新增
- 不想用 AI 識別？點擊「**手動新增記帳**」綠色按鈕
- 直接輸入店家、金額、日期、類別、說明
- 點擊「✅ 新增」

### 4. 查看統計
- 右側「📊 本月支出佔比」圖表自動更新
- 顏色對應不同類別

---

## 🛠️ 部署

詳見 [DEPLOYMENT.md](./DEPLOYMENT.md)

快速流程：

```bash
# 1. 初始化 Git
git init
git add .
git commit -m "初始提交"

# 2. 推送到 GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aibudget.git
git push -u origin main

# 3. 在 Vercel.com 連接 GitHub repository
# 4. 設置環境變數 ANTHROPIC_API_KEY
# 5. 部署！
```

---

## 📊 專案結構

```
aibudget/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主頁面
│   │   ├── layout.tsx        # 佈局
│   │   └── api/
│   │       └── vision/claude # Claude Vision API
│   ├── components/
│   │   └── ui/               # shadcn/ui 組件
│   └── lib/
│       ├── types.ts          # 類型定義 + 顏色映射
│       ├── storage.ts        # LocalStorage 操作
│       ├── category.ts       # 類別管理
│       ├── date.ts           # 日期工具
│       └── id.ts             # ID 生成
├── public/                    # 靜態資源
├── .env.local                 # 環境變數（本地）
├── package.json               # 依賴
├── tsconfig.json              # TypeScript 設置
├── tailwind.config.ts         # Tailwind 設置
├── DEPLOYMENT.md              # 部署指南
└── progress.md                # 開發進度
```

---

## 🎨 技術棧

| 工具 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.5 | 框架 |
| React | 19.2.3 | UI 庫 |
| TypeScript | 5.x | 語言 |
| Tailwind CSS | 4.x | 樣式 |
| shadcn/ui | latest | UI 組件 |
| Recharts | 3.7.0 | 圖表 |
| Claude API | 3.5 Sonnet | AI 識別 |

---

## 📝 常用指令

```bash
# 開發
npm run dev

# 建構
npm run build

# 生產環境啟動
npm start

# 檢查 ESLint
npm run lint

# 格式化代碼
npm run format
```

---

## 🐛 遇到問題？

1. **AI 辨識失敗**
   - 檢查 API Key 是否有效
   - 確認圖片清晰（金額、店名可見）
   - 使用「手動新增」功能作為備選

2. **頁面不加載**
   - 清除瀏覽器快取（Ctrl+Shift+Delete）
   - 檢查終端是否有編譯錯誤
   - 確保 Node.js 版本 18+ 

3. **數據丟失**
   - LocalStorage 只在本瀏覽器保存
   - 清除快取會刪除數據
   - 建議定期備份（部署後考慮用數據庫）

---

## 🎯 下一步

- [x] 核心功能完成
- [x] UI/UX 改善
- [x] 備註欄位
- [ ] 數據導出 (CSV/PDF)
- [ ] 月份篩選
- [ ] 預算設置
- [ ] 雲端同步

---

祝你使用愉快！有任何問題歡迎提出 💡
