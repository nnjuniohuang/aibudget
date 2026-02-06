package com.aibudget.app.di

import android.content.Context
import com.aibudget.app.data.database.AppDatabase
import com.aibudget.app.data.repository.ExpenseRepository
import com.aibudget.app.data.repository.ExpenseRepositoryImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Hilt 依賴注入模塊
 * 提供應用級別的單例依賴
 */
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    
    /**
     * 提供 Room Database 實例
     */
    @Singleton
    @Provides
    fun provideAppDatabase(
        @ApplicationContext context: Context
    ): AppDatabase = AppDatabase.getInstance(context)
    
    /**
     * 提供 ExpenseDao
     */
    @Singleton
    @Provides
    fun provideExpenseDao(database: AppDatabase) = database.expenseDao()
    
    /**
     * 提供 ExpenseRepository
     */
    @Singleton
    @Provides
    fun provideExpenseRepository(
        expenseDao: com.aibudget.app.data.dao.ExpenseDao
    ): ExpenseRepository = ExpenseRepositoryImpl(expenseDao)
}
