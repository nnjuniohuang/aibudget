package com.aibudget.app.domain.models

/**
 * 支出項目 - Domain Model
 * 代表應用中的單筆記帳記錄
 */
data class ExpenseItem(
    val id: String,                    // UUID
    val store: String,                 // 商店名稱
    val amount: Double,                // 金額（TWD）
    val date: String,                  // 日期（YYYY-MM-DD）
    val category: ExpenseCategory,     // 分類
    val note: String? = null,          // 備註
    val createdAt: String,             // 創建時間（ISO 8601）
    val updatedAt: String              // 更新時間（ISO 8601）
)

/**
 * 支出分類枚舉
 */
enum class ExpenseCategory(val displayName: String, val colorHex: String) {
    FOOD("飲食", "#f97316"),
    TRANSPORT("交通", "#3b82f6"),
    ENTERTAINMENT("娛樂", "#ec4899"),
    SHOPPING("購物", "#a855f7"),
    ESSENTIALS("日用品", "#10b981"),
    HEALTHCARE("醫療", "#ef4444"),
    OTHERS("其他", "#6b7280");

    companion object {
        fun fromString(value: String): ExpenseCategory = when (value) {
            "飲食" -> FOOD
            "交通" -> TRANSPORT
            "娛樂" -> ENTERTAINMENT
            "購物" -> SHOPPING
            "日用品" -> ESSENTIALS
            "醫療" -> HEALTHCARE
            else -> OTHERS
        }
    }
}

/**
 * AI 識別結果 DTO
 */
data class VisionResponse(
    val store: String,
    val amount: Double,
    val date: String,
    val category: String
)
