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
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Base64;
import android.view.View;
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
                channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
                manager.createNotificationChannel(channel);

                // Channel 2: Live Lockscreen Glance Card (Silent & Displayed on Lockscreen)
                NotificationChannel lockscreenChannel = new NotificationChannel(
                        LOCKSCREEN_CHANNEL_ID,
                        LOCKSCREEN_CHANNEL_NAME,
                        NotificationManager.IMPORTANCE_DEFAULT
                );
                lockscreenChannel.setDescription("Permanent live lockscreen companion card showing partner's photo, mood, and notes");
                lockscreenChannel.setShowBadge(false);
                lockscreenChannel.enableVibration(false);
                lockscreenChannel.setSound(null, null);
                lockscreenChannel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
                manager.createNotificationChannel(lockscreenChannel);
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
                    .setSmallIcon(R.drawable.ic_notification_komorebi)
                    .setColor(0xFFF8CF65)
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

    private Bitmap loadBitmapFromSource(String source) {
        if (source == null || source.trim().isEmpty()) return null;
        String trimmed = source.trim();
        try {
            if (trimmed.startsWith("data:image")) {
                int commaIndex = trimmed.indexOf(',');
                if (commaIndex != -1) {
                    String base64Data = trimmed.substring(commaIndex + 1);
                    byte[] decodedBytes = Base64.decode(base64Data, Base64.DEFAULT);
                    return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
                }
            } else if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
                URL url = new URL(trimmed);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(6000);
                conn.setReadTimeout(6000);
                conn.connect();
                InputStream is = conn.getInputStream();
                Bitmap bmp = BitmapFactory.decodeStream(is);
                is.close();
                return bmp;
            } else if (trimmed.startsWith("/") || trimmed.startsWith("file://")) {
                String filePath = trimmed.startsWith("file://") ? trimmed.substring(7) : trimmed;
                File f = new File(filePath);
                if (f.exists()) {
                    return BitmapFactory.decodeFile(f.getAbsolutePath());
                }
            } else {
                // Asset path relative to app assets
                String assetPath = trimmed;
                if (assetPath.startsWith("./")) {
                    assetPath = assetPath.substring(2);
                }
                if (assetPath.startsWith("/")) {
                    assetPath = assetPath.substring(1);
                }
                InputStream is = null;
                try {
                    is = activity.getAssets().open("public/" + assetPath);
                } catch (Exception ignored) {
                    try {
                        is = activity.getAssets().open(assetPath);
                    } catch (Exception ex) {
                        // ignore
                    }
                }
                if (is != null) {
                    Bitmap bmp = BitmapFactory.decodeStream(is);
                    is.close();
                    return bmp;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Bitmap getCircularBitmap(Bitmap src) {
        if (src == null) return null;
        try {
            int width = src.getWidth();
            int height = src.getHeight();
            int size = Math.min(width, height);

            Bitmap output = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(output);

            final Paint paint = new Paint();
            final Rect rect = new Rect(0, 0, size, size);
            final Rect srcRect = new Rect(
                    (width - size) / 2,
                    (height - size) / 2,
                    (width + size) / 2,
                    (height + size) / 2
            );

            paint.setAntiAlias(true);
            canvas.drawARGB(0, 0, 0, 0);
            paint.setColor(Color.WHITE);
            canvas.drawCircle(size / 2f, size / 2f, size / 2f, paint);
            paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
            canvas.drawBitmap(src, srcRect, rect, paint);
            return output;
        } catch (Exception e) {
            e.printStackTrace();
            return src;
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
            final String partnerAvatar = obj.optString("partnerAvatar", "");

            editor.putString(KomorebiWidgetProvider.PREF_WHISPER_NOTE, whisper);
            editor.putString(KomorebiWidgetProvider.PREF_PARTNER_NAME, partnerName);
            editor.putInt(KomorebiWidgetProvider.PREF_ENERGY, energy);
            editor.putString(KomorebiWidgetProvider.PREF_MOOD_LABEL, moodLabel);
            editor.putString(KomorebiWidgetProvider.PREF_TIME, syncTime);
            editor.apply();

            new Thread(() -> {
                try {
                    String photoSavedPath = null;
                    if (photoUrl != null && !photoUrl.trim().isEmpty()) {
                        File cacheDir = activity.getCacheDir();
                        File photoFile = new File(cacheDir, "komorebi_latest_snap.png");
                        Bitmap snapBmp = loadBitmapFromSource(photoUrl);
                        if (snapBmp != null) {
                            FileOutputStream fos = new FileOutputStream(photoFile);
                            snapBmp.compress(Bitmap.CompressFormat.PNG, 90, fos);
                            fos.flush();
                            fos.close();
                            photoSavedPath = photoFile.getAbsolutePath();

                            SharedPreferences.Editor pEdit = prefs.edit();
                            pEdit.putString(KomorebiWidgetProvider.PREF_PHOTO_PATH, photoSavedPath);
                            pEdit.apply();
                        }
                    } else {
                        // Clear photo path preference if no photo is attached
                        SharedPreferences.Editor pEdit = prefs.edit();
                        pEdit.remove(KomorebiWidgetProvider.PREF_PHOTO_PATH);
                        pEdit.apply();
                    }

                    Bitmap avatarBmp = null;
                    if (partnerAvatar != null && !partnerAvatar.trim().isEmpty()) {
                        avatarBmp = loadBitmapFromSource(partnerAvatar);
                    }

                    final String finalPhotoPath = photoSavedPath;
                    final Bitmap finalAvatarBmp = avatarBmp;

                    activity.runOnUiThread(() -> {
                        KomorebiWidgetProvider.updateAllWidgets(activity);
                        postLockscreenGlanceNotification(partnerName, moodLabel, whisper, energy, syncTime, finalPhotoPath, finalAvatarBmp);
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    activity.runOnUiThread(() -> {
                        KomorebiWidgetProvider.updateAllWidgets(activity);
                        postLockscreenGlanceNotification(partnerName, moodLabel, whisper, energy, syncTime, null, null);
                    });
                }
            }).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void postLockscreenGlanceNotification(String partnerName, String moodLabel, String whisper, int energy, String syncTime, String photoPath, Bitmap avatarBitmap) {
        try {
            Intent intent = new Intent(activity, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

            PendingIntent pendingIntent = PendingIntent.getActivity(
                    activity,
                    7777,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            // 1. Expanded Notification Layout (Big View)
            RemoteViews remoteViewsBig = new RemoteViews(activity.getPackageName(), R.layout.komorebi_notification);
            remoteViewsBig.setTextViewText(R.id.notif_partner_title, partnerName + " • " + moodLabel);
            remoteViewsBig.setTextViewText(R.id.notif_time_text, "✦ Komorebi Sanctuary • " + syncTime);
            
            String energyFormatted = "⚡ " + (energy * 10) + "%";
            if (energy >= 10) energyFormatted = "⚡ 100%";
            remoteViewsBig.setTextViewText(R.id.notif_energy_pill, energyFormatted);
            remoteViewsBig.setTextViewText(R.id.notif_whisper_text, whisper);

            // Set Partner Avatar if decoded
            if (avatarBitmap != null) {
                Bitmap circularAvatar = getCircularBitmap(avatarBitmap);
                remoteViewsBig.setImageViewBitmap(R.id.notif_avatar, circularAvatar);
            } else {
                remoteViewsBig.setImageViewResource(R.id.notif_avatar, R.drawable.ic_launcher);
            }

            // Dynamically show or hide shared photo
            if (photoPath != null && !photoPath.isEmpty()) {
                File imgFile = new File(photoPath);
                if (imgFile.exists()) {
                    Bitmap bmp = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                    if (bmp != null) {
                        remoteViewsBig.setImageViewBitmap(R.id.notif_photo_img, bmp);
                        remoteViewsBig.setViewVisibility(R.id.notif_photo_container, View.VISIBLE);
                    } else {
                        remoteViewsBig.setViewVisibility(R.id.notif_photo_container, View.GONE);
                    }
                } else {
                    remoteViewsBig.setViewVisibility(R.id.notif_photo_container, View.GONE);
                }
            } else {
                remoteViewsBig.setViewVisibility(R.id.notif_photo_container, View.GONE);
            }

            // Attach PendingIntents to root and buttons
            remoteViewsBig.setOnClickPendingIntent(R.id.notif_root, pendingIntent);
            remoteViewsBig.setOnClickPendingIntent(R.id.notif_btn_sanctuary, pendingIntent);
            remoteViewsBig.setOnClickPendingIntent(R.id.notif_btn_chat, pendingIntent);

            // 2. Compact Notification Layout (Collapsed View)
            RemoteViews remoteViewsCompact = new RemoteViews(activity.getPackageName(), R.layout.komorebi_notification_compact);
            remoteViewsCompact.setTextViewText(R.id.notif_compact_title, partnerName + " • " + moodLabel);
            remoteViewsCompact.setTextViewText(R.id.notif_compact_whisper, "💌 " + whisper);
            remoteViewsCompact.setTextViewText(R.id.notif_compact_energy, energyFormatted);

            if (avatarBitmap != null) {
                Bitmap circularAvatar = getCircularBitmap(avatarBitmap);
                remoteViewsCompact.setImageViewBitmap(R.id.notif_compact_avatar, circularAvatar);
            } else {
                remoteViewsCompact.setImageViewResource(R.id.notif_compact_avatar, R.drawable.ic_launcher);
            }
            remoteViewsCompact.setOnClickPendingIntent(R.id.notif_compact_root, pendingIntent);

            // 3. Build Android System Notification
            NotificationCompat.Builder builder = new NotificationCompat.Builder(activity, LOCKSCREEN_CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_notification_komorebi)
                    .setColor(0xFFF8CF65)
                    .setCustomContentView(remoteViewsCompact)
                    .setCustomBigContentView(remoteViewsBig)
                    .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                    .setOngoing(true)
                    .setSilent(true)
                    .setCategory(NotificationCompat.CATEGORY_EVENT)
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

