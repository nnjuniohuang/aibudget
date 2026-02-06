package com.aibudget.app.utils

import java.util.UUID

/**
 * ID 生成工具
 */
object IdUtils {
    
    /**
     * 生成新的 UUID
     */
    fun generateId(): String {
        return UUID.randomUUID().toString()
    }
}
