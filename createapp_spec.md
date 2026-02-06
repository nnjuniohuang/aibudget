# AI 智慧記帳 Android 版 - 技術規格書

**文檔版本**: 1.0  
**最後更新**: 2026-01-31  
**項目名稱**: AIBudget Android App  
**目標平台**: Android 8.0 (API Level 26) 及以上

---

## 📋 目錄

1. [項目概述](#項目概述)
2. [功能需求](#功能需求)
3. [技術架構](#技術架構)
4. [開發技術棧](#開發技術棧)
5. [系統要求](#系統要求)
6. [API 設計](#api-設計)
7. [數據庫架構](#數據庫架構)
8. [UI/UX 設計](#uiux-設計)
9. [安全性考量](#安全性考量)
10. [性能指標](#性能指標)

---

## 🎯 項目概述

### 應用描述
AIBudget 是一款 AI 驅動的個人記帳應用程序，用戶可以通過拍照識別發票/收據，自動提取金額、商店名稱、日期和分類信息，並自動保存到本地數據庫。應用程序可視化展示每月支出分佈。

### 核心場景
- 用戶拍照或上傳發票/收據
- Claude AI Vision 識別並提取關鍵信息
- 應用自動分類並存儲
- 用戶查看月度消費圖表和明細

---

## ✨ 功能需求

### 1. 基礎功能 (MVP)

#### 1.1 拍照/上傳功能
- **拍照**: 使用設備相機實時拍照
- **上傳**: 從相冊選擇圖片
- **圖像格式支持**: JPEG, PNG, GIF, WebP
- **圖像大小限制**: 最大 5MB

#### 1.2 AI 識別功能
- **Vision API**: 集成 Claude 3.5 Sonnet Vision
- **提取信息**: 商店名稱、金額、日期、分類
- **智能分類**: 自動匹配 7 個預設分類
- **置信度**: 識別結果顯示置信度 (可選)

#### 1.3 記帳管理
- **新增記錄**: 手動輸入或 AI 識別
- **編輯記錄**: 修改所有字段
- **刪除記錄**: 支持單個或批量刪除
- **分類管理**: 飲食、交通、娛樂、購物、日用品、醫療、其他

#### 1.4 數據展示
- **本月統計**: 本月總支出、記錄數量
- **餅圖展示**: 各分類支出比例
- **列表視圖**: 按日期排序的記錄清單
- **搜索/篩選**: 按日期、分類、金額範圍篩選

#### 1.5 數據持久化
- **本地存儲**: SQLite 數據庫
- **備份功能**: 支持導出 JSON/CSV
- **恢復功能**: 支持導入備份文件

### 2. 進階功能 (Phase 2)

- 雲同步 (Firebase Realtime Database)
- 多月份統計趨勢分析
- 預算設定與超支提醒
- 語音備忘錄
- 重複記錄檢測
- OCR 本地化處理

---

## 🏗️ 技術架構

### 整體架構
```
┌─────────────────────────────────────────┐
│        Android App UI Layer             │
│  (Jetpack Compose / Material Design 3)  │
├─────────────────────────────────────────┤
│     Business Logic & ViewModels         │
│  (MVVM Pattern with Coroutines)        │
├─────────────────────────────────────────┤
│      Repository & Data Layer            │
│  (SQLite, SharedPreferences)            │
├─────────────────────────────────────────┤
│      External Services                  │
│  (Claude AI API, Camera, Storage)       │
└─────────────────────────────────────────┘
```

### 設計模式
- **MVVM** (Model-View-ViewModel)
- **Repository Pattern** - 數據訪問抽象
- **Dependency Injection** - Hilt
- **Flow & LiveData** - 響應式數據流

---

## 🛠️ 開發技術棧

### 核心框架與庫

| 類別 | 技術 | 版本 | 說明 |
|------|------|------|------|
| **語言** | Kotlin | 1.9+ | Android 官方推薦 |
| **UI 框架** | Jetpack Compose | 1.6+ | 現代聲明式 UI |
| **Design System** | Material Design 3 | - | Google 設計系統 |
| **依賴注入** | Hilt | 2.48+ | 簡化 DI |
| **數據庫** | Room | 2.6+ | SQLite ORM |
| **異步處理** | Coroutines | 1.7+ | 非阻塞操作 |
| **網絡請求** | Retrofit + OkHttp | 2.10+ / 4.11+ | REST API 調用 |
| **JSON 序列化** | Kotlinx Serialization | 1.6+ | JSON 解析 |
| **圖表庫** | MPAndroidChart | 3.1.0 | 圖表繪製 |
| **日期處理** | Kotlinx DateTime | 0.5+ | 日期計算 |
| **相機** | CameraX | 1.3+ | 相機 API |
| **文件選擇** | FilePicker | - | 文件選擇 UI |

### 開發環境

| 工具 | 版本 | 用途 |
|------|------|------|
| **Android Studio** | 2023.2+ | IDE |
| **Android SDK** | API 26+ (target: 34+) | SDK |
| **Gradle** | 8.2+ | 構建工具 |
| **Java/JDK** | 17+ | 編譯環境 |

---

## 📱 系統要求

### 最低要求
- **最低 SDK 版本**: Android 8.0 (API 26)
- **目標 SDK 版本**: Android 14+ (API 34+)
- **內存**: 最低 2GB RAM (推薦 4GB+)
- **存儲**: 最少 100MB 可用空間

### 設備支持
- **屏幕尺寸**: 手機 (4.5"-6.7"), 平板 (7"+)
- **方向**: 豎屏為主，支持橫屏
- **权限**: 相機、存儲、網絡

### 依賴服務
- **Claude API**: 需要有效 API Key
- **網絡連接**: 必須 (用於 AI 識別)
- **位置服務**: 可選 (未來功能)

---

## 🔌 API 設計

### Claude Vision API 調用

#### 端點
```
POST /api/vision/claude
```

#### 請求格式
```json
{
  "imageBase64": "string",
  "mediaType": "image/jpeg|image/png|image/gif|image/webp"
}
```

#### 響應格式（成功）
```json
{
  "store": "便利商店名稱",
  "amount": 89,
  "date": "2026-01-31",
  "category": "飲食"
}
```

#### 響應格式（錯誤）
```json
{
  "error": "錯誤信息",
  "status": 400
}
```

### 本地 API (應用內部)

#### ExpenseRepository 接口
```kotlin
interface ExpenseRepository {
    suspend fun getAllExpenses(): List<ExpenseItem>
    suspend fun getExpensesByMonth(year: Int, month: Int): List<ExpenseItem>
    suspend fun getExpenseById(id: String): ExpenseItem?
    suspend fun insertExpense(expense: ExpenseItem): Long
    suspend fun updateExpense(expense: ExpenseItem): Int
    suspend fun deleteExpense(id: String): Int
    suspend fun deleteAllExpenses(): Int
    fun observeExpenses(): Flow<List<ExpenseItem>>
    fun observeExpensesByMonth(year: Int, month: Int): Flow<List<ExpenseItem>>
}
```

---

## 💾 數據庫架構

### SQLite 數據庫架構

#### 表 1: expenses

| 列名 | 類型 | 約束 | 說明 |
|------|------|------|------|
| id | TEXT | PRIMARY KEY | UUID |
| store | TEXT | NOT NULL | 商店名稱 |
| amount | REAL | NOT NULL | 金額 (TWD) |
| date | TEXT | NOT NULL | 日期 (YYYY-MM-DD) |
| category | TEXT | NOT NULL | 分類 |
| note | TEXT | NULLABLE | 備註 |
| created_at | TEXT | NOT NULL | 創建時間 (ISO 8601) |
| updated_at | TEXT | NOT NULL | 更新時間 (ISO 8601) |

**索引**:
- `idx_date` on `date`
- `idx_category` on `category`
- `idx_created_at` on `created_at`

#### 表 2: categories (預留未來擴展)

| 列名 | 類型 | 約束 | 說明 |
|------|------|------|------|
| id | TEXT | PRIMARY KEY | UUID |
| name | TEXT | NOT NULL UNIQUE | 分類名稱 |
| color | TEXT | NOT NULL | 十六進制顏色代碼 |
| icon | TEXT | NULLABLE | 圖標名稱 |
| is_custom | BOOLEAN | DEFAULT 0 | 是否自定義 |

### 示例數據

```kotlin
data class ExpenseItem(
    val id: String,              // UUID
    val store: String,           // "便利商店"
    val amount: Double,          // 89.0
    val date: String,            // "2026-01-31"
    val category: String,        // "飲食"
    val note: String? = null,    // "買飲料"
    val createdAt: String,       // "2026-01-31T10:30:00Z"
    val updatedAt: String        // "2026-01-31T10:30:00Z"
)
```

---

## 🎨 UI/UX 設計

### 頁面結構

#### 1. 首頁 (Home Screen)
- **頂部**: 本月總支出展示 + 日期選擇器
- **中部**: 餅圖 (各分類支出比例)
- **下部**: 本月支出列表 (可滾動)
- **浮動按鈕**: 拍照、上傳、手動添加

#### 2. 拍照/上傳頁面 (Capture Screen)
- **標題**: "拍照識別發票"
- **預覽區**: 實時相機預覽 / 已選圖片
- **按鈕區**: 拍照按鈕、切換攝像頭、相冊選擇
- **進度**: 識別中顯示加載動畫

#### 3. 編輯確認頁面 (Confirm Screen)
- **AI 識別結果**: 商店、金額、日期、分類
- **編輯區**: 可編輯各字段
- **操作**: 確認保存、重新拍照、取消

#### 4. 記錄詳情頁面 (Detail Screen)
- **顯示信息**: 完整記錄信息
- **編輯按鈕**: 進入編輯模式
- **刪除按鈕**: 刪除記錄
- **分享按鈕**: 導出記錄 (可選)

#### 5. 設置頁面 (Settings Screen)
- **基本設置**: 默認分類、貨幣符號
- **數據管理**: 導出、導入、清除數據
- **關於應用**: 版本、隱私政策

### 顏色與分類對應

```
飲食 (Food):        #f97316 (橙色)
交通 (Transport):   #3b82f6 (藍色)
娛樂 (Entertainment): #ec4899 (粉紅)
購物 (Shopping):    #a855f7 (紫色)
日用品 (Essentials): #10b981 (綠色)
醫療 (Healthcare):  #ef4444 (紅色)
其他 (Others):      #6b7280 (灰色)
```

---

## 🔒 安全性考量

### API 密鑰管理
- **local.properties**: 本地開發環境 (不提交 Git)
- **BuildConfig**: 編譯時注入
- **觀察者模式**: 敏感信息不日誌記錄

```gradle
// build.gradle.kts
android {
    buildFeatures {
        buildConfig = true
    }
    buildTypes {
        debug {
            buildConfigField("String", "ANTHROPIC_API_KEY", "\"${project.findProperty("ANTHROPIC_API_KEY")}\"")
        }
        release {
            buildConfigField("String", "ANTHROPIC_API_KEY", "\"${project.findProperty("ANTHROPIC_API_KEY")}\"")
        }
    }
}
```

### 數據安全
- **本地加密**: 使用 EncryptedSharedPreferences (敏感設置)
- **數據庫加密**: SQLCipher (可選，Phase 2)
- **HTTPS**: 所有網絡通信必須使用 TLS 1.2+
- **輸入驗證**: 所有用戶輸入進行驗證

### 權限管理
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### 隱私保護
- **數據最小化**: 僅收集必要數據
- **本地優先**: 默認不上傳到云端
- **用戶控制**: 顯式同意才能啟用云功能
- **匿名化**: AI 識別不保存原始圖像

---

## ⚡ 性能指標

### 目標指標

| 指標 | 目標值 | 說明 |
|------|--------|------|
| **冷啟動時間** | < 3 秒 | 首次啟動應用 |
| **熱啟動時間** | < 1 秒 | 從後台恢復 |
| **圖片識別時間** | 2-5 秒 | AI 識別響應時間 |
| **列表滾動幀率** | 60 FPS | 列表本地滾動 |
| **UI 響應延遲** | < 100ms | 用戶操作反饋 |
| **內存占用** | < 150MB | 正常運行內存 |
| **APK 大小** | < 50MB | 安裝包大小 |
| **電池消耗** | < 2% / 小時 | 待機耗電 |

### 優化策略

1. **Lazy Loading**: 列表分頁加載
2. **Image Caching**: 識別圖像緩存
3. **Database Indexing**: 數據庫索引優化
4. **Coroutine**: 異步非阻塞操作
5. **ProGuard/R8**: 代碼混淆與優化

---

## 📅 開發時間表

| 階段 | 時間 | 任務 | 交付物 |
|------|------|------|--------|
| **Phase 1** | Week 1-2 | 項目搭建、UI 框架、本地存儲 | 基礎應用框架 |
| **Phase 2** | Week 3-4 | 相機集成、AI API、識別流程 | 完整識別功能 |
| **Phase 3** | Week 5 | 測試、優化、發版準備 | Alpha 版本 |
| **Phase 4** | Week 6 | Play Store 上線、文檔 | 正式發布 |

---

## 📞 相關資源

- **Claude API 文檔**: https://docs.anthropic.com/
- **Android 開發文檔**: https://developer.android.com/
- **Jetpack Compose**: https://developer.android.com/jetpack/compose
- **Room 數據庫**: https://developer.android.com/training/data-storage/room

