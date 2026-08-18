package com.komorebi.couple;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Attach KomorebiNative bridge to the Capacitor webview
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().addJavascriptInterface(new KomorebiNativeBridge(this), "KomorebiNative");
        }

        // Hardware / Gesture Back Button handling
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                if (webView != null) {
                    webView.evaluateJavascript("window.handleKomorebiBack && window.handleKomorebiBack()", null);
                } else {
                    moveTaskToBack(true);
                }
            }
        });
    }
}
