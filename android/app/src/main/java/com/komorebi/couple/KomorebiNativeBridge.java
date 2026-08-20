package com.komorebi.couple;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.webkit.JavascriptInterface;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

public class KomorebiNativeBridge {

    public static final String CHANNEL_ID = "komorebi_sanctuary_channel";
    public static final String CHANNEL_NAME = "Komorebi Sanctuary Live Alerts";
    private static final int NOTIF_REQ_CODE = 1001;

    private final Activity activity;

    public KomorebiNativeBridge(Activity activity) {
        this.activity = activity;
        createNotificationChannel();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = activity.getSystemService(NotificationManager.class);
            if (manager != null) {
                // Clear any leftover obsolete lockscreen glance notification channels
                try {
                    manager.cancel(7777);
                    manager.deleteNotificationChannel("komorebi_lockscreen_glance_channel");
                } catch (Exception ignored) {}

                // Clean High-Importance Notification Channel for Messages, Photos, and Pings
                NotificationChannel channel = new NotificationChannel(
                        CHANNEL_ID,
                        CHANNEL_NAME,
                        NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("Incoming messages, shared photos, and sanctuary updates from your partner");
                channel.enableLights(true);
                channel.enableVibration(true);
                channel.setShowBadge(true);
                channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
                manager.createNotificationChannel(channel);
            }
        }
    }

    @JavascriptInterface
    public void openNotificationSettings() {
        activity.runOnUiThread(() -> {
            try {
                Intent intent = new Intent();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    intent.setAction(android.provider.Settings.ACTION_APP_NOTIFICATION_SETTINGS);
                    intent.putExtra(android.provider.Settings.EXTRA_APP_PACKAGE, activity.getPackageName());
                } else {
                    intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    intent.setData(Uri.fromParts("package", activity.getPackageName(), null));
                }
                activity.startActivity(intent);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @JavascriptInterface
    public void requestNotificationPermission() {
        activity.runOnUiThread(() -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIF_REQ_CODE);
                }
            }
        });
    }

    @JavascriptInterface
    public void showSystemNotification(String title, String message, String type) {
        try {
            Intent intent = new Intent(activity, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            PendingIntent pendingIntent = PendingIntent.getActivity(
                    activity,
                    (int) (System.currentTimeMillis() & 0xfffffff),
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

            NotificationCompat.Builder builder = new NotificationCompat.Builder(activity, CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_notification_komorebi)
                    .setColor(0xFFF8CF65)
                    .setContentTitle(title != null && !title.isEmpty() ? title : "✦ Komorebi Sanctuary")
                    .setContentText(message != null && !message.isEmpty() ? message : "New update from your partner")
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(message != null && !message.isEmpty() ? message : "New update from your partner"))
                    .setPriority(NotificationCompat.PRIORITY_MAX)
                    .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                    .setDefaults(NotificationCompat.DEFAULT_ALL)
                    .setSound(defaultSoundUri)
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent);

            if ("photo".equalsIgnoreCase(type)) {
                builder.setCategory(NotificationCompat.CATEGORY_SOCIAL);
            } else {
                builder.setCategory(NotificationCompat.CATEGORY_MESSAGE);
            }

            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(activity);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                    notificationManager.notify((int) (System.currentTimeMillis() & 0xfffffff), builder.build());
                }
            } else {
                notificationManager.notify((int) (System.currentTimeMillis() & 0xfffffff), builder.build());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void minimizeApp() {
        activity.runOnUiThread(() -> activity.moveTaskToBack(true));
    }

    @JavascriptInterface
    public void closeApp() {
        activity.runOnUiThread(() -> activity.finishAffinity());
    }
}

