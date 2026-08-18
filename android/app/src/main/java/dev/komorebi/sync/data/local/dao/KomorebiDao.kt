package dev.komorebi.sync.data.local.dao

import androidx.room.*
import dev.komorebi.sync.data.local.entities.CommissionEntity
import dev.komorebi.sync.data.local.entities.MessageEntity
import dev.komorebi.sync.data.local.entities.ProfileEntity
import dev.komorebi.sync.data.local.entities.SnapEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface KomorebiDao {

    // Profile & Presence
    @Query("SELECT * FROM profiles WHERE id = :id LIMIT 1")
    fun getProfileFlow(id: String): Flow<ProfileEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertProfile(profile: ProfileEntity)

    // Commissions & Calendar
    @Query("SELECT * FROM commissions ORDER BY date ASC, time ASC")
    fun getAllCommissionsFlow(): Flow<List<CommissionEntity>>

    @Query("SELECT * FROM commissions WHERE date = :date ORDER BY time ASC")
    fun getCommissionsByDateFlow(date: String): Flow<List<CommissionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertCommission(commission: CommissionEntity)

    @Delete
    suspend fun deleteCommission(commission: CommissionEntity)

    // Photo Snaps
    @Query("SELECT * FROM snaps ORDER BY createdAt DESC LIMIT 1")
    fun getLatestSnapFlow(): Flow<SnapEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSnap(snap: SnapEntity)

    // Messages
    @Query("SELECT * FROM messages ORDER BY createdAt ASC")
    fun getAllMessagesFlow(): Flow<List<MessageEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMessage(message: MessageEntity)
}
