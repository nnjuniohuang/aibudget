package com.aibudget.app.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.aibudget.app.data.dao.ExpenseDao
import com.aibudget.app.data.models.ExpenseEntity

/**
 * AIBudget 主數據庫
 * 使用 Room ORM 管理 SQLite 數據庫
 */
@Database(
    entities = [ExpenseEntity::class],
    version = 1,
    exportSchema = true
)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun expenseDao(): ExpenseDao
    
    companion object {
        @Volatile
        private var instance: AppDatabase? = null
        
        fun getInstance(context: Context): AppDatabase {
            return instance ?: synchronized(this) {
                instance ?: Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "aibudget.db"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                    .also { instance = it }
            }
        }
    }
}
