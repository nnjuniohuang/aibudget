package com.aibudget.app.data.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.aibudget.app.data.models.ExpenseEntity
import kotlinx.coroutines.flow.Flow

/**
 * 支出項目 Data Access Object
 * 提供數據庫操作的接口
 */
@Dao
interface ExpenseDao {
    
    /**
     * 獲取所有支出項目（按日期倒序）
     */
    @Query("SELECT * FROM expenses ORDER BY date DESC, created_at DESC")
    fun getAllExpenses(): Flow<List<ExpenseEntity>>
    
    /**
     * 獲取特定月份的支出項目
     * @param year 年份
     * @param month 月份（1-12）
     */
    @Query("""
        SELECT * FROM expenses 
        WHERE strftime('%Y-%m', date) = printf('%04d-%02d', :year, :month)
        ORDER BY date DESC, created_at DESC
    """)
    fun getExpensesByMonth(year: Int, month: Int): Flow<List<ExpenseEntity>>
    
    /**
     * 根據 ID 獲取單筆支出
     */
    @Query("SELECT * FROM expenses WHERE id = :id")
    suspend fun getExpenseById(id: String): ExpenseEntity?
    
    /**
     * 按分類獲取支出項目
     */
    @Query("SELECT * FROM expenses WHERE category = :category ORDER BY date DESC")
    fun getExpensesByCategory(category: String): Flow<List<ExpenseEntity>>
    
    /**
     * 按日期範圍查詢
     */
    @Query("SELECT * FROM expenses WHERE date BETWEEN :startDate AND :endDate ORDER BY date DESC")
    fun getExpensesByDateRange(startDate: String, endDate: String): Flow<List<ExpenseEntity>>
    
    /**
     * 新增支出
     */
    @Insert
    suspend fun insertExpense(expense: ExpenseEntity): Long
    
    /**
     * 更新支出
     */
    @Update
    suspend fun updateExpense(expense: ExpenseEntity): Int
    
    /**
     * 刪除支出
     */
    @Delete
    suspend fun deleteExpense(expense: ExpenseEntity): Int
    
    /**
     * 根據 ID 刪除支出
     */
    @Query("DELETE FROM expenses WHERE id = :id")
    suspend fun deleteExpenseById(id: String): Int
    
    /**
     * 刪除所有支出
     */
    @Query("DELETE FROM expenses")
    suspend fun deleteAllExpenses(): Int
    
    /**
     * 獲取支出總數
     */
    @Query("SELECT COUNT(*) FROM expenses")
    fun getExpenseCount(): Flow<Int>
    
    /**
     * 獲取月度總支出
     */
    @Query("""
        SELECT COALESCE(SUM(amount), 0.0) FROM expenses 
        WHERE strftime('%Y-%m', date) = printf('%04d-%02d', :year, :month)
    """)
    fun getTotalByMonth(year: Int, month: Int): Flow<Double>
}
