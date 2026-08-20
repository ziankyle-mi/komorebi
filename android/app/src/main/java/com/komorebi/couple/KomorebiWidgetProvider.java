package com.komorebi.couple;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.View;
import android.widget.RemoteViews;

import java.io.File;

public class KomorebiWidgetProvider extends AppWidgetProvider {

    public static final String PREFS_NAME = "KomorebiWidgetPrefs";
    public static final String PREF_PARTNER_NAME = "partner_name";
    public static final String PREF_WHISPER_NOTE = "whisper_note";
    public static final String PREF_ENERGY = "partner_energy";
    public static final String PREF_MOOD_LABEL = "mood_label";
    public static final String PREF_PHOTO_PATH = "photo_path";
    public static final String PREF_TIME = "sync_time";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    public static void updateAllWidgets(Context context) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        ComponentName componentName = new ComponentName(context, KomorebiWidgetProvider.class);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(componentName);
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    public static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String partnerName = prefs.getString(PREF_PARTNER_NAME, "🌸 Partner");
        String moodLabel = prefs.getString(PREF_MOOD_LABEL, "Loving");
        String whisperNote = prefs.getString(PREF_WHISPER_NOTE, "Thinking of you today! 🌸");
        int energy = prefs.getInt(PREF_ENERGY, 2);
        String photoPath = prefs.getString(PREF_PHOTO_PATH, "");
        String syncTime = prefs.getString(PREF_TIME, "Live ⚡");

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.komorebi_widget);

        // Partner name and status
        views.setTextViewText(R.id.widget_partner_title, "🌸 " + partnerName + " • " + moodLabel);
        views.setTextViewText(R.id.widget_time_text, syncTime);
        
        // Energy badge
        String energyText = "⚡ " + (energy * 10) + "%";
        if (energy >= 10) energyText = "⚡ 100%";
        views.setTextViewText(R.id.widget_energy_pill, energyText);

        // Daily note / Whisper
        views.setTextViewText(R.id.widget_whisper_text, "💌 " + whisperNote);

        // Image / Photo
        boolean hasValidPhoto = false;
        if (photoPath != null && !photoPath.isEmpty()) {
            try {
                File imgFile = new File(photoPath);
                if (imgFile.exists()) {
                    Bitmap bitmap = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                    if (bitmap != null) {
                        views.setImageViewBitmap(R.id.widget_photo_img, bitmap);
                        views.setViewVisibility(R.id.widget_photo_container, View.VISIBLE);
                        hasValidPhoto = true;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (!hasValidPhoto) {
            views.setViewVisibility(R.id.widget_photo_container, View.GONE);
        }

        // Tap on widget opens MainActivity
        Intent intent = new Intent(context, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
