# AI 智慧記帳 Android 版 - 開發進度追蹤

**項目名稱**: AIBudget Android App  
**狀態**: 規劃階段  
**上次更新**: 2026-01-31  
**下次檢查**: 2026-02-01

---

## 📊 整體進度

```
[████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 10%

已完成: 規劃與技術規格定義
進行中: 環境搭建與初始化
待進行: 功能開發 (6 週)
```

---

## 🎯 Phase 1: 項目搭建與基礎框架 (Week 1-2)

### Week 1: 環境配置與項目初始化

#### Task 1.1: Android Studio 環境配置
- [ ] 安裝 Android Studio 最新版本
- [ ] 配置 Android SDK (API 26-34)
- [ ] 配置 Gradle 8.2+
- [ ] 驗證開發環境

**預期完成時間**: 2026-02-01  
**負責人**: 開發團隊  
**優先級**: 🔴 高

---

#### Task 1.2: 創建 Kotlin 項目
```bash
# 使用 Android Studio 創建新項目或從命令行
android create project --target android-34 --name AIBudget \
  --path ./AIBudget --package com.aibudget.app --activity MainActivity
```

- [ ] 新建項目 (Kotlin, Jetpack Compose)
- [ ] 配置 build.gradle.kts
- [ ] 添加依賴庫 (Hilt, Room, Retrofit, etc.)
- [ ] 初始化 Git 版本控制

**預期完成時間**: 2026-02-01  
**檔案清單**:
- `build.gradle.kts` (app module)
- `build.gradle.kts` (project level)
- `settings.gradle.kts`
- `.gitignore`

**優先級**: 🔴 高

---

#### Task 1.3: 依賴庫配置
```kotlin
// build.gradle.kts (app)
dependencies {
    // Core
    implementation("androidx.core:core:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    
    // Jetpack Compose
    implementation("androidx.compose.ui:ui:1.6.0")
    implementation("androidx.compose.material3:material3:1.1.0")
    implementation("androidx.compose.foundation:foundation:1.6.0")
    
    // Hilt DI
    implementation("com.google.dagger:hilt-android:2.48")
    kapt("com.google.dagger:hilt-compiler:2.48")
    
    // Room Database
    implementation("androidx.room:room-runtime:2.6.0")
    implementation("androidx.room:room-ktx:2.6.0")
    kapt("androidx.room:room-compiler:2.6.0")
    
    // Retrofit + OkHttp
    implementation("com.squareup.retrofit2:retrofit:2.10.0")
    implementation("com.squareup.retrofit2:converter-kotlinx-serialization:2.10.0")
    implementation("com.squareup.okhttp3:okhttp:4.11.0")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.1")
    
    // JSON Serialization
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
    
    // Camera
    implementation("androidx.camera:camera-core:1.3.0")
    implementation("androidx.camera:camera-camera2:1.3.0")
    implementation("androidx.camera:camera-lifecycle:1.3.0")
    implementation("androidx.camera:camera-view:1.3.0")
    
    // Charts
    implementation("com.github.PhilJay:MPAndroidChart:v3.1.0")
    
    // DateTime
    implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.5.0")
    
    // Testing
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
```

- [ ] 添加所有核心依賴
- [ ] 添加測試依賴
- [ ] 同步 Gradle
- [ ] 解決依賴衝突

**預期完成時間**: 2026-02-02  
**優先級**: 🔴 高

---

### Week 2: UI 框架與基礎模塊

