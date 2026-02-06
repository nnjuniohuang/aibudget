resources {
    // 代碼混淆規則 - 保留重要類和方法
    
    # Anthropic SDK
    -keep class com.anthropic.** { *; }
    -dontwarn com.anthropic.**

    # Kotlin
    -keep class kotlin.** { *; }
    -keepclassmembers class kotlin.** { *; }
    -dontwarn kotlin.**
    -keepclasseswithmembers class kotlin.** {
        native <methods>;
    }

    # Coroutines
    -keep class kotlinx.coroutines.** { *; }
    -dontwarn kotlinx.coroutines.**

    # Retrofit
    -keep class retrofit2.** { *; }
    -keepattributes Signature, InnerClasses, EnclosingMethod
    -keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations
    -keepattributes AnnotationDefault
    -dontwarn retrofit2.**
    -dontwarn javax.annotation.**
    -dontwarn org.codehaus.mojo.animal_sniffer.*

    # OkHttp
    -keep class okhttp3.** { *; }
    -keep class okio.** { *; }
    -dontwarn okhttp3.**
    -dontwarn okio.**
    -dontwarn javax.annotation.**
    -dontwarn org.conscrypt.**

    # Hilt
    -keep class com.google.dagger.hilt.** { *; }
    -keepattributes Signature
    -dontwarn com.google.dagger.hilt.**

    # Room
    -keep class androidx.room.** { *; }
    -keep @androidx.room.Entity class * { *; }
    -keep @androidx.room.Dao class * { *; }
    -keep @androidx.room.Database class * { *; }
    -dontwarn androidx.room.**

    # JSON Serialization
    -keep class kotlinx.serialization.** { *; }
    -keepattributes *Annotation*, InnerClasses
    -dontwarn kotlinx.serialization.**

    # Jetpack Compose
    -keep class androidx.compose.** { *; }
    -dontwarn androidx.compose.**

    # Keep our app classes
    -keep class com.aibudget.app.** { *; }
    -keep interface com.aibudget.app.** { *; }
    -keepclassmembers class com.aibudget.app.** {
        public *;
    }

    # Keep enum classes
    -keepclassmembers enum * {
        public static **[] values();
        public static ** valueOf(java.lang.String);
    }

    # Keep class and method names for debugging (optional)
    -keepattributes SourceFile, LineNumberTable
    -renamesourcefileattribute SourceFile

    # Don't warn about missing v4 support library classes
    -dontwarn androidx.v4.**
}
