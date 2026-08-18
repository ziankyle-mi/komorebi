package dev.komorebi.sync

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class KomorebiApp : Application() {
    override fun onCreate() {
        super.onCreate()
    }
}
