package com.aibudget.app.data.repository

import com.aibudget.app.data.dao.ExpenseDao
import com.aibudget.app.data.models.ExpenseEntity
import com.aibudget.app.domain.models.ExpenseCategory
import com.aibudget.app.domain.models.ExpenseItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.UUID

/**
 * 支出數據倉庫接口
 * 定義數據訪問操作的抽象
 */
interface ExpenseRepository {
    fun getAllExpenses(): Flow<List<ExpenseItem>>
    fun getExpensesByMonth(year: Int, month: Int): Flow<List<ExpenseItem>>
    suspend fun getExpenseById(id: String): ExpenseItem?
    fun getExpensesByCategory(category: String): Flow<List<ExpenseItem>>
    fun getExpensesByDateRange(startDate: String, endDate: String): Flow<List<ExpenseItem>>
    suspend fun saveExpense(item: ExpenseItem)
    suspend fun updateExpense(item: ExpenseItem)
    suspend fun deleteExpense(id: String)
    suspend fun deleteAllExpenses()
    fun getExpenseCount(): Flow<Int>
    fun getTotalByMonth(year: Int, month: Int): Flow<Double>
}

/**
 * 支出數據倉庫實現
 */
class ExpenseRepositoryImpl(
    private val expenseDao: ExpenseDao
) : ExpenseRepository {
    
    override fun getAllExpenses(): Flow<List<ExpenseItem>> {
        return expenseDao.getAllExpenses().map { entities ->
            entities.map { it.toDomain() }
        }
    }
    
    override fun getExpensesByMonth(year: Int, month: Int): Flow<List<ExpenseItem>> {
        return expenseDao.getExpensesByMonth(year, month).map { entities ->
            entities.map { it.toDomain() }
        }
    }
    
    override suspend fun getExpenseById(id: String): ExpenseItem? {
        return expenseDao.getExpenseById(id)?.toDomain()
    }
    
    override fun getExpensesByCategory(category: String): Flow<List<ExpenseItem>> {
        return expenseDao.getExpensesByCategory(category).map { entities ->
            entities.map { it.toDomain() }
        }
    }
    
    override fun getExpensesByDateRange(startDate: String, endDate: String): Flow<List<ExpenseItem>> {
        return expenseDao.getExpensesByDateRange(startDate, endDate).map { entities ->
            entities.map { it.toDomain() }
        }
    }
    
    override suspend fun saveExpense(item: ExpenseItem) {
        expenseDao.insertExpense(item.toEntity())
    }
    
    override suspend fun updateExpense(item: ExpenseItem) {
        expenseDao.updateExpense(item.toEntity())
    }
    
    override suspend fun deleteExpense(id: String) {
        expenseDao.deleteExpenseById(id)
    }
    
    override suspend fun deleteAllExpenses() {
        expenseDao.deleteAllExpenses()
    }
    
    override fun getExpenseCount(): Flow<Int> {
        return expenseDao.getExpenseCount()
    }
    
    override fun getTotalByMonth(year: Int, month: Int): Flow<Double> {
        return expenseDao.getTotalByMonth(year, month)
    }
    
    // 轉換函數
    private fun ExpenseEntity.toDomain(): ExpenseItem {
        return ExpenseItem(
            id = id,
            store = store,
            amount = amount,
            date = date,
            category = ExpenseCategory.fromString(category),
            note = note,
            createdAt = createdAt,
            updatedAt = updatedAt
        )
    }
    
    private fun ExpenseItem.toEntity(): ExpenseEntity {
        return ExpenseEntity(
            id = id,
            store = store,
            amount = amount,
            date = date,
            category = category.displayName,
            note = note,
            createdAt = createdAt,
            updatedAt = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        )
    }
}
