# 📑 AIBudget 項目 - 文件索引與導航指南

**最後更新**: 2026-01-31  
**版本**: 1.0  
**項目狀態**: Phase 1 完成 ✅

---

## 🗂️ 項目總體結構

```
aibudget/
├── 📄 根目錄文檔
│   ├── README.md                      ← 主項目說明
│   ├── DEPLOYMENT.md                  ← Web 版本部署指南
│   ├── ANDROID_SETUP_COMPLETE.md      ← Android 版本完成總結
│   ├── ANDROID_BUILD_REPORT.md        ← Android 構建詳細報告
│   └── 📑 本文件 (FILE_INDEX.md)
│
├── 📱 Web 版本 (Next.js + Vercel) - 已部署 ✅
│   ├── src/                           ← 源代碼
│   ├── package.json
│   └── next.config.ts
│
├── 🚀 Android 版本技術文檔
│   ├── createapp_spec.md              ← 技術規格書 (10 章節)
│   ├── createapp_progress.md          ← 開發進度計劃 (6 週)
│   └── createapp_deployment.md        ← 部署指南 (10 章節)
│
└── 📁 android/                        ← Android 項目根目錄
    ├── 📚 文檔
    │   ├── README.md                  ← Android 項目說明
    │   ├── QUICKSTART.md              ← 快速開始指南 (15 分鐘)
    │   └── PHASE1_SUMMARY.md          ← Phase 1 完成總結
    │
    ├── 🔧 構建配置
    │   ├── build.gradle.kts           ← 根級 Gradle 配置
    │   ├── settings.gradle.kts        ← 項目設置
    │   ├── local.properties.template  ← API Key 配置模板
    │   └── .gitignore                 ← Git 忽略規則
    │
    └── 📱 app/ 模塊
        ├── build.gradle.kts           ← 應用級 Gradle 配置
        ├── proguard-rules.pro         ← 代碼混淆規則
        │
        └── src/main/
            ├── AndroidManifest.xml    ← 應用清單配置
            │
            ├── java/com/aibudget/app/
            │   ├── MainActivity.kt     ← 應用入口
            │   │
            │   ├── di/                 ← 依賴注入層
            │   │   └── AppModule.kt    ← Hilt 模塊配置
            │   │
            │   ├── data/               ← 數據層
            │   │   ├── dao/
            │   │   │   └── ExpenseDao.kt        ← 數據訪問對象
            │   │   ├── database/
            │   │   │   └── AppDatabase.kt       ← Room 數據庫
            │   │   ├── models/
            │   │   │   └── ExpenseEntity.kt     ← 數據庫實體
            │   │   └── repository/
            │   │       └── ExpenseRepository.kt ← 倉庫實現
            │   │
            │   ├── domain/             ← 業務邏輯層
            │   │   └── models/
            │   │       └── ExpenseItem.kt       ← 領域模型
            │   │
            │   ├── presentation/       ← 表現層
            │   │   ├── screens/        ← 屏幕（待開發）
            │   │   ├── components/     ← UI 組件（待開發）
            │   │   ├── viewmodels/     ← ViewModel（待開發）
            │   │   └── navigation/     ← 導航配置（待開發）
            │   │
            │   └── utils/              ← 工具層
            │       ├── DateUtils.kt    ← 日期工具函數
            │       ├── MoneyUtils.kt   ← 金額格式化工具
            │       ├── ImageUtils.kt   ← 圖像處理工具
            │       └── IdUtils.kt      ← ID 生成工具
            │
            ├── res/                    ← 資源文件
            │   └── values/
            │       ├── strings.xml     ← 字符串資源 (20+)
            │       ├── colors.xml      ← 顏色定義 (14 種)
            │       └── themes.xml      ← 主題配置
            │
            ├── test/                   ← 單元測試（待開發）
            └── androidTest/            ← UI 測試（待開發）
```

---

## 📖 文檔導航

### 🌐 Web 版本相關

