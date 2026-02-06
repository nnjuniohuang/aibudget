package com.aibudget.app.utils

import java.text.NumberFormat
import java.util.Locale

/**
 * 金額相關工具函數
 */
object MoneyUtils {
    
    private val formatter = NumberFormat.getCurrencyInstance(Locale.TAIWAN)
    
    /**
     * 格式化金額為台幣字符串
     * @param amount 金額（數字）
     * @return 格式化後的字符串，例如 "NT$100"
     */
    fun formatMoney(amount: Double): String {
        return formatter.format(amount)
    }
    
    /**
     * 格式化金額為簡潔格式
     * @param amount 金額
     * @return 簡潔格式，例如 "100"
     */
    fun formatMoneySimple(amount: Double): String {
        return String.format("%.0f", amount)
    }
    
    /**
     * 格式化金額為帶兩位小數的格式
     * @param amount 金額
     * @return 例如 "100.00"
     */
    fun formatMoneyWithDecimal(amount: Double): String {
        return String.format("%.2f", amount)
    }
    
    /**
     * 檢查金額是否有效
     */
    fun isValidAmount(amount: Double): Boolean {
        return amount >= 0
    }
}
