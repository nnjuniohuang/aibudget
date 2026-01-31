# 🚀 部署指南 - GitHub 與 Vercel

## 📋 前置條件

1. **GitHub 帳號**（https://github.com）
2. **Vercel 帳號**（https://vercel.com）- 可用 GitHub 帳號直接登錄

---

## 第 1 步：初始化 Git Repository

### 1.1 在專案根目錄初始化 Git

```bash
cd "d:\IDE_DIR\WINDSURF\AIBUDGET"
git init
```

### 1.2 查看當前狀態

```bash
git status
```

你會看到所有未追蹤的檔案（紅色）。

---

## 第 2 步：建立 .gitignore 檔案

這個檔案用來忽略不需要上傳的檔案。建立 `.gitignore`：

```
node_modules/
.next/
out/
build/
dist/
*.log
.DS_Store
.env.local
.env.*.local
.vercel/
```

💡 **重要**：`.env.local` 不會被上傳（包含 API Key）

---

## 第 3 步：Commit 程式碼到本地 Git

### 3.1 添加所有檔案

```bash
git add .
```

### 3.2 建立第一個 Commit

```bash
git commit -m "初始提交：AI 智慧記帳應用

- 上傳/拍照識別發票功能
- Claude Vision API 集成
- 手動新增和修正功能
- 活潑的彩色 UI 設計
- 本地 LocalStorage 儲存
- 支出統計圓餅圖"
```

### 3.3 檢查 Commit 歷史

```bash
git log --oneline
```

你應該會看到你的 commit。

---

## 第 4 步：上傳到 GitHub

### 4.1 在 GitHub 建立新 Repository

1. 訪問 https://github.com/new
2. **Repository name**：輸入 `aibudget`
3. **Description**：AI 智慧記帳應用
4. 選擇 **Public** 或 **Private**（建議 Public 方便分享）
5. **DO NOT** 勾選「Initialize this repository with a README」
6. 點擊 **Create repository**

### 4.2 在本地連接 GitHub Repository

複製下面的命令（GitHub 會給你）：

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aibudget.git
git push -u origin main
```

**替換** `YOUR_USERNAME` 為你的 GitHub 帳號名稱。

### 4.3 驗證上傳成功

打開 https://github.com/YOUR_USERNAME/aibudget，應該看到你的程式碼了！

---

## 第 5 步：部署到 Vercel

### 5.1 連接 Vercel 與 GitHub

1. 訪問 https://vercel.com/new
2. 選擇 **Import Git Repository**
3. 授予 Vercel 存取 GitHub 的權限
4. 搜尋並選擇 `aibudget` repository

### 5.2 配置 Vercel 專案

**Project Name**：`aibudget`（或自定義）

**Framework**：會自動偵測為 Next.js ✅

**Root Directory**：`./`（保持預設）

### 5.3 設置環境變數 🔑

這是 **重要**！API Key 不能提交到 GitHub，需在 Vercel 中設置：

1. 點擊 **Environment Variables**
2. 新增變數：
   - **Name**：`ANTHROPIC_API_KEY`
   - **Value**：貼上你的 Claude API Key（來自 `.env.local`）
   - **Environments**：選擇 Production

3. 點擊 **Add**

### 5.4 部署

點擊 **Deploy** 按鈕，等待約 1-2 分鐘。

---

## 🎉 部署完成！

部署成功後，你會看到：

```
✓ Deployment complete
  Production: https://aibudget-yourname.vercel.app
```

打開這個 URL，就能在線訪問你的應用！

---

## 📝 日後更新流程

每次修改程式碼後，要同步到 GitHub 和 Vercel：

### 步驟 1：本地 Commit

```bash
git add .
git commit -m "描述你的改動"
```

### 步驟 2：推送到 GitHub

```bash
git push origin main
```

### 步驟 3：自動部署到 Vercel

Vercel 會自動檢測 GitHub 的更新，自動部署新版本！🚀

---

## 🐛 故障排除

### 1. `git push` 失敗

**錯誤**：`fatal: 'origin' does not appear to be a 'git' repository`

**解決**：執行正確的 `git remote add origin` 指令。

### 2. Vercel 部署失敗

檢查：
- API Key 是否正確設置
- Node.js 版本是否兼容
- 查看 **Deployments** 標籤中的詳細錯誤日誌

### 3. 部署後 AI 辨識不工作

確認 Vercel 環境變數中有 `ANTHROPIC_API_KEY`。

---

## 📚 參考資源

- [Git 教程](https://git-scm.com/doc)
- [GitHub 文件](https://docs.github.com)
- [Vercel 文件](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)

---

## 🎯 後續改進建議

部署後可繼續：

1. **自訂域名**：在 Vercel 中設置自己的域名
2. **數據庫**：改用 Firebase 或 PostgreSQL（替代 LocalStorage）
3. **監控**：設置 Vercel Analytics 追蹤用戶行為
4. **CI/CD**：在 GitHub Actions 中自動化測試

祝你部署順利！🎊
