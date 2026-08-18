package dev.komorebi.sync.ui.theme

import androidx.compose.material3.darkColorScheme
import androidx.compose.ui.graphics.Color

object KomorebiColors {
    val Background = Color(0xFF090B10)
    val Surface = Color(0xFF111520)
    val SurfaceCard = Color(0xFF161A26)
    val SurfaceElevated = Color(0xFF1C2232)

    val GoldAccent = Color(0xFFE3B342)
    val GoldAccentLight = Color(0xFFF7D57F)
    val TealPrimary = Color(0xFF4CD7B6)

    val TextPrimary = Color(0xFFFFFFFF)
    val TextSecondary = Color(0xFF9AA0B4)
    val TextTertiary = Color(0xFF6B7280)

    val Border = Color(0xFF1E2333)
    val GlanceBackground = Color(0xEE121622)
}

val KomorebiDarkColorScheme = darkColorScheme(
    primary = KomorebiColors.TealPrimary,
    secondary = KomorebiColors.GoldAccent,
    background = KomorebiColors.Background,
    surface = KomorebiColors.Surface,
    onPrimary = Color(0xFF090B10),
    onBackground = KomorebiColors.TextPrimary,
    onSurface = KomorebiColors.TextPrimary
)
