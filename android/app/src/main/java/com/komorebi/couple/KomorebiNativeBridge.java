package com.komorebi.couple;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.widget.RemoteViews;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class KomorebiNativeBridge {

    public static final String CHANNEL_ID = "komorebi_sanctuary_channel";
    public static final String CHANNEL_NAME = "Komorebi Sanctuary Live Alerts";
    public static final String LOCKSCREEN_CHANNEL_ID = "komorebi_lockscreen_glance_channel";
    public static final String LOCKSCREEN_CHANNEL_NAME = "Komorebi Live Lockscreen Glance";
    private static final int NOTIF_REQ_CODE = 1001;
    public static final int LOCKSCREEN_NOTIF_ID = 7777;

    private final Activity activity;

    public KomorebiNativeBridge(Activity activity) {
        this.activity = activity;
        createNotificationChannel();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = activity.getSystemService(NotificationManager.class);
            if (manager != null) {
                // Channel 1: High Importance Sound & Vibrations for incoming alerts
                NotificationChannel channel = new NotificationChannel(
                        CHANNEL_ID,
                        CHANNEL_NAME,
                        NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("Incoming messages, shared photos, and sanctuary updates from your partner");
                channel.enableLights(true);
                channel.enableVibration(true);
                channel.setShowBadge(true);
                manager.createNotificationChannel(channel);

                // Channel 2: Live Lockscreen Glance Card (Silent & Ongoing)
                NotificationChannel lockscreenChannel = new NotificationChannel(
                        LOCKSCREEN_CHANNEL_ID,
                        LOCKSCREEN_CHANNEL_NAME,
                        NotificationManager.IMPORTANCE_LOW
                );
                lockscreenChannel.setDescription("Permanent live lockscreen companion card showing partner's photo, mood, and notes");
                lockscreenChannel.setShowBadge(false);
                lockscreenChannel.enableVibration(false);
                lockscreenChannel.setSound(null, null);
                manager.createNotificationChannel(lockscreenChannel);
            }
        }
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
    public void requestPinWidget() {
        activity.runOnUiThread(() -> {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    AppWidgetManager appWidgetManager = activity.getSystemService(AppWidgetManager.class);
                    ComponentName myProvider = new ComponentName(activity, KomorebiWidgetProvider.class);
                    if (appWidgetManager != null && appWidgetManager.isRequestPinAppWidgetSupported()) {
                        Intent pinnedWidgetCallbackIntent = new Intent(activity, MainActivity.class);
                        PendingIntent successCallback = PendingIntent.getActivity(
                                activity,
                                0,
                                pinnedWidgetCallbackIntent,
                                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                        );
                        appWidgetManager.requestPinAppWidget(myProvider, null, successCallback);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
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
                    .setSmallIcon(R.drawable.ic_launcher)
                    .setContentTitle(title != null && !title.isEmpty() ? title : "✦ Komorebi Sanctuary")
                    .setContentText(message != null && !message.isEmpty() ? message : "New sanctuary update from your partner")
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(message != null && !message.isEmpty() ? message : "New sanctuary update from your partner"))
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
    public void updateWidget(String jsonData) {
        try {
            JSONObject obj = new JSONObject(jsonData);
            SharedPreferences prefs = activity.getSharedPreferences(KomorebiWidgetProvider.PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();

            final String whisper = obj.optString("whisper", "Thinking of you today! 🌸");
            final String partnerName = obj.optString("partnerName", "Mikkie");
            final int energy = obj.optInt("energy", 3);
            final String moodLabel = obj.optString("moodLabel", "Joyful");
            final String syncTime = obj.optString("lastUpdated", "Live ⚡");
            final String photoUrl = obj.optString("photoUrl", "");

            editor.putString(KomorebiWidgetProvider.PREF_WHISPER_NOTE, whisper);
            editor.putString(KomorebiWidgetProvider.PREF_PARTNER_NAME, partnerName);
            editor.putInt(KomorebiWidgetProvider.PREF_ENERGY, energy);
            editor.putString(KomorebiWidgetProvider.PREF_MOOD_LABEL, moodLabel);
            editor.putString(KomorebiWidgetProvider.PREF_TIME, syncTime);
            editor.apply();

            if (photoUrl != null && !photoUrl.isEmpty()) {
                new Thread(() -> {
                    try {
                        File cacheDir = activity.getCacheDir();
                        File photoFile = new File(cacheDir, "komorebi_latest_snap.png");

                        if (photoUrl.startsWith("data:image")) {
                            int commaIndex = photoUrl.indexOf(',');
                            if (commaIndex != -1) {
                                String base64Data = photoUrl.substring(commaIndex + 1);
                                byte[] decodedBytes = Base64.decode(base64Data, Base64.DEFAULT);
                                FileOutputStream fos = new FileOutputStream(photoFile);
                                fos.write(decodedBytes);
                                fos.flush();
                                fos.close();

                                SharedPreferences.Editor pEdit = prefs.edit();
                                pEdit.putString(KomorebiWidgetProvider.PREF_PHOTO_PATH, photoFile.getAbsolutePath());
                                pEdit.apply();
                            }
                        } else if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
                            URL url = new URL(photoUrl);
                            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                            conn.setConnectTimeout(8000);
                            conn.setReadTimeout(8000);
                            conn.connect();
                            InputStream is = conn.getInputStream();
                            Bitmap bmp = BitmapFactory.decodeStream(is);
                            is.close();

                            if (bmp != null) {
                                FileOutputStream fos = new FileOutputStream(photoFile);
                                bmp.compress(Bitmap.CompressFormat.PNG, 90, fos);
                                fos.flush();
                                fos.close();

                                SharedPreferences.Editor pEdit = prefs.edit();
                                pEdit.putString(KomorebiWidgetProvider.PREF_PHOTO_PATH, photoFile.getAbsolutePath());
                                pEdit.apply();
                            }
                        }

                        activity.runOnUiThread(() -> {
                            KomorebiWidgetProvider.updateAllWidgets(activity);
                            postLockscreenGlanceNotification(partnerName, moodLabel, whisper, energy, syncTime, photoFile.getAbsolutePath());
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                        activity.runOnUiThread(() -> {
                            KomorebiWidgetProvider.updateAllWidgets(activity);
                            postLockscreenGlanceNotification(partnerName, moodLabel, whisper, energy, syncTime, null);
                        });
                    }
                }).start();
            } else {
                KomorebiWidgetProvider.updateAllWidgets(activity);
                postLockscreenGlanceNotification(partnerName, moodLabel, whisper, energy, syncTime, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void postLockscreenGlanceNotification(String partnerName, String moodLabel, String whisper, int energy, String syncTime, String photoPath) {
        try {
            Intent intent = new Intent(activity, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            PendingIntent pendingIntent = PendingIntent.getActivity(
                    activity,
                    7777,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            RemoteViews remoteViews = new RemoteViews(activity.getPackageName(), R.layout.komorebi_widget);
            remoteViews.setTextViewText(R.id.widget_title, "✦ Komorebi Live");
            remoteViews.setTextViewText(R.id.widget_time_text, partnerName + " • " + syncTime);
            remoteViews.setTextViewText(R.id.widget_partner_title, partnerName + " • " + moodLabel);
            remoteViews.setTextViewText(R.id.widget_energy_pill, (energy * 10) + "% Energy");
            remoteViews.setTextViewText(R.id.widget_whisper_text, "💌 " + whisper);

            if (photoPath != null && !photoPath.isEmpty()) {
                File imgFile = new File(photoPath);
                if (imgFile.exists()) {
                    Bitmap bmp = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                    if (bmp != null) {
                        remoteViews.setImageViewBitmap(R.id.widget_photo_img, bmp);
                    }
                }
            }

            NotificationCompat.Builder builder = new NotificationCompat.Builder(activity, LOCKSCREEN_CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_launcher)
                    .setCustomContentView(remoteViews)
                    .setCustomBigContentView(remoteViews)
                    .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                    .setOngoing(true)
                    .setPriority(NotificationCompat.PRIORITY_MAX)
                    .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                    .setContentIntent(pendingIntent);

            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(activity);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                    notificationManager.notify(LOCKSCREEN_NOTIF_ID, builder.build());
                }
            } else {
                notificationManager.notify(LOCKSCREEN_NOTIF_ID, builder.build());
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