#### Task 2.1: 項目結構搭建
```
com/aibudget/app/
├── MainActivity.kt
├── di/
│   └── AppModule.kt
├── data/
│   ├── dao/
│   │   └── ExpenseDao.kt
│   ├── database/
│   │   └── AppDatabase.kt
│   ├── models/
│   │   ├── ExpenseEntity.kt
│   │   └── CategoryEntity.kt
│   └── repository/
│       ├── ExpenseRepository.kt
│       └── ExpenseRepositoryImpl.kt
├── domain/
│   ├── models/
│   │   └── ExpenseItem.kt
│   └── usecases/
│       ├── GetExpensesUseCase.kt
│       ├── SaveExpenseUseCase.kt
│       └── DeleteExpenseUseCase.kt
├── presentation/
│   ├── navigation/
│   │   └── AppNavigation.kt
│   ├── screens/
│   │   ├── HomeScreen.kt
│   │   ├── CameraScreen.kt
│   │   ├── ConfirmScreen.kt
│   │   └── SettingsScreen.kt
│   └── viewmodels/
│       ├── HomeViewModel.kt
│       ├── CameraViewModel.kt
│       └── ExpenseViewModel.kt
└── utils/
    ├── DateUtils.kt
    ├── MoneyUtils.kt
    └── ImageUtils.kt
```

- [ ] 創建包結構
- [ ] 創建基礎文件骨架
- [ ] 配置 Hilt Module

**預期完成時間**: 2026-02-03  
**優先級**: 🔴 高

---

#### Task 2.2: 首頁 UI 設計 (Jetpack Compose)
```kotlin
// screens/HomeScreen.kt
@Composable
fun HomeScreen(
    viewModel: HomeViewModel = hiltViewModel()
) {
    val expenses by viewModel.expenses.collectAsState(initial = emptyList())
    val totalThisMonth by viewModel.totalThisMonth.collectAsState(initial = 0.0)
    val pieData by viewModel.pieData.collectAsState(initial = emptyList())
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // 頂部: 本月總支出
        TotalExpenseCard(total = totalThisMonth)
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // 中部: 餅圖
        ExpensePieChart(data = pieData)
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // 下部: 列表
        ExpenseList(expenses = expenses)
    }
}
```

- [ ] 設計總支出卡片
- [ ] 實現餅圖組件
- [ ] 實現列表組件
- [ ] 添加浮動操作按鈕 (FAB)

**預期完成時間**: 2026-02-05  
**檔案清單**:
- `screens/HomeScreen.kt`
- `components/TotalExpenseCard.kt`
- `components/ExpensePieChart.kt`
- `components/ExpenseList.kt`

**優先級**: 🔴 高

---

#### Task 2.3: 本地數據庫 (Room)
```kotlin
// data/database/AppDatabase.kt
@Database(
    entities = [ExpenseEntity::class, CategoryEntity::class],
    version = 1
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun expenseDao(): ExpenseDao
    abstract fun categoryDao(): CategoryDao
}

// data/dao/ExpenseDao.kt
@Dao
interface ExpenseDao {
    @Query("SELECT * FROM expenses ORDER BY date DESC")
    fun getAllExpenses(): Flow<List<ExpenseEntity>>
    
    @Query("SELECT * FROM expenses WHERE date LIKE :monthPrefix ORDER BY date DESC")
    fun getExpensesByMonth(monthPrefix: String): Flow<List<ExpenseEntity>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExpense(expense: ExpenseEntity)
    
    @Update
    suspend fun updateExpense(expense: ExpenseEntity)
    
    @Delete
    suspend fun deleteExpense(expense: ExpenseEntity)
}

// data/models/ExpenseEntity.kt
@Entity(tableName = "expenses")
data class ExpenseEntity(
    @PrimaryKey val id: String = UUID.randomUUID().toString(),
    val store: String,
    val amount: Double,
    val date: String,
    val category: String,
    val note: String? = null,
    val createdAt: String = System.currentTimeMillis().toString(),
    val updatedAt: String = System.currentTimeMillis().toString()
)
```

- [ ] 創建 ExpenseEntity 數據類
- [ ] 創建 ExpenseDao 接口
- [ ] 配置 Room Database
- [ ] 配置 Hilt 依賴注入

**預期完成時間**: 2026-02-06  
**檔案清單**:
- `data/models/ExpenseEntity.kt`
- `data/dao/ExpenseDao.kt`
- `data/database/AppDatabase.kt`

**優先級**: 🔴 高

---

