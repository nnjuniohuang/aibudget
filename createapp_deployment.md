# AI 智慧記帳 Android 版 - 部署與發版指南

**文檔版本**: 1.0  
**最後更新**: 2026-01-31  
**適用版本**: AIBudget Android App v1.0+  

---

## 📋 目錄

1. [開發環境部署](#開發環境部署)
2. [本地開發設置](#本地開發設置)
3. [測試與調試](#測試與調試)
4. [APK 打包](#apk-打包)
5. [真機部署](#真機部署)
6. [Play Store 發版](#play-store-發版)
7. [測試發版](#測試發版)
8. [生產部署](#生產部署)
9. [故障排除](#故障排除)
10. [更新與維護](#更新與維護)

---

## 🛠️ 開發環境部署

### 1. 前置要求

#### 系統要求
- **作業系統**: Windows 10/11, macOS 12+, Linux (Ubuntu 20.04+)
- **CPU**: Intel i7/AMD Ryzen 7 或更高
- **RAM**: 最少 8GB (推薦 16GB+)
- **磁盤**: 最少 20GB SSD 可用空間
- **網絡**: 穩定的互聯網連接

#### 軟件要求
- Java/JDK 17 或更高
- Android Studio 2023.2 或更高
- Git 版本控制

### 2. JDK 安裝

#### Windows 環境
```bash
# 使用 Chocolatey 安裝 JDK 17
choco install openjdk17

# 驗證安裝
java -version
javac -version
```

#### macOS 環境
```bash
# 使用 Homebrew
brew install openjdk@17

# 設置環境變量
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
echo $JAVA_HOME
```

#### Linux 環境 (Ubuntu)
```bash
sudo apt update
sudo apt install openjdk-17-jdk openjdk-17-jdk-headless

# 驗證
java -version
```

### 3. Android Studio 安裝

#### 下載與安裝
1. 訪問 [Android Studio 官方網站](https://developer.android.com/studio)
2. 下載最新版本
3. 運行安裝程序

#### 初始配置
```bash
# 啟動 Android Studio
# 選擇 "Do not import settings"
# 點擊 "Next" 進入設置向導
```

#### 配置 Android SDK
1. 打開 `Preferences/Settings` → `Appearance & Behavior` → `System Settings` → `Android SDK`
2. 選擇 SDK Platforms:
   - Android 8.0 (API 26)
   - Android 9.0 (API 28)
   - Android 10 (API 29)
   - Android 11 (API 30)
   - Android 12 (API 31)
   - Android 13 (API 33)
   - Android 14 (API 34) ✅ **推薦**
3. 點擊 "Apply" 並等待安裝完成
4. 選擇 SDK Tools:
   - Android SDK Build-Tools 34.0.0+
   - Android Emulator
   - Android SDK Platform-Tools
   - Google Play Services

#### Gradle 配置
在 `~/.gradle/gradle.properties` 中添加:
```properties
# 提高構建速度
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m

# Kotlin
kotlin.code.style=official
```

---

## 💻 本地開發設置

### 1. 克隆項目

```bash
# 克隆項目
git clone https://github.com/YOUR_USERNAME/AIBudget.git
cd AIBudget

# 查看分支
git branch -a

# 切換到開發分支
git checkout develop
```

### 2. 配置 API 密鑰

#### 創建 local.properties
在項目根目錄創建 `local.properties` 文件:

```properties
# local.properties
sdk.dir=/path/to/android/sdk
ndk.dir=/path/to/android/ndk

# Claude AI API Key
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
```

⚠️ **重要**: 在 `.gitignore` 中確保 `local.properties` 不被提交!

#### build.gradle.kts 配置
```kotlin
// build.gradle.kts (app module)
android {
    compileSdk = 34
    
    defaultConfig {
        applicationId = "com.aibudget.app"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        
        // 從 local.properties 讀取 API Key
        val anthropicApiKey = project.findProperty("ANTHROPIC_API_KEY")?.toString() ?: "DEFAULT_KEY"
        buildConfigField("String", "ANTHROPIC_API_KEY", "\"$anthropicApiKey\"")
    }
    
    buildFeatures {
        buildConfig = true
    }
}
```

### 3. 依賴同步

```bash
# 進入項目目錄
cd AIBudget

# 同步 Gradle
./gradlew sync  # Windows: gradlew.bat sync

# 驗證依賴
./gradlew dependencies
```

### 4. 虛擬設備配置 (Android 模擬器)

#### 創建 AVD (Android Virtual Device)
1. 打開 Android Studio
2. 點擊 `Device Manager`
3. 點擊 `Create Device`
4. 選擇設備配置 (e.g., Pixel 5)
5. 選擇系統鏡像 (建議 Android 14, API 34)
6. 點擊 `Finish`

#### 啟動虛擬設備
```bash
# 列出所有可用 AVD
emulator -list-avds

# 啟動特定 AVD
emulator -avd Pixel_5_API_34 &  # &表示後台運行

# 或在 Android Studio 中點擊 Play 按鈕啟動
```

---

## 🧪 測試與調試

### 1. 在模擬器上運行

#### 方法 1: Android Studio IDE
1. 打開項目
2. 點擊 `Run` → `Run 'app'`
3. 選擇虛擬設備
4. 點擊 `OK`

#### 方法 2: 命令行
```bash
# 構建並安裝到虛擬設備
./gradlew installDebug

# 啟動應用
adb shell am start -n com.aibudget.app/.MainActivity
```

### 2. Logcat 日誌查看

#### Android Studio 中查看日誌
1. 打開 `View` → `Tool Windows` → `Logcat`
2. 過濾日誌級別 (Info, Error, Warning)
3. 使用搜索功能查找特定日誌

#### 命令行查看日誌
```bash
# 清除日誌
adb logcat -c

# 實時監控
adb logcat

# 過濾特定標籤
adb logcat com.aibudget.app:*

# 保存日誌到文件
adb logcat > app.log
```

### 3. Debugger 調試

#### 設置斷點
1. 在代碼行號左側點擊設置斷點
2. 按 `Ctrl+Shift+D` (Windows) 或 `Cmd+Shift+D` (macOS) 啟動 Debug
3. 應用暫停在斷點位置
4. 使用調試工具欄 (Step Over, Step Into, etc.)

#### 檢查變量
- 在 `Variables` 窗口查看局部變量
- 在 `Watches` 中添加監視表達式
- 使用 `Evaluate Expression` 計算表達式

### 4. 單元測試

#### 運行單元測試
```bash
# 運行所有單元測試
./gradlew test

# 運行特定測試類
./gradlew test --tests "com.aibudget.app.data.repository.*"

# 生成測試報告
./gradlew test --continue
# 報告位置: app/build/reports/tests/testDebugUnitTest/index.html
```

#### 編寫測試
```kotlin
// src/test/java/com/aibudget/app/data/repository/ExpenseRepositoryTest.kt
@ExperimentalCoroutinesApi
class ExpenseRepositoryTest {
    
    private lateinit var repository: ExpenseRepository
    private lateinit var mockDao: ExpenseDao
    
    @Before
    fun setup() {
        mockDao = mockk()
        repository = ExpenseRepositoryImpl(mockDao)
    }
    
    @Test
    fun testSaveExpense() = runTest {
        val item = ExpenseItem(...)
        repository.saveExpense(item)
        
        coVerify { mockDao.insertExpense(any()) }
    }
}
```

### 5. UI 自動化測試

```bash
# 運行 Instrumented 測試
./gradlew connectedAndroidTest

# 指定測試
./gradlew connectedAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.aibudget.app.HomeScreenTest
```

---

## 📦 APK 打包

### 1. Debug APK (開發用)

#### 通過 Android Studio
1. 選擇 `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
2. 等待構建完成
3. APK 位置: `app/build/outputs/apk/debug/app-debug.apk`

#### 通過命令行
```bash
./gradlew assembleDebug

# APK 位置
ls app/build/outputs/apk/debug/
```

### 2. Release APK (生產用)

#### 生成簽名密鑰

**首次生成**:
```bash
# 創建密鑰庫
keytool -genkey -v -keystore release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias aibudget_key -storepass password -keypass password

# 驗證密鑰
keytool -list -v -keystore release.keystore -storepass password
```

**密鑰參數**:
```
Key store file path: release.keystore
Key store password: your_secure_password
Key alias: aibudget_key
Key password: same_as_keystore
Validity: 10000 days (27 years)
```

#### 配置簽名信息

在 `build.gradle.kts` 中配置:
```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("../release.keystore")
            storePassword = "your_keystore_password"
            keyAlias = "aibudget_key"
            keyPassword = "your_key_password"
        }
    }
    
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

#### 打包 Release APK
```bash
./gradlew assembleRelease

# APK 位置
ls app/build/outputs/apk/release/

# 驗證簽名
jarsigner -verify -verbose app/build/outputs/apk/release/app-release.apk
```

### 3. App Bundle (Google Play 推薦)

```bash
# 構建 AAB
./gradlew bundleRelease

# Bundle 位置
ls app/build/outputs/bundle/release/
# app-release.aab

# 驗證 Bundle
bundletool-all.jar validate --bundle-path=app-release.aab
```

---

## 📱 真機部署

### 1. 連接安卓設備

#### 啟用開發者模式
1. 設置 → 關於手機 → 連續點擊 7 次「版本號」
2. 返回設置 → 開發者選項 → 啟用 USB 調試

#### 連接 USB
```bash
# 列出已連接設備
adb devices

# 預期輸出
# List of attached devices
# emulator-5554          device
# FA4AL1A03141           device
```

#### 無線調試 (可選)
```bash
# 連接設備和電腦在同一 WiFi
adb connect 192.168.1.100:5555

# 驗證連接
adb devices
```

### 2. 安裝 APK

#### 安裝 Debug APK
```bash
# 自動選擇連接設備
adb install app/build/outputs/apk/debug/app-debug.apk

# 指定設備
adb -s FA4AL1A03141 install app/build/outputs/apk/debug/app-debug.apk

# 強制覆蓋安裝
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

#### 安裝 Release APK
```bash
adb install app/build/outputs/apk/release/app-release.apk
```

### 3. 啟動應用並調試
```bash
# 啟動應用
adb shell am start -n com.aibudget.app/.MainActivity

# 查看日誌
adb logcat | grep com.aibudget.app

# 卸載應用
adb uninstall com.aibudget.app
```

### 4. 文件傳輸

```bash
# 推送文件到設備
adb push local_file.txt /sdcard/Documents/

# 拉取文件
adb pull /sdcard/DCIM/Camera/photo.jpg ./

# 備份應用數據
adb backup com.aibudget.app
```

---

## 🎮 Play Store 發版

### 1. Google Play 開發者帳號

#### 創建帳號
1. 訪問 [Google Play Console](https://play.google.com/console)
2. 登錄或創建 Google 帳號
3. 支付 $25 一次性註冊費
4. 填寫開發者信息

#### 應用簽名設置
1. 進入 `Apps` → `Create App`
2. 填寫應用名稱和主要分類
3. 在 `Setup` → `App signing` 中:
   - 選擇 "Google-managed signing"
   - 上傳 upload key

### 2. 應用信息配置

#### Store Listing
```
Title: AI智慧記帳 (最多 50 字符)
Short Description: 用 AI 快速記帳，自動識別發票金額 (最多 80 字符)
Full Description: 
  AI智慧記帳是一款個人財務管理應用。
  • 拍照識別發票
  • 自動提取金額
  • 分類統計支出
  • 月度圖表展示
  
Category: Finance
Content Rating: Everyone
```

#### 截圖與預覽
需要至少 2 張截圖（最多 8 張）:
1. 首頁截圖 (1080x1920)
2. 拍照識別界面 (1080x1920)
3. 統計圖表界面 (1080x1920)

⚠️ **格式要求**: PNG 或 JPG, 大小 >= 320px, <= 3840px

#### 應用圖標
- 大小: 512x512 px
- 格式: PNG
- 文件大小: <= 1MB

### 3. 發布版本

#### 上傳 APK/AAB
1. 進入 `Release` → `Create new release` → `Production`
2. 上傳 Release APK 或 App Bundle
3. 填寫 Release notes:
```
版本 1.0.0 (2026-02-28)

新增功能:
✨ AI 識別發票功能
✨ 本地記帳管理
✨ 月度統計圖表
✨ 導出 CSV 功能

問題修復:
🐛 修復了某些設備的相機兼容性問題
```

### 4. 前置審查

#### 合規性檢查
- ✅ 隱私政策鏈接
- ✅ 分類準確性
- ✅ 內容分級問卷
- ✅ 目標受眾年齡

#### 權限許可
- ✅ 相機權限 - 用於拍照識別
- ✅ 存儲權限 - 保存圖片和數據
- ✅ 網絡權限 - 調用 Claude API

### 5. 提交審查
1. 檢查所有配置
2. 點擊 "Review"
3. 點擊 "Submit to review"
4. 等待 Google 審查 (通常 1-3 小時)
5. 審查完成後自動上線

---

## 🧪 測試發版

### 1. Google Play 內部測試

```bash
# 創建內部測試通道
# Google Play Console → Release → Internal testing

# 邀請測試用戶 (最多 100 人)
# 提供 Google 帳號或郵箱
```

### 2. Firebase App Distribution (推薦)

```bash
# 安裝 Firebase CLI
npm install -g firebase-tools

# 配置 Firebase 項目
firebase login
firebase init

# 上傳 APK 到 Firebase
firebase appdistribution:distribute app-release.apk \
  --app 1:234567890:android:abcdef123456 \
  --release-notes "Beta v1.0.0" \
  --testers "test@example.com"
```

### 3. TestFlight (iOS, 如適用)

如果要發布 iOS 版本:
```bash
# 通過 Transporter 上傳 IPA
# https://apps.apple.com/app/transporter/id1450874784
```

---

## 🚀 生產部署

### 1. 發布檢查清單

- [ ] 所有功能已測試 (功能測試報告)
- [ ] 性能指標達標 (< 3s 啟動, < 150MB 內存)
- [ ] 沒有已知缺陷 (高優先級)
- [ ] API 密鑰已配置且有效
- [ ] 隱私政策已準備
- [ ] 服務條款已準備
- [ ] 所有翻譯已審核
- [ ] 圖標和截圖已準備

### 2. 版本號管理

遵循 [語義版本控制](https://semver.org/):
```
版本格式: MAJOR.MINOR.PATCH-PRERELEASE+BUILD
例如: 1.0.0, 1.1.0-beta, 1.1.1

MAJOR (主版本): 不兼容的 API 改動
MINOR (次版本): 向後兼容的新功能
PATCH (修訂版本): 向後兼容的問題修復
```

在 `build.gradle.kts` 中更新:
```kotlin
android {
    defaultConfig {
        versionCode = 1      // 遞增整數
        versionName = "1.0.0" // 語義版本
    }
}
```

### 3. 發布流程

```bash
# 1. 創建版本分支
git checkout -b release/1.0.0 develop

# 2. 更新版本號
# 編輯 build.gradle.kts, CHANGELOG.md

# 3. 構建 Release APK
./gradlew assembleRelease

# 4. 測試 Release APK
adb install app/build/outputs/apk/release/app-release.apk

# 5. 創建 Git 標籤
git commit -am "Release v1.0.0"
git tag -a v1.0.0 -m "Release version 1.0.0"

# 6. 推送到遠程
git push origin release/1.0.0 v1.0.0

# 7. 上傳到 Play Store
# Google Play Console → Release → Create new release

# 8. 監控用戶反饋和崩潰報告
# Google Play Console → Analytics → Crashes & ANRs
```

---

## 🔧 故障排除

### 常見問題與解決方案

#### 1. Gradle 同步失敗
```
錯誤: Could not resolve com.example:library:1.0
原因: 本地 Maven 緩存損壞

解決方案:
./gradlew clean
rm -rf ~/.gradle/caches
./gradlew sync
```

#### 2. 相機權限問題
```kotlin
// 確保在 AndroidManifest.xml 中聲明
<uses-permission android:name="android.permission.CAMERA" />

// 在代碼中動態請求權限
if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
    != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(
        this,
        arrayOf(Manifest.permission.CAMERA),
        CAMERA_PERMISSION_CODE
    )
}
```

#### 3. API 密鑰錯誤
```
錯誤: Missing ANTHROPIC_API_KEY

解決方案:
# 檢查 local.properties
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" >> local.properties

# 重新同步 Gradle
./gradlew sync

# 清除應用數據並重新安裝
adb uninstall com.aibudget.app
./gradlew installDebug
```

#### 4. APK 簽名失敗
```bash
# 檢查密鑰庫
keytool -list -v -keystore release.keystore

# 重新生成密鑰 (如果遺失)
keytool -genkey -v -keystore new.keystore \
  -keyalg RSA -keysize 2048 -validity 10000
```

#### 5. Play Store 審查被拒
```
常見原因:
✗ 應用崩潰 → 提供詳細的設備信息進行調試
✗ 違反隱私政策 → 更新隱私政策文本
✗ 破損的功能 → 確保所有功能正常工作
✗ 不當內容 → 檢查文本和圖像

解決方案:
1. 閱讀 Play Store 的完整拒絕原因
2. 修復問題
3. 上傳新的 APK 版本
4. 重新提交審查
```

---

## 🔄 更新與維護

### 1. 發布更新

#### 小版本更新 (Bug Fix)
```
版本: 1.0.1
Release Notes: 
  - 修復相機在某些設備上的兼容性問題
  - 提高識別準確度
  - 改進用戶界面
```

#### 中版本更新 (新功能)
```
版本: 1.1.0
Release Notes:
  - 新增預算設置功能
  - 新增多月份統計
  - 新增語音記錄
  - 改進性能
```

#### 大版本更新 (重構)
```
版本: 2.0.0
Release Notes:
  - 新 UI 設計
  - 云同步功能
  - 多賬戶支持
  - 深色主題
```

### 2. 監控與分析

#### Google Play Console 監控
- **安裝量**: Acquisition → Installs
- **用戶留存**: Retention → 30-day retention
- **崩潰率**: Vitals → Crashes & ANRs
- **評分**: Ratings → Star ratings

#### Firebase Analytics
```kotlin
// 追蹤事件
FirebaseAnalytics.getInstance(this).logEvent(
    "expense_recognized",
    bundleOf("amount" to 89.0, "category" to "food")
)
```

### 3. 應急處理

#### 應用崩潰處理
1. 立即在 Google Play Console 暫停發布
2. 分析 Crashlytics 報告
3. 修復根本原因
4. 發布修復版本 (vX.X.1)
5. 恢復發布

#### 安全漏洞
1. 立即通知受影響的用戶
2. 發布安全補丁
3. 在隱私政策中披露

---

## 📚 參考文檔

### Android 官方文檔
- [Android Developer Docs](https://developer.android.com/docs)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Android Best Practices](https://developer.android.com/guide)

### 第三方工具文檔
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose/documentation)
- [Room Persistence Library](https://developer.android.com/training/data-storage/room)

### 命令參考
```bash
# 常用 adb 命令速查
adb devices                          # 列出設備
adb install <apk>                   # 安裝 APK
adb uninstall <package>             # 卸載應用
adb shell pm list packages          # 列出已安裝包
adb logcat                           # 查看日誌
adb shell input text "Hello"        # 輸入文本
adb shell am start -n <pkg>/.MainActivity  # 啟動應用
adb push <local> <remote>           # 推送文件
adb pull <remote> <local>           # 拉取文件
```

---

## 🎉 部署完成檢查清單

發版前確認:
- [ ] 所有代碼已提交並推送
- [ ] 版本號已更新
- [ ] Release Notes 已準備
- [ ] APK/AAB 已構建並簽名
- [ ] 測試設備上已驗證
- [ ] Play Store 信息已完整填寫
- [ ] 隱私政策已上傳
- [ ] 圖標和截圖已上傳
- [ ] 內容分級已完成
- [ ] 應用已提交審查

發布後檢查:
- [ ] 監控 Crashlytics 報告
- [ ] 監控用戶評分
- [ ] 響應用戶反饋
- [ ] 準備下一版本計劃

