# 🚀 AI 智慧記帳 Android 版

Android 版本的 AI 驅動個人記帳應用。使用 Claude Vision API 識別發票，自動提取金額和分類信息。

## 📱 主要功能

- ✨ **AI 識別發票** - 拍照識別發票/收據
- 🤖 **智能分類** - 自動分類到 7 個預設分類
- 📊 **統計圖表** - 月度消費分布可視化
- 💾 **本地存儲** - SQLite 數據庫
- 🎨 **精美界面** - Jetpack Compose + Material Design 3
- ⚡ **快速響應** - 目標啟動時間 < 3 秒

## 🛠️ 技術棧

| 組件 | 技術 | 版本 |
|-----|------|------|
| 語言 | Kotlin | 1.9.10+ |
| UI | Jetpack Compose | 1.6.0 |
| 設計系統 | Material Design 3 | 1.1.0 |
| DI | Hilt | 2.48 |
| 數據庫 | Room | 2.6.0 |
| 網絡 | Retrofit + OkHttp | 2.10.0 / 4.11.0 |
| 異步 | Coroutines | 1.7.1 |
| 相機 | CameraX | 1.3.0 |
| 圖表 | MPAndroidChart | 3.1.0 |

## 📋 前置要求

- **Android Studio** 2023.2 或更高版本
- **Java/JDK** 17 或更高版本
- **Android SDK** API 26+ (最低)，API 34+ (推薦)
- **Anthropic Claude API Key**

## 🚀 快速開始

### 1. 克隆項目

```bash
git clone https://github.com/YOUR_USERNAME/aibudget.git
cd aibudget/android
```

### 2. 配置 API 密鑰

在 `android/` 目錄下創建或編輯 `local.properties` 文件：

```properties
# 複製 local.properties.template 並填寫實際值
sdk.dir=/path/to/android/sdk
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

⚠️ **重要**: 不要將 `local.properties` 提交到 Git！

### 3. 在 Android Studio 中打開項目

```bash
# 或在 Android Studio 中
# File → Open → android 文件夾
```

### 4. 構建項目

```bash
# 使用 Gradle 構建
./gradlew build

# 或在 Android Studio 中點擊 "Build" → "Make Project"
```

### 5. 運行應用

#### 在虛擬設備上運行

```bash
# 啟動 Android 虛擬設備
emulator -avd Pixel_5_API_34 &

# 安裝並運行應用
./gradlew installDebug
adb shell am start -n com.aibudget.app/.MainActivity
```

#### 在真機上運行

```bash
# 連接 Android 設備並啟用 USB 調試
adb devices

# 安裝應用
./gradlew installDebug

# 查看日誌
adb logcat -s com.aibudget.app
```

## 📁 項目結構

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/aibudget/app/
│   │   │   │   ├── di/              # 依賴注入
│   │   │   │   ├── data/            # 數據層
│   │   │   │   │   ├── dao/
│   │   │   │   │   ├── database/
│   │   │   │   │   ├── models/
│   │   │   │   │   └── repository/
│   │   │   │   ├── domain/          # 業務邏輯層
│   │   │   │   │   ├── models/
│   │   │   │   │   └── usecases/
│   │   │   │   ├── presentation/    # UI 層
│   │   │   │   │   ├── screens/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── viewmodels/
│   │   │   │   │   └── navigation/
│   │   │   │   └── utils/           # 工具函數
│   │   │   ├── res/                 # 資源文件
│   │   │   │   ├── values/
│   │   │   │   ├── drawable/
│   │   │   │   └── mipmap/
│   │   │   └── AndroidManifest.xml
│   │   ├── test/                    # 單元測試
│   │   └── androidTest/             # UI 測試
│   ├── build.gradle.kts
│   └── proguard-rules.pro
├── build.gradle.kts
├── settings.gradle.kts
├── local.properties.template        # 本地配置模板
├── .gitignore
└── README.md
```

## 🧪 測試

### 運行單元測試

```bash
./gradlew test
```

### 運行 UI 測試

```bash
./gradlew connectedAndroidTest
```

### 生成測試報告

```bash
./gradlew test connectedAndroidTest
# 報告位置: app/build/reports/
```

## 📦 構建 APK

### Debug APK

```bash
./gradlew assembleDebug
# 輸出: app/build/outputs/apk/debug/app-debug.apk
```

### Release APK

```bash
./gradlew assembleRelease
# 輸出: app/build/outputs/apk/release/app-release.apk
```

### App Bundle (Google Play)

```bash
./gradlew bundleRelease
# 輸出: app/build/outputs/bundle/release/app-release.aab
```

## 🔍 調試

### 查看日誌

```bash
# 實時日誌
adb logcat com.aibudget.app:V

# 保存日誌到文件
adb logcat > app.log

# 清除日誌
adb logcat -c
```

### 使用 Android Studio Debugger

1. 設置斷點（在代碼行號左側點擊）
2. 按 `Shift + F9` (Windows) 或 `Ctrl + D` (macOS) 啟動調試
3. 使用調試工具欄單步執行

## 📚 文檔

- [技術規格書](../createapp_spec.md) - 完整的技術設計
- [開發進度](../createapp_progress.md) - 開發時間表和任務
- [部署指南](../createapp_deployment.md) - 詳細的部署步驟

## 🚀 部署到 Google Play Store

詳見 [createapp_deployment.md](../createapp_deployment.md) 中的 "Play Store 發版" 章節。

主要步驟：
1. 創建 Google Play 開發者帳號
2. 生成簽名密鑰
3. 構建 Release APK/Bundle
4. 填寫應用信息
5. 上傳 APK 並提交審查

## 🐛 常見問題

### Q: Gradle 同步失敗

**A**: 清除 Gradle 緩存
```bash
./gradlew clean
rm -rf ~/.gradle/caches
./gradlew sync
```

### Q: API Key 未找到

**A**: 檢查 `local.properties` 是否正確配置
```bash
# 複製模板
cp local.properties.template local.properties

# 編輯文件並填寫實際的 API Key
```

### Q: 相機權限錯誤

**A**: 確保在運行時請求了權限
- 檢查 AndroidManifest.xml 中的權限聲明
- 在代碼中添加運行時權限請求

## 📞 開發時間表

| 階段 | 時間 | 進度 |
|------|------|------|
| Phase 1 | Week 1-2 | ✅ 完成 - 項目搭建 |
| Phase 2 | Week 3-4 | 🔄 開發中 - 功能實現 |
| Phase 3 | Week 5 | ⏳ 待進行 - 測試優化 |
| Phase 4 | Week 6 | ⏳ 待進行 - 發版 |

詳細進度見 [createapp_progress.md](../createapp_progress.md)

## 📄 許可證

本項目採用 MIT 許可證。詳見 [LICENSE](../LICENSE) 文件。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📧 聯繫方式

如有問題或建議，請通過以下方式聯繫：

- **GitHub Issues**: 提交 Bug 報告或功能請求
- **Email**: your-email@example.com

---

**最後更新**: 2026-01-31  
**版本**: 1.0.0 (開發中)

