package com.aibudget.app.data.models

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey

/**
 * 支出項目 - Room Database Entity
 * 與數據庫表映射
 */
@Entity(
    tableName = "expenses",
    indices = [
        Index("date"),
        Index("category"),
        Index("created_at")
    ]
)
data class ExpenseEntity(
    @PrimaryKey
    val id: String,
    val store: String,
    val amount: Double,
    val date: String,              // YYYY-MM-DD
    val category: String,
    val note: String? = null,
    val createdAt: String,         // ISO 8601
    val updatedAt: String          // ISO 8601
)