#### Task 2.4: Repository 層實現
```kotlin
// data/repository/ExpenseRepository.kt
interface ExpenseRepository {
    suspend fun getAllExpenses(): List<ExpenseItem>
    suspend fun getExpensesByMonth(year: Int, month: Int): List<ExpenseItem>
    suspend fun saveExpense(expense: ExpenseItem)
    suspend fun updateExpense(expense: ExpenseItem)
    suspend fun deleteExpense(id: String)
    fun observeExpenses(): Flow<List<ExpenseItem>>
    fun observeExpensesByMonth(year: Int, month: Int): Flow<List<ExpenseItem>>
}

// data/repository/ExpenseRepositoryImpl.kt
@Singleton
class ExpenseRepositoryImpl @Inject constructor(
    private val expenseDao: ExpenseDao
) : ExpenseRepository {
    
    override fun observeExpenses(): Flow<List<ExpenseItem>> {
        return expenseDao.getAllExpenses().map { entities ->
            entities.map { it.toDomain() }
        }
    }
    
    override suspend fun saveExpense(expense: ExpenseItem) {
        expenseDao.insertExpense(expense.toEntity())
    }
    
    // ... 其他方法實現
}
```

- [ ] 定義 Repository 接口
- [ ] 實現 RepositoryImpl
- [ ] 添加 Hilt 綁定
- [ ] 單元測試

**預期完成時間**: 2026-02-07  
**優先級**: 🔴 高

---

## 🔄 Phase 2: AI 功能與相機集成 (Week 3-4)

### Week 3: 相機集成

#### Task 3.1: CameraX 集成
- [ ] 配置相機權限 (運行時)
- [ ] 實現相機預覽
- [ ] 實現拍照功能
- [ ] 圖像保存到臨時存儲

**預期完成時間**: 2026-02-08  
**檔案清單**:
- `screens/CameraScreen.kt`
- `viewmodels/CameraViewModel.kt`
- `utils/ImageUtils.kt`

**優先級**: 🔴 高

---

#### Task 3.2: 相冊選擇功能
- [ ] 實現文件選擇器
- [ ] 支持多種圖像格式
- [ ] 圖像壓縮處理
- [ ] 錯誤處理

**預期完成時間**: 2026-02-09  
**優先級**: 🟠 中

---

#### Task 3.3: Claude AI API 集成
```kotlin
// data/api/ClaudeApiService.kt
interface ClaudeApiService {
    @POST("api/vision/claude")
    suspend fun recognizeExpense(
        @Body request: VisionRequest
    ): VisionResponse
}

data class VisionRequest(
    val imageBase64: String,
    val mediaType: String
)

data class VisionResponse(
    val store: String,
    val amount: Double,
    val date: String,
    val category: String
)
```

- [ ] 配置 Retrofit 客户端
- [ ] 定義 API 請求/響應模型
- [ ] 實現 API 調用
- [ ] 錯誤處理

**預期完成時間**: 2026-02-10  
**優先級**: 🔴 高

---

### Week 4: 識別流程與確認頁面

#### Task 4.1: 識別工作流
- [ ] 上傳圖像到 Claude API
- [ ] 解析 AI 識別結果
- [ ] 進度顯示
- [ ] 錯誤提示與重試

**預期完成時間**: 2026-02-12  
**優先級**: 🔴 高

---

#### Task 4.2: 確認編輯頁面
```kotlin
// screens/ConfirmScreen.kt
@Composable
fun ConfirmScreen(
    recognized: VisionResponse,
    onConfirm: (ExpenseItem) -> Unit,
    onEdit: () -> Unit
) {
    Column {
        // AI 識別結果
        ConfirmCard(
            store = recognized.store,
            amount = recognized.amount,
            date = recognized.date,
            category = recognized.category
        )
        
        // 編輯區域
        EditableFields(...)
        
        // 操作按鈕
        Row {
            Button(onClick = onEdit) { Text("重新拍照") }
            Button(onClick = { onConfirm(...) }) { Text("確認保存") }
        }
    }
}
```

- [ ] 顯示 AI 識別結果
- [ ] 可編輯各字段
- [ ] 確認與保存
- [ ] 返回重新拍照

**預期完成時間**: 2026-02-14  
**優先級**: 🔴 高

