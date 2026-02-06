package com.aibudget.app.utils

import java.time.LocalDate
import java.time.YearMonth
import java.time.format.DateTimeFormatter

/**
 * 日期工具函數
 */
object DateUtils {
    
    private val dateFormatter = DateTimeFormatter.ISO_DATE
    private val displayFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    private val monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM")
    
    /**
     * 獲取今天日期（YYYY-MM-DD 格式）
     */
    fun todayYmd(): String {
        return LocalDate.now().format(dateFormatter)
    }
    
    /**
     * 獲取當前月份（YYYY-MM 格式）
     */
    fun currentMonthYm(): String {
        return LocalDate.now().format(monthFormatter)
    }
    
    /**
     * 獲取當前年月信息
     */
    fun currentYearMonth(): Pair<Int, Int> {
        val now = LocalDate.now()
        return Pair(now.year, now.monthValue)
    }
    
    /**
     * 檢查兩個日期是否在同一個月
     */
    fun isSameMonth(date1: String, date2: String): Boolean {
        return try {
            val d1 = LocalDate.parse(date1, dateFormatter)
            val d2 = LocalDate.parse(date2, dateFormatter)
            YearMonth.from(d1) == YearMonth.from(d2)
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * 解析日期字符串為 LocalDate
     */
    fun parseDate(dateString: String): LocalDate? {
        return try {
            LocalDate.parse(dateString, dateFormatter)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * 格式化 LocalDate 為字符串
     */
    fun formatDate(date: LocalDate): String {
        return date.format(dateFormatter)
    }
}