| 文檔 | 目的 | 適用於 |
|------|------|--------|
| [README.md](./README.md) | 項目主說明 | 所有人 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Web 版本部署到 Vercel | Web 開發者 |

### 📱 Android 版本相關

#### 快速開始 (首選)
| 文檔 | 耗時 | 目的 |
|------|------|------|
| [android/QUICKSTART.md](./android/QUICKSTART.md) | ⏱️ 15 分鐘 | 環境配置和第一次運行 |
| [android/README.md](./android/README.md) | ⏱️ 30 分鐘 | 項目完整說明 |

#### 技術文檔 (開發參考)
| 文檔 | 章節數 | 目的 |
|------|--------|------|
| [createapp_spec.md](./createapp_spec.md) | 10 | 技術規格和架構設計 |
| [createapp_progress.md](./createapp_progress.md) | 4 | 開發進度和任務計劃 |
| [createapp_deployment.md](./createapp_deployment.md) | 10 | 構建、測試、發版流程 |

#### 內部文檔 (項目管理)
| 文檔 | 目的 |
|------|------|
| [android/PHASE1_SUMMARY.md](./android/PHASE1_SUMMARY.md) | Phase 1 完成總結 |
| [ANDROID_SETUP_COMPLETE.md](./ANDROID_SETUP_COMPLETE.md) | 版本構建完成說明 |
| [ANDROID_BUILD_REPORT.md](./ANDROID_BUILD_REPORT.md) | 構建詳細統計報告 |

---

## 🎯 按使用場景查找文檔

### 📝 "我是新開發者，想快速開始"

1. 📖 首先閱讀: [android/QUICKSTART.md](./android/QUICKSTART.md) (15 分鐘)
   - 環境檢查清單
   - 配置 API Key 和 SDK
   - 運行應用驗證

2. 📚 然後查看: [android/README.md](./android/README.md) (30 分鐘)
   - 項目結構說明
   - 常見問題解答
   - 測試命令

### 🏗️ "我想了解項目架構"

1. 📖 首先閱讀: [createapp_spec.md](./createapp_spec.md) (1 小時)
   - 項目概述
   - 技術架構 (MVVM)
   - 數據庫設計
   - API 設計

2. 📚 然後查看: [android/README.md](./android/README.md) (項目結構部分)

### 💻 "我想開始開發功能"

1. 📖 查看: [createapp_progress.md](./createapp_progress.md)
   - 當前 Phase 的任務清單
   - 預期完成時間
   - 依賴和前置條件

2. 📚 參考: [createapp_spec.md](./createapp_spec.md)
   - API 設計規范
   - 代碼架構指導

3. 🔍 檢查代碼: `android/app/src/main/java/com/aibudget/app/`

### 🚀 "我想部署應用到手機或 Play Store"

1. 📖 閱讀: [createapp_deployment.md](./createapp_deployment.md)
   - 本地開發設置
   - 真機調試步驟
   - APK 打包方式
   - Play Store 發版流程

2. 🔧 執行具體命令

### 🧪 "我想測試應用"

