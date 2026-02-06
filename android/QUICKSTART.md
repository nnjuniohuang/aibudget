# 🚀 Android 版 - 開發環境快速設置指南

本指南幫助你快速配置 Android 開發環境。預計時間: **15-30 分鐘**

## ✅ 前置檢查清單

在開始前，確保你已經：

- [ ] 安裝了 Android Studio 2023.2+
- [ ] 安裝了 Java/JDK 17+
- [ ] 獲得了 Anthropic Claude API Key
- [ ] Git 已安裝並配置

---

## 第 1 步：準備工作

### 1.1 獲取 Claude API Key

1. 訪問 [Anthropic Console](https://console.anthropic.com/)
2. 登錄或創建帳號
3. 在左側菜單選擇 "API Keys"
4. 點擊 "Create Key" 生成新的 API Key
5. 複製 Key（格式: `sk-ant-xxxxxxxxxxxxxxxxxxxxx`）
6. 保管好 Key，不要分享給任何人！

---

## 第 2 步：配置本地環境

### 2.1 複製配置模板

在 `android/` 目錄下，複製 `local.properties.template` 文件：

**Windows (PowerShell)**:
```powershell
cd android
Copy-Item local.properties.template local.properties
notepad local.properties
```

**macOS / Linux**:
```bash
cd android
cp local.properties.template local.properties
nano local.properties  # 或使用你喜歡的編輯器
```

### 2.2 填寫配置文件

編輯 `local.properties` 文件，填寫以下內容：

```properties
# Android SDK 路徑
# ⚠️ 根據你的系統修改此路徑

# Windows 例子
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk

# macOS 例子
sdk.dir=/Users/YourUsername/Library/Android/sdk

# Linux 例子
sdk.dir=/home/username/Android/Sdk

# Anthropic API Key - 使用你複製的 Key
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

#### 如何找到你的 SDK 路徑？

**在 Android Studio 中**:
1. 打開 Android Studio
2. `Android Studio` → `Preferences` (macOS) 或 `File` → `Settings` (Windows/Linux)
3. 進入 `Appearance & Behavior` → `System Settings` → `Android SDK`
4. 在 "Android SDK Location" 看到你的 SDK 路徑

**或使用命令**:
```bash
# macOS
/usr/libexec/java_home -v 17

# Linux
which java
```

### 2.3 驗證配置

```bash
# 進入項目目錄
cd path/to/aibudget/android

# 驗證 Gradle 能找到配置
./gradlew -v
```

若沒有錯誤，配置成功！✅

---

## 第 3 步：在 Android Studio 中打開項目

### 3.1 打開項目

1. 啟動 Android Studio
2. 點擊 `File` → `Open`
3. 導航到 `aibudget/android` 文件夾
4. 點擊 `Open`

### 3.2 等待 Gradle 同步

Android Studio 會自動：
- 下載 Gradle
- 下載所有依賴庫
- 配置項目

這可能需要 **5-15 分鐘**（取決於網速）。

### 3.3 檢查是否成功

在 Android Studio 底部的 "Build" 標籤頁，應該看到：
```
BUILD SUCCESSFUL in XXs
```

如果看到錯誤，查看 [故障排除](#故障排除) 部分。

---

## 第 4 步：配置虛擬設備（可選）

若要在虛擬設備上測試應用，需要創建 Android Virtual Device (AVD)。

### 4.1 創建 AVD

1. 在 Android Studio 中，點擊 `Tools` → `Device Manager`
2. 點擊 `Create Device`
3. 選擇設備配置（推薦選擇 `Pixel 5`）
4. 點擊 `Next`
5. 選擇系統鏡像（推薦 **Android 14, API 34**）
   - 若未下載，點擊 "Download"
   - 等待下載完成
6. 點擊 `Next`
7. 確認設置，點擊 `Finish`

### 4.2 啟動虛擬設備

1. 在 Device Manager 中，找到你新建的 AVD
2. 點擊 "Play" 按鈕啟動
3. 等待設備完全啟動（可能需要 2-3 分鐘）

---

## 第 5 步：運行應用

### 5.1 構建項目

在 Android Studio 中：
1. 點擊 `Build` → `Make Project`
2. 等待構建完成
3. 如果有紅色錯誤，檢查 [故障排除](#故障排除)

### 5.2 運行應用

1. 點擊工具欄的 "Run" 按鈕（綠色三角形）
2. 或按 `Shift + F10` (Windows) / `Control + R` (macOS)
3. 選擇要運行的設備（虛擬或真機）
4. 點擊 "OK"

應用會在設備上安裝並自動啟動！

### 5.3 查看日誌

1. 打開 `View` → `Tool Windows` → `Logcat`
2. 在過濾框輸入 `com.aibudget.app`
3. 實時查看應用日誌

---

## 故障排除

### ❌ "gradle.properties not found"

**解決方案**:
```bash
cd android
touch gradle.properties
```

### ❌ Gradle 同步失敗

**解決方案**:
```bash
# 清除 Gradle 緩存
./gradlew clean
rm -rf ~/.gradle/caches
./gradlew sync
```

### ❌ "ANTHROPIC_API_KEY not found"

**解決方案**:
1. 檢查 `local.properties` 文件是否存在
2. 確保文件包含正確的 API Key
3. 檢查文件沒有被 Git 忽略

```bash
# 檢查 local.properties 內容
cat local.properties
```

### ❌ "Build Configuration not found"

**解決方案**:
1. 確保 `local.properties` 在正確位置（`android/local.properties`）
2. 執行 `./gradlew sync`
3. 在 Android Studio 中點擊 `File` → `Sync Now`

### ❌ 虛擬設備啟動失敗

**解決方案**:
```bash
# 列出所有 AVD
emulator -list-avds

# 用詳細日誌啟動 AVD
emulator -avd Pixel_5_API_34 -verbose
```

### ❌ "android:usesCleartextTraffic" 警告

**原因**: 應用嘗試使用非加密的 HTTP 連接

**解決方案**: 已在 AndroidManifest.xml 中設置 `android:usesCleartextTraffic="false"`，使用 HTTPS。

---

## 📱 在真機上運行

### 準備真機

1. **連接設備**: 使用 USB 線連接 Android 設備
2. **啟用開發者模式**:
   - 打開 `Settings` → `About Phone`
   - 連續點擊 7 次 "Build Number"
   - 返回到 Settings，找到 "Developer Options"
3. **啟用 USB 調試**:
   - 在 Developer Options 中找到 "USB Debugging"
   - 開啟開關

### 在真機上運行應用

1. 在 Android Studio 工具欄選擇你的設備
2. 點擊 "Run" 按鈕
3. 應用會被安裝到真機上

---

## ✨ 常用命令

```bash
# 進入項目目錄
cd path/to/aibudget/android

# 構建 Debug APK
./gradlew assembleDebug

# 在設備上安裝 Debug APK
./gradlew installDebug

# 運行所有測試
./gradlew test

# 清除構建文件
./gradlew clean

# 查看依賴樹
./gradlew dependencies

# 檢查 Lint 問題
./gradlew lint
```

---

## 🎉 成功標誌

當你看到以下情況，說明設置成功了：

- ✅ Android Studio 成功打開項目
- ✅ Gradle 同步完成，無錯誤
- ✅ 應用能在虛擬設備或真機上運行
- ✅ 首頁顯示 "歡迎使用 AI 智慧記帳"

---

## 📚 後續步驟

1. **閱讀項目文檔**:
   - [技術規格書](../createapp_spec.md)
   - [開發進度](../createapp_progress.md)

2. **開始開發**:
   - 查看 `src/main/java/com/aibudget/app/` 中的代碼結構
   - 根據 [createapp_progress.md](../createapp_progress.md) 的任務進行開發

3. **測試應用**:
   ```bash
   ./gradlew test           # 單元測試
   ./gradlew connectedAndroidTest  # UI 測試
   ```

---

## 💡 提示

- 首次同步可能較慢，請耐心等待
- 確保網絡連接穩定，以下載依賴
- API Key 不要提交到 Git，`local.properties` 已在 `.gitignore` 中
- 遇到問題時，查看 Gradle 構建日誌中的詳細錯誤信息

---

## 📞 獲取幫助

- 💬 查看 [README.md](./README.md)
- 📖 查看 [Android 部署指南](../createapp_deployment.md)
- 🐛 如有 Bug，提交 GitHub Issue

**祝開發愉快！🚀**

