package dev.komorebi.sync.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.komorebi.sync.ui.theme.KomorebiColors

data class CommissionUi(val id: String, val title: String, val emoji: String, val date: String, val time: String)
data class MessageUi(val id: String, val sender: String, val text: String, val time: String)

@Composable
fun MainAppScreen() {
    var activeTab by remember { mutableStateOf("calendar") }
    var travelerName by remember { mutableStateOf("Mikkie") }
    var energyLevel by remember { mutableFloatStateOf(2f) }
    var isSleeping by remember { mutableStateOf(false) }
    var selectedDay by remember { mutableIntStateOf(18) }
    var quickPlanText by remember { mutableStateOf("") }
    var isProfileOpen by remember { mutableStateOf(false) }

    var commissions by remember {
        mutableStateOf(
            listOf(
                CommissionUi("1", "Genshin 5.0 Co-op Night", "🎮", "2026-08-18", "20:00"),
                CommissionUi("2", "Morning Matcha & Call", "🍵", "2026-08-18", "09:00"),
                CommissionUi("3", "Anniversary Surprise Wish", "🎁", "2026-08-20", "21:00")
            )
        )
    }

    var messages by remember {
        mutableStateOf(
            listOf(
                MessageUi("1", "zian", "Good morning! Did you sleep well? 🌸", "09:15"),
                MessageUi("2", "mikkie", "Yes! Just drinking matcha right now 🍵", "09:18"),
                MessageUi("3", "zian", "Sent you a photo of the sky earlier! ✨", "14:20")
            )
        )
    }

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = KomorebiColors.Surface,
                tonalElevation = 8.dp
            ) {
                NavigationBarItem(
                    selected = activeTab == "calendar",
                    onClick = { activeTab = "calendar" },
                    icon = { Text("📅", fontSize = 16.sp) },
                    label = { Text("Calendar", fontSize = 11.sp) }
                )
                NavigationBarItem(
                    selected = activeTab == "chat",
                    onClick = { activeTab = "chat" },
                    icon = { Text("💬", fontSize = 16.sp) },
                    label = { Text("Messages", fontSize = 11.sp) }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { /* Photo snap sheet */ },
                    icon = { Text("📷", fontSize = 16.sp, color = KomorebiColors.TealPrimary) },
                    label = { Text("Snap", fontSize = 11.sp) }
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { isProfileOpen = true },
                    icon = { Text("👤", fontSize = 16.sp) },
                    label = { Text("Profile", fontSize = 11.sp) }
                )
            }
        },
        containerColor = KomorebiColors.Background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // App Top Bar
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "KOMOREBI",
                        color = Color.White,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.sp
                    )
                    Text(
                        text = "Sanctuary: $travelerName × Zian",
                        color = KomorebiColors.TextSecondary,
                        fontSize = 11.sp
                    )
                }

                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = Color.White.copy(alpha = 0.08f),
                    modifier = Modifier.clickable {
                        travelerName = if (travelerName == "Mikkie") "Zian" else "Mikkie"
                    }
                ) {
                    Text(
                        text = "🔄 Switch",
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                    )
                }
            }

            if (activeTab == "calendar") {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 16.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    // Energy & Presence Card
                    item {
                        Card(
                            shape = RoundedCornerShape(18.dp),
                            colors = CardDefaults.cardColors(containerColor = KomorebiColors.Surface)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .size(44.dp)
                                            .clip(CircleShape)
                                            .background(KomorebiColors.GoldAccent)
                                    )
                                    Spacer(modifier = Modifier.width(12.dp))
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(text = travelerName, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                                        Text(
                                            text = if (energyLevel <= 2) "🥱 I'm tired (${(energyLevel * 10).toInt()}%)" else "⚡ Energetic (${(energyLevel * 10).toInt()}%)",
                                            color = KomorebiColors.TealPrimary,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.SemiBold
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.height(10.dp))
                                Slider(
                                    value = energyLevel,
                                    onValueChange = { energyLevel = it },
                                    valueRange = 1f..10f,
                                    steps = 8,
                                    colors = SliderDefaults.colors(
                                        thumbColor = Color.White,
                                        activeTrackColor = KomorebiColors.TealPrimary
                                    )
                                )
                            }
                        }
                    }

                    // Direct Tap-to-Post Inline Input
                    item {
                        Card(
                            shape = RoundedCornerShape(18.dp),
                            colors = CardDefaults.cardColors(containerColor = KomorebiColors.Surface)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Text(
                                    text = "Commissions • August $selectedDay",
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    OutlinedTextField(
                                        value = quickPlanText,
                                        onValueChange = { quickPlanText = it },
                                        placeholder = { Text("➕ Add plan for Aug $selectedDay...", fontSize = 12.sp) },
                                        modifier = Modifier.weight(1f),
                                        singleLine = true
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Button(
                                        onClick = {
                                            if (quickPlanText.isNotBlank()) {
                                                commissions = commissions + CommissionUi(
                                                    System.currentTimeMillis().toString(),
                                                    quickPlanText.trim(),
                                                    "🌸",
                                                    "2026-08-$selectedDay",
                                                    "20:00"
                                                )
                                                quickPlanText = ""
                                            }
                                        },
                                        colors = ButtonDefaults.buttonColors(containerColor = KomorebiColors.TealPrimary)
                                    ) {
                                        Text("Add", color = Color.Black, fontWeight = FontWeight.Bold)
                                    }
                                }
                            }
                        }
                    }

                    // Commissions list
                    items(commissions) { comm ->
                        Card(
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = KomorebiColors.SurfaceElevated)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(text = comm.emoji, fontSize = 20.sp)
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(text = comm.title, color = Color.White, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                                    Text(text = "${comm.date} • ${comm.time}", color = KomorebiColors.TextSecondary, fontSize = 11.sp)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