1. 📚 查看: [android/README.md](./android/README.md#-測試)
2. 📖 參考: [createapp_deployment.md](./createapp_deployment.md#-測試與調試)

### 📊 "我想了解項目進度"

1. 📖 查看: [android/PHASE1_SUMMARY.md](./android/PHASE1_SUMMARY.md)
   - Phase 1 完成情況
   - 創建的文件統計
   - 下一步計劃

2. 📚 查看: [createapp_progress.md](./createapp_progress.md)
   - 完整的 6 週計劃
   - 各 Phase 的詳細任務

3. 📊 查看: [ANDROID_BUILD_REPORT.md](./ANDROID_BUILD_REPORT.md)
   - 代碼統計
   - 架構評分
   - 開發就緒度檢查

---

## 🔍 按技術主題查找

### 🗄️ 數據庫相關
- 📖 [createapp_spec.md - 數據庫架構](./createapp_spec.md#-數據庫架構)
- 💻 [android/app/src/main/java/com/aibudget/app/data/](./android/app/src/main/java/com/aibudget/app/data/)

### 🎨 UI/UX 相關
- 📖 [createapp_spec.md - UI/UX 設計](./createapp_spec.md#-uiux-設計)
- 💻 [android/app/src/main/java/com/aibudget/app/presentation/](./android/app/src/main/java/com/aibudget/app/presentation/)

### 🔌 API 相關
- 📖 [createapp_spec.md - API 設計](./createapp_spec.md#-api-設計)
- 📋 待開發：Claude Vision API 集成

### 📸 相機相關
- 📖 [createapp_progress.md - Week 3](./createapp_progress.md#week-3-相機集成)
- 📖 [createapp_deployment.md - 真機部署](./createapp_deployment.md#-真機部署)

### 🚀 部署相關
- 📖 [createapp_deployment.md - 完整部署指南](./createapp_deployment.md)
- 📖 [DEPLOYMENT.md - Web 版本部署](./DEPLOYMENT.md)

### 🔐 安全相關
- 📖 [createapp_spec.md - 安全性考量](./createapp_spec.md#-安全性考量)
- 📖 [android/QUICKSTART.md - API Key 配置](./android/QUICKSTART.md#21-複製配置模板)

### ⚡ 性能相關
- 📖 [createapp_spec.md - 性能指標](./createapp_spec.md#-性能指標)
- 📖 [createapp_progress.md - Phase 3](./createapp_progress.md#-phase-3-測試與優化-week-5)

---

## 📋 完整文件清單

### 根目錄文件
```
✅ README.md                      (main readme)
✅ DEPLOYMENT.md                  (web deployment)
✅ package.json                   (web dependencies)
✅ next.config.ts                 (next.js config)
✅ tsconfig.json                  (typescript config)
✅ .gitignore                     (git ignore rules)
✅ createapp_spec.md              (android spec)
✅ createapp_progress.md          (android progress)
✅ createapp_deployment.md        (android deployment)
✅ ANDROID_SETUP_COMPLETE.md      (android summary)
✅ ANDROID_BUILD_REPORT.md        (android report)
📑 FILE_INDEX.md                  (本文件)
```

### Android 項目文件
```
android/
  ✅ build.gradle.kts
  ✅ settings.gradle.kts
  ✅ local.properties.template
  ✅ .gitignore
  ✅ README.md
  ✅ QUICKSTART.md
  ✅ PHASE1_SUMMARY.md
  
  app/
    ✅ build.gradle.kts
    ✅ proguard-rules.pro
    
    src/main/
      ✅ AndroidManifest.xml
      
      java/com/aibudget/app/
        ✅ MainActivity.kt
        
        di/
          ✅ AppModule.kt
        
        data/
          dao/
            ✅ ExpenseDao.kt
          database/
            ✅ AppDatabase.kt
          models/
            ✅ ExpenseEntity.kt
          repository/
            ✅ ExpenseRepository.kt
        
        domain/
          models/
            ✅ ExpenseItem.kt
        
        presentation/
          screens/       (待開發)
          components/    (待開發)
          viewmodels/    (待開發)
          navigation/    (待開發)
        
        utils/
          ✅ DateUtils.kt
          ✅ MoneyUtils.kt
          ✅ ImageUtils.kt
          ✅ IdUtils.kt
      
      res/
        values/
          ✅ strings.xml
          ✅ colors.xml
          ✅ themes.xml
      
      test/              (待開發)
      androidTest/       (待開發)
```

---

## 🎓 推薦閱讀順序

### 第一次接觸項目
1. [README.md](./README.md) - 2 分鐘 - 了解項目概況
2. [android/QUICKSTART.md](./android/QUICKSTART.md) - 15 分鐘 - 快速配置環境
3. [android/README.md](./android/README.md) - 30 分鐘 - 了解項目結構

### 深入技術細節
1. [createapp_spec.md](./createapp_spec.md) - 1-2 小時 - 了解完整架構
2. [android/PHASE1_SUMMARY.md](./android/PHASE1_SUMMARY.md) - 30 分鐘 - 了解實現細節
3. 查看源代碼: `android/app/src/main/java/com/aibudget/app/`

### 準備開發
1. [createapp_progress.md](./createapp_progress.md) - 30 分鐘 - 了解下一步任務
2. 設置開發環境 - 按 [QUICKSTART.md](./android/QUICKSTART.md) 進行
3. 開始編碼：按 Phase 2 任務進行

### 準備部署
1. [createapp_deployment.md](./createapp_deployment.md) - 1-2 小時 - 了解完整部署流程
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - 30 分鐘 - Web 版本部署（已完成）
3. 執行部署步驟

---

## 💡 快速參考

### 常用命令

**構建和運行**
```bash
cd android
./gradlew build              # 構建應用
./gradlew installDebug       # 安裝到設備
./gradlew run                # 運行應用
```

**測試**
```bash
./gradlew test               # 運行單元測試
./gradlew connectedAndroidTest  # UI 測試
```

**打包**
```bash
./gradlew assembleDebug      # Debug APK
./gradlew assembleRelease    # Release APK
./gradlew bundleRelease      # Play Store Bundle
```

### 快速鏈接

| 需求 | 文檔 |
|------|------|
| 環境問題 | [QUICKSTART.md - 故障排除](./android/QUICKSTART.md#故障排除) |
| API Key 配置 | [QUICKSTART.md - 配置文件](./android/QUICKSTART.md#22-填寫配置文件) |
| 項目結構 | [android/README.md - 項目結構](./android/README.md#-項目結構) |
| 技術棧 | [createapp_spec.md - 開發技術棧](./createapp_spec.md#-開發技術棧) |
| 性能目標 | [createapp_spec.md - 性能指標](./createapp_spec.md#-性能指標) |
| 下一步任務 | [createapp_progress.md - Phase 2](./createapp_progress.md#-phase-2-ai-功能與相機集成-week-3-4) |

---

## 📞 獲取幫助

### 按問題類型

| 問題 | 查看位置 |
|------|---------|
| 無法構建項目 | [QUICKSTART.md - 故障排除](./android/QUICKSTART.md#故障排除) |
| 不知道如何開始 | [QUICKSTART.md](./android/QUICKSTART.md) |
| 想了解架構 | [createapp_spec.md](./createapp_spec.md) |
| 想知道進度 | [createapp_progress.md](./createapp_progress.md) 或 [android/PHASE1_SUMMARY.md](./android/PHASE1_SUMMARY.md) |
| 想部署應用 | [createapp_deployment.md](./createapp_deployment.md) |
| 代碼問題 | 查看源代碼註釋或相關技術規格 |

### 按角色

| 角色 | 推薦路徑 |
|------|---------|
| **新開發者** | QUICKSTART.md → README.md → 代碼 |
| **項目經理** | PHASE1_SUMMARY.md → createapp_progress.md |
| **架構師** | createapp_spec.md → 代碼結構 |
| **測試人員** | createapp_deployment.md (測試部分) |
| **運維人員** | createapp_deployment.md (部署部分) |

---

## ✨ 文檔特色

- ✅ **完整性**: 涵蓋從環境配置到 Play Store 發版的全流程
- ✅ **實用性**: 包含具體命令、代碼示例、故障排除
- ✅ **結構清晰**: 按 Phase、Week、Task 組織
- ✅ **易于導航**: 多個索引和快速查找表
- ✅ **持續更新**: 隨著開發進度更新

---

## 📊 文檔統計

- **總文檔數**: 14
- **總行數**: 6000+
- **代碼文件**: 15
- **配置文件**: 8
- **技術規范**: 3
- **快速指南**: 2

---

## 🎉 開始探索

現在你已經掌握了所有文檔的位置！選擇適合你的文檔開始閱讀吧。

**建議首選**: [android/QUICKSTART.md](./android/QUICKSTART.md) ⏱️ 15 分鐘

---

**最後更新**: 2026-01-31  
**狀態**: ✅ 完整

