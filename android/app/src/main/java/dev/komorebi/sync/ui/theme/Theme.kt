package dev.komorebi.sync.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

@Composable
fun KomorebiTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = KomorebiDarkColorScheme,
        content = content
    )
}
