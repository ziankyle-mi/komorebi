package dev.komorebi.sync.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "profiles")
data class ProfileEntity(
    @PrimaryKey val id: String,
    val name: String,
    val uid: String,
    val avatarId: String,
    val avatarUrl: String,
    val energyLevel: Int, // 1 to 10
    val isSleeping: Boolean,
    val whisperNote: String,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "commissions")
data class CommissionEntity(
    @PrimaryKey val id: String,
    val title: String,
    val emoji: String,
    val date: String, // YYYY-MM-DD
    val time: String, // HH:MM
    val type: String,
    val assignedTo: String,
    val createdBy: String,
    val isWishSealed: Boolean,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "snaps")
data class SnapEntity(
    @PrimaryKey val id: String,
    val imageUrl: String,
    val caption: String,
    val sentBy: String,
    val time: String,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "messages")
data class MessageEntity(
    @PrimaryKey val id: String,
    val sender: String,
    val text: String,
    val time: String,
    val createdAt: Long = System.currentTimeMillis()
)
