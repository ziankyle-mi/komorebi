package com.komorebi.couple;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.webkit.JavascriptInterface;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class KomorebiNativeBridge {

    private final Activity activity;

    public KomorebiNativeBridge(Activity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public void updateWidget(String jsonData) {
        try {
            JSONObject obj = new JSONObject(jsonData);
            SharedPreferences prefs = activity.getSharedPreferences(KomorebiWidgetProvider.PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();

            if (obj.has("whisper")) {
                editor.putString(KomorebiWidgetProvider.PREF_WHISPER_NOTE, obj.optString("whisper", "Thinking of you today! 🌸"));
            }
            if (obj.has("partnerName")) {
                editor.putString(KomorebiWidgetProvider.PREF_PARTNER_NAME, obj.optString("partnerName", "Partner"));
            }
            if (obj.has("energy")) {
                editor.putInt(KomorebiWidgetProvider.PREF_ENERGY, obj.optInt("energy", 2));
            }
            if (obj.has("moodLabel")) {
                editor.putString(KomorebiWidgetProvider.PREF_MOOD_LABEL, obj.optString("moodLabel", "Loving"));
            }
            if (obj.has("lastUpdated")) {
                editor.putString(KomorebiWidgetProvider.PREF_TIME, obj.optString("lastUpdated", "Live ⚡"));
            }
            editor.apply();

            final String photoUrl = obj.optString("photoUrl", "");

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

                        activity.runOnUiThread(() -> KomorebiWidgetProvider.updateAllWidgets(activity));
                    } catch (Exception e) {
                        e.printStackTrace();
                        activity.runOnUiThread(() -> KomorebiWidgetProvider.updateAllWidgets(activity));
                    }
                }).start();
            } else {
                KomorebiWidgetProvider.updateAllWidgets(activity);
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
