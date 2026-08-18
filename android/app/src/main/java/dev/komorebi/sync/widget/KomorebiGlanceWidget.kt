package dev.komorebi.sync.widget

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.*
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.provideContent
import androidx.glance.layout.*
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider
import dev.komorebi.sync.ui.theme.KomorebiColors

class KomorebiGlanceWidget : GlanceAppWidget() {

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            GlanceWidgetContent()
        }
    }

    @Composable
    private fun GlanceWidgetContent() {
        Column(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(ColorProvider(KomorebiColors.GlanceBackground))
                .padding(14.dp),
            verticalAlignment = Alignment.Vertical.CenterVertically
        ) {
            // Widget Header Row
            Row(
                modifier = GlanceModifier.fillMaxWidth(),
                verticalAlignment = Alignment.Vertical.CenterVertically
            ) {
                Text(
                    text = "✦ Komorebi Sanctuary",
                    style = TextStyle(
                        color = ColorProvider(KomorebiColors.GoldAccent),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    ),
                    modifier = GlanceModifier.defaultWeight()
                )
                Text(
                    text = "Live ⚡",
                    style = TextStyle(
                        color = ColorProvider(KomorebiColors.TextSecondary),
                        fontSize = 10.sp
                    )
                )
            }

            Spacer(modifier = GlanceModifier.height(8.dp))

            // Partner Energy Status
            Row(
                modifier = GlanceModifier
                    .fillMaxWidth()
                    .background(ColorProvider(KomorebiColors.SurfaceCard))
                    .padding(8.dp),
                verticalAlignment = Alignment.Vertical.CenterVertically
            ) {
                Text(
                    text = "🌸 Mikkie: ⚡ Full Energy! (100%)",
                    style = TextStyle(
                        color = ColorProvider(KomorebiColors.TextPrimary),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                )
            }

            Spacer(modifier = GlanceModifier.height(6.dp))

            // Latest Snap / Whisper
            Text(
                text = "💌 \"Thinking of you today, drink water and rest well! 🌸\"",
                style = TextStyle(
                    color = ColorProvider(KomorebiColors.TextSecondary),
                    fontSize = 11.sp
                ),
                maxLines = 2
            )
        }
    }
}

class KomorebiGlanceReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = KomorebiGlanceWidget()
}