---

#### Task 4.3: ViewModel 層
```kotlin
// presentation/viewmodels/ExpenseViewModel.kt
@HiltViewModel
class ExpenseViewModel @Inject constructor(
    private val saveExpenseUseCase: SaveExpenseUseCase,
    private val repository: ExpenseRepository
) : ViewModel() {
    
    private val _expenses = MutableStateFlow<List<ExpenseItem>>(emptyList())
    val expenses: StateFlow<List<ExpenseItem>> = _expenses.asStateFlow()
    
    fun saveExpense(item: ExpenseItem) {
        viewModelScope.launch {
            saveExpenseUseCase(item)
        }
    }
}
```

- [ ] 創建 HomeViewModel
- [ ] 創建 CameraViewModel
- [ ] 創建 ExpenseViewModel
- [ ] 狀態管理

**預期完成時間**: 2026-02-15  
**優先級**: 🔴 高

---

## 🧪 Phase 3: 測試與優化 (Week 5)

#### Task 5.1: 單元測試
- [ ] Repository 層測試
- [ ] ViewModel 層測試
- [ ] 工具函數測試
- [ ] 目標覆蓋率: 70%+

**預期完成時間**: 2026-02-18  
**優先級**: 🟠 中

---

#### Task 5.2: UI 測試
- [ ] 首頁 UI 測試
- [ ] 相機流程測試
- [ ] 編輯功能測試

**預期完成時間**: 2026-02-20  
**優先級**: 🟠 中

---

#### Task 5.3: 性能優化
- [ ] 啟動時間優化 (目標 < 3s)
- [ ] 內存優化 (目標 < 150MB)
- [ ] 列表滾動優化 (目標 60FPS)
- [ ] 電池優化

**預期完成時間**: 2026-02-22  
**優先級**: 🟠 中

---

## 📦 Phase 4: 發版準備 (Week 6)

#### Task 6.1: Play Store 准備
- [ ] 簽名配置
- [ ] APK 打包
- [ ] Google Play 帳號設置
- [ ] 應用商店資訊填寫

**預期完成時間**: 2026-02-24  
**優先級**: 🟠 中

---

#### Task 6.2: 文檔與發版
- [ ] 用戶文檔
- [ ] 部署指南
- [ ] 發版

**預期完成時間**: 2026-02-28  
**優先級**: 🟠 中

---

## 📋 任務清單詳情

### 已完成 ✅
- [x] 項目需求分析
- [x] 技術規格書編寫
- [x] 架構設計
- [x] 進度計劃制定

### 進行中 🔄
- [ ] 環境配置 (預期 2026-02-01)

### 待進行 ⏳
- [ ] 項目初始化
- [ ] UI 框架搭建
- [ ] 數據庫配置
- [ ] 相機集成
- [ ] AI API 集成
- [ ] 完整流程測試
- [ ] 性能優化
- [ ] Play Store 發版

---

## 🚨 風險與應對

| 風險 | 影響 | 概率 | 應對方案 |
|------|------|------|----------|
| API 配額限制 | 無法識別 | 中 | 實現本地緩存、使用重試機制 |
| 相機兼容性 | 某些設備不可用 | 低 | 充分測試多設備、提供備選方案 |
| 數據庫性能 | 大數據量卡頓 | 中 | 實現分頁、數據庫優化 |
| 存儲空間不足 | 應用崩潰 | 低 | 定期清理日誌、提示用戶 |

---

## 📞 溝通與反饋

- **日報**: 每天 EOD 更新進度
- **週會**: 每周一 10:00 進度評審
- **問題跟蹤**: GitHub Issues
- **代碼審查**: 每次 PR 需要審查

---

## 📊 績效指標

| 指標 | 目標 | 當前 | 狀態 |
|------|------|------|------|
| 代碼覆蓋率 | 70% | 0% | 🔴 未開始 |
| 缺陷率 | < 5 per KLOC | - | 🔄 開發中 |
| 構建成功率 | 100% | - | 🔄 開發中 |
| 發版準時率 | 100% | - | 🔄 規劃中 |

