package dev.komorebi.sync.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import dev.komorebi.sync.data.local.dao.KomorebiDao
import dev.komorebi.sync.data.local.entities.CommissionEntity
import dev.komorebi.sync.data.local.entities.MessageEntity
import dev.komorebi.sync.data.local.entities.ProfileEntity
import dev.komorebi.sync.data.local.entities.SnapEntity

@Database(
    entities = [
        ProfileEntity::class,
        CommissionEntity::class,
        SnapEntity::class,
        MessageEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class KomorebiDatabase : RoomDatabase() {
    abstract fun dao(): KomorebiDao
}
