package com.aibudget.app.utils

import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import android.provider.MediaStore
import java.io.ByteArrayOutputStream
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * 圖像處理工具函數
 */
object ImageUtils {
    
    /**
     * 將 Bitmap 轉換為 Base64 字符串
     */
    fun bitmapToBase64(bitmap: Bitmap, quality: Int = 85): String {
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)
        val byteArray = outputStream.toByteArray()
        return android.util.Base64.encodeToString(byteArray, android.util.Base64.DEFAULT)
    }
    
    /**
     * 獲取 Uri 對應的 Bitmap
     */
    fun uriToBitmap(context: Context, uri: Uri): Bitmap? {
        return try {
            MediaStore.Images.Media.getBitmap(context.contentResolver, uri)
        } catch (e: Exception) {
            null
        }
    }
    
    /**
     * 創建臨時圖像文件
     */
    fun createImageFile(context: Context): File {
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
        val imageFileName = "JPEG_${timeStamp}_"
        val storageDir = context.cacheDir
        return File.createTempFile(imageFileName, ".jpg", storageDir)
    }
    
    /**
     * 壓縮圖像
     */
    fun compressImage(bitmap: Bitmap, maxWidth: Int = 1024, maxHeight: Int = 1024): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        
        val newWidth: Int
        val newHeight: Int
        
        val scale = Math.min(maxWidth.toFloat() / width, maxHeight.toFloat() / height)
        newWidth = (width * scale).toInt()
        newHeight = (height * scale).toInt()
        
        return Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true)
    }
    
    /**
     * 獲取圖像文件大小（以 KB 為單位）
     */
    fun getImageFileSizeInKB(bitmap: Bitmap): Float {
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 85, outputStream)
        return outputStream.toByteArray().size / 1024f
    }
}
