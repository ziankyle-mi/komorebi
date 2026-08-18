package dev.komorebi.sync

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import dagger.hilt.android.AndroidEntryPoint
import dev.komorebi.sync.ui.MainAppScreen
import dev.komorebi.sync.ui.theme.KomorebiColors
import dev.komorebi.sync.ui.theme.KomorebiTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            KomorebiTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = KomorebiColors.Background
                ) {
                    MainAppScreen()
                }
            }
        }
    }
}
