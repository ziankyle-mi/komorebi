/**
 * ✦ KOMOREBI — Main Android App Container & Root State Coordinator
 */

function AndroidApp() {
  // URL Query Param Account Override for Instant Multi-Window Couple Testing
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlUserParam = urlParams ? (urlParams.get('user') || '').toLowerCase() : '';

  // Auto-login if previously saved session exists and auto_login is enabled (or ?user= param passed)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (urlUserParam) return true;
    const isAuto = window.loadStorage ? window.loadStorage('auto_login_enabled', true) : true;
    const saved = window.loadStorage ? window.loadStorage('saved_auth_user', null) : null;
    return Boolean(isAuto && saved);
  });
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'cycle' | 'chat'
  
  const getTravelerAvatar = (name, isMikkie) => {
    const key = 'avatar_' + (name || '').toLowerCase();
    const raw = window.loadStorage ? window.loadStorage(key, null) : null;
    if (window.resolveAvatar) {
      return window.resolveAvatar(raw, isMikkie !== undefined ? isMikkie : name);
    }
    const defaultAv = isMikkie 
      ? { id: 'yae', name: 'Yae Miko', iconUrl: './assets/avatars/yae.png' }
      : { id: 'kokomi', name: 'Kokomi', iconUrl: './assets/avatars/kokomi.png' };
    return raw || defaultAv;
  };

  // Clean, Bare Couple State
  const [activeTraveler, setActiveTraveler] = useState(() => {
    if (urlUserParam.includes('mikkie')) return { name: 'Mikkie', uid: '801124501' };
    if (urlUserParam.includes('zian')) return { name: 'Ziankyle', uid: '802931402' };
    const user = window.loadStorage ? window.loadStorage('active_user', { name: 'Ziankyle', uid: '802931402' }) : { name: 'Ziankyle', uid: '802931402' };
    if (user && user.name && user.name.toLowerCase() === 'zian') return { ...user, name: 'Ziankyle' };
    return user || { name: 'Ziankyle', uid: '802931402' };
  });

  const [partnerTraveler, setPartnerTraveler] = useState(() => {
    if (urlUserParam.includes('mikkie')) return { name: 'Ziankyle', uid: '802931402' };
    if (urlUserParam.includes('zian')) return { name: 'Mikkie', uid: '801124501' };
    const activeName = (activeTraveler?.name || '').toLowerCase();
    const defaultPartner = activeName.includes('mikkie')
      ? { name: 'Ziankyle', uid: '802931402' }
      : { name: 'Mikkie', uid: '801124501' };
    const user = window.loadStorage ? window.loadStorage('partner_user', defaultPartner) : defaultPartner;
    if (user && user.name && user.name.toLowerCase() === activeName) return defaultPartner;
    return user || defaultPartner;
  });

  const [myAvatar, setMyAvatar] = useState(() => getTravelerAvatar(activeTraveler?.name || 'Ziankyle', (activeTraveler?.name || '').toLowerCase().includes('mikkie')));
  const [partnerAvatar, setPartnerAvatar] = useState(() => getTravelerAvatar(partnerTraveler?.name || 'Mikkie', (partnerTraveler?.name || '').toLowerCase().includes('mikkie')));
  const [plans, setPlans] = useState(() => (window.loadStorage ? window.loadStorage('plans', window.DEFAULT_PLANS || []) : []));
  const [messages, setMessages] = useState(() => (window.loadStorage ? window.loadStorage('messages', window.DEFAULT_MESSAGES || []) : []));
  const [latestSnap, setLatestSnap] = useState(() => (window.loadStorage ? window.loadStorage('latest_snap', window.DEFAULT_SNAP || null) : null));
  const [whisperNote, setWhisperNote] = useState(() => (window.loadStorage ? window.loadStorage('whisper_note', window.DEFAULT_WHISPER || '') : ''));
  const [myEnergy, setMyEnergy] = useState(() => (window.loadStorage ? window.loadStorage('my_energy', 2) : 2));
  const [isSleeping, setIsSleeping] = useState(() => (window.loadStorage ? window.loadStorage('is_sleeping', false) : false));

  // Dynamic Real-time Device Timezone & Partner Sync
  const [myTimezoneInfo, setMyTimezoneInfo] = useState(() => (window.getLocalTimezoneInfo ? window.getLocalTimezoneInfo() : { timezone: 'UTC', city: 'Local' }));
  const [partnerTimezoneInfo, setPartnerTimezoneInfo] = useState(() => (window.loadStorage ? window.loadStorage('partner_timezone', { timezone: 'Asia/Tokyo', city: 'Tokyo', offsetMinutes: 540 }) : { timezone: 'Asia/Tokyo', city: 'Tokyo', offsetMinutes: 540 }));

  const [inputText, setInputText] = useState('');
  const [isEditingWhisper, setIsEditingWhisper] = useState(false);
  const [tempWhisper, setTempWhisper] = useState(whisperNote);
  const [quickPlanTitle, setQuickPlanTitle] = useState('');
  const [isSnapModalOpen, setIsSnapModalOpen] = useState(false);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(window.formatCurrentTime ? window.formatCurrentTime() : '');

  // Flo-Inspired Period & Ovulation Tracking Engine State
  const [cycleSettings, setCycleSettings] = useState(() => (
    window.loadStorage ? window.loadStorage('cycle_settings', window.DEFAULT_CYCLE_SETTINGS || {
      cycleLength: 28,
      periodDuration: 5,
      lastPeriodStart: '2026-08-08',
      allowIntimacyTracking: true
    }) : { cycleLength: 28, periodDuration: 5, lastPeriodStart: '2026-08-08', allowIntimacyTracking: true }
  ));

  const [cycleLogs, setCycleLogs] = useState(() => (
    window.loadStorage ? window.loadStorage('cycle_logs', {}) : {}
  ));

  // Supabase Realtime Config & Connection State (100% Free 24/7 Global Sync)
  const [supabaseConfig, setSupabaseConfig] = useState(() => (window.loadStorage ? window.loadStorage('supabase_config', window.DEFAULT_SUPABASE_CONFIG) : window.DEFAULT_SUPABASE_CONFIG));
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Dynamic Multi-Month Calendar Engine
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-11
  const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDateStr, setSelectedDateStr] = useState(todayDateStr);

  const handlePrevMonth = () => {
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };

  const handleTodayJump = () => {
    if (window.AudioEngine) AudioEngine.playTone(680);
    setCalYear(today.getFullYear());
    setCalMonth(today.getMonth());
    setSelectedDateStr(todayDateStr);
  };

  // Sanctuary Feature Toggle Preferences (Lockscreen & Notifications)
  const [isLockscreenEnabled, setIsLockscreenEnabled] = useState(() => (window.loadStorage ? window.loadStorage('lockscreen_enabled', true) : true));
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(() => (window.loadStorage ? window.loadStorage('notifications_enabled', true) : true));
  const [isNotifSoundEnabled, setIsNotifSoundEnabled] = useState(() => (window.loadStorage ? window.loadStorage('notif_sound_enabled', true) : true));

  // Sanctuary Mood State (Vector SVG Moods)
  const [myMood, setMyMood] = useState(() => (window.loadStorage ? window.loadStorage('my_mood', 'loving') : 'loving'));
  const [partnerMood, setPartnerMood] = useState(() => (window.loadStorage ? window.loadStorage('partner_mood', 'happy') : 'happy'));
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

  // Chat Theme State ('pink' | 'forest' | 'ocean')
  const [chatTheme, setChatTheme] = useState(() => (window.loadStorage ? window.loadStorage('chat_theme', 'pink') : 'pink'));

  // Photo Alert Ringtone & Notification State
  const [selectedRingtone, setSelectedRingtone] = useState(() => (window.loadStorage ? window.loadStorage('ringtone', 'moonlight') : 'moonlight'));
  const [activeNotification, setActiveNotification] = useState(null);
  const notifTimerRef = useRef(null);

  const chatEndRef = useRef(null);

  // Sync to Storage on updates
  // Universal Multi-Transport Sync Dispatcher (Local Storage + WiFi Server + Supabase Cloud)
  const pushSyncUpdate = (key, data, setter = null) => {
    if (setter) setter(data);
    if (window.saveStorage) saveStorage(key, data);
    const payload = { [key]: data };
    if (window.WiFiSync) WiFiSync.pushUpdate(payload);
    if (window.SupabaseSync && isSupabaseConnected) SupabaseSync.syncUp(key, data);
  };

  // Lockscreen Widget Customizer State
  const [widgetConfig, setWidgetConfig] = useState(() => (
    window.loadStorage ? window.loadStorage('widget_config', {
      theme: 'sakura', style: 'glass', cornerRadius: 'rounded',
      showMood: true, showNote: true, showPhoto: true, showCycle: true,
      showClocks: true, clockStyle: 'digital'
    }) : {
      theme: 'sakura', style: 'glass', cornerRadius: 'rounded',
      showMood: true, showNote: true, showPhoto: true, showCycle: true,
      showClocks: true, clockStyle: 'digital'
    }
  ));

  // Batch Reactive Storage Synchronizer
  useEffect(() => {
    if (!window.saveStorage) return;
    saveStorage('active_user', activeTraveler);
    saveStorage('partner_user', partnerTraveler);
    saveStorage('my_avatar', myAvatar);
    saveStorage('partner_avatar', partnerAvatar);
    saveStorage('plans', plans);
    saveStorage('messages', messages);
    saveStorage('latest_snap', latestSnap);
    saveStorage('whisper_note', whisperNote);
    saveStorage('my_energy', myEnergy);
    saveStorage('is_sleeping', isSleeping);
    saveStorage('ringtone', selectedRingtone);
    saveStorage('my_mood', myMood);
    saveStorage('partner_mood', partnerMood);
    saveStorage('chat_theme', chatTheme);
    saveStorage('lockscreen_enabled', isLockscreenEnabled);
    saveStorage('notifications_enabled', isNotificationsEnabled);
    saveStorage('notif_sound_enabled', isNotifSoundEnabled);
    saveStorage('cycle_settings', cycleSettings);
    saveStorage('cycle_logs', cycleLogs);
    saveStorage('widget_config', widgetConfig);
  }, [
    activeTraveler, partnerTraveler, myAvatar, partnerAvatar, plans, messages,
    latestSnap, whisperNote, myEnergy, isSleeping, selectedRingtone, myMood,
    partnerMood, chatTheme, isLockscreenEnabled, isNotificationsEnabled,
    isNotifSoundEnabled, cycleSettings, cycleLogs, widgetConfig
  ]);

  const handleSaveWidgetConfig = (cfg) => pushSyncUpdate('widget_config', cfg, setWidgetConfig);

  const handleSelectAvatar = (newAv) => {
    const myKey = activeTraveler.name.toLowerCase();
    setMyAvatar(newAv);
    if (window.saveStorage) {
      saveStorage('avatar_' + myKey, newAv);
      saveStorage('my_avatar', newAv);
    }
    const profileUpdate = { [myKey]: { name: activeTraveler.name, avatar: newAv, updatedAt: Date.now() } };
    if (window.WiFiSync) WiFiSync.pushUpdate({ profiles: profileUpdate });
    if (window.SupabaseSync) SupabaseSync.syncUp('profiles', profileUpdate);
  };

  // Compute Today's Cycle State
  const todayCycleState = window.CycleEngine 
    ? window.CycleEngine.calculateCycleState(cycleSettings, cycleLogs, todayDateStr) 
    : null;

  // Cycle Handlers
  const handleSaveCycleLog = (dateStr, logEntry) => {
    const updated = { ...cycleLogs, [dateStr]: logEntry };
    pushSyncUpdate('cycle_logs', updated, setCycleLogs);
  };

  const handleDeleteCycleLog = (dateStr) => {
    const updated = { ...cycleLogs };
    delete updated[dateStr];
    pushSyncUpdate('cycle_logs', updated, setCycleLogs);
  };

  const handleSaveCycleSettings = (newSettings) => pushSyncUpdate('cycle_settings', newSettings, setCycleSettings);

  const handleResetAllCycleData = () => {
    const todayStr = window.CycleEngine ? window.CycleEngine.formatDate(new Date()) : new Date().toISOString().slice(0, 10);
    const defaultSettings = window.DEFAULT_CYCLE_SETTINGS || {
      cycleLength: 28, periodDuration: 5, lastPeriodStart: todayStr, allowIntimacyTracking: true
    };
    pushSyncUpdate('cycle_settings', defaultSettings, setCycleSettings);
    pushSyncUpdate('cycle_logs', {}, setCycleLogs);
  };

  // Sync to Native Android Home/Lockscreen Widget & Permanent Lockscreen Glance Card
  useEffect(() => {
    try {
      if (!isLockscreenEnabled) return;
      if (window.KomorebiNative && window.KomorebiNative.updateWidget) {
        const payload = JSON.stringify({
          whisper: whisperNote || '',
          energy: myEnergy || 2,
          mood: myMood || 'loving',
          partnerMood: partnerMood || 'happy',
          moodLabel: window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood,
          photoUrl: latestSnap?.imageUrl || '',
          photoCaption: latestSnap?.caption || '',
          partnerName: partnerTraveler?.name || 'Partner',
          partnerAvatar: partnerAvatar?.iconUrl || '',
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        window.KomorebiNative.updateWidget(payload);
      }
    } catch (e) {
      console.warn('Native widget sync:', e);
    }
  }, [isLockscreenEnabled, whisperNote, latestSnap, myEnergy, myMood, partnerMood, partnerTraveler, partnerAvatar, widgetConfig]);

  // Auto-Request Permissions, Auto-Pin Home Widget, and Post Lockscreen Notification on Startup
  useEffect(() => {
    if (isLoggedIn && window.KomorebiNative) {
      // 1. Request notification permission (Android 13+)
      if (window.KomorebiNative.requestNotificationPermission) {
        window.KomorebiNative.requestNotificationPermission();
      }
      // 2. Auto-pin home screen widget (one-time prompt)
      const hasAskedPin = window.loadStorage ? window.loadStorage('widget_pin_prompted', false) : false;
      if (!hasAskedPin && window.KomorebiNative.requestPinWidget) {
        setTimeout(() => {
          window.KomorebiNative.requestPinWidget();
          if (window.saveStorage) saveStorage('widget_pin_prompted', true);
        }, 1800);
      }
      // 3. Immediately post the lockscreen notification card so it shows right away
      if (window.KomorebiNative.updateWidget) {
        setTimeout(() => {
          const payload = JSON.stringify({
            whisper: whisperNote || 'Thinking of you today! 🌸',
            energy: myEnergy || 3,
            mood: myMood || 'loving',
            partnerMood: partnerMood || 'happy',
            moodLabel: window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood,
            photoUrl: latestSnap?.imageUrl || '',
            photoCaption: latestSnap?.caption || '',
            partnerName: partnerTraveler?.name || 'Mikkie',
            partnerAvatar: partnerAvatar?.iconUrl || '',
            lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          window.KomorebiNative.updateWidget(payload);
        }, 500);
      }
    }
  }, [isLoggedIn]);

  // Unified Back Navigation & Shortcut Key Handler (Hardware Back, Escape, Backspace)
  const handleBackNavigation = () => {
    // 1. Close any open dialogs/modals first
    if (isMediaViewerOpen) {
      setIsMediaViewerOpen(false);
      return true;
    }
    if (isMoodModalOpen) {
      setIsMoodModalOpen(false);
      return true;
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
      return true;
    }
    if (isAddOpen) {
      setIsAddOpen(false);
      return true;
    }
    if (isSnapModalOpen) {
      setIsSnapModalOpen(false);
      return true;
    }
    if (isEditingWhisper) {
      setIsEditingWhisper(false);
      return true;
    }
    // 2. Switch from Cycle or Chat tab back to Calendar tab
    if (activeTab === 'cycle' || activeTab === 'chat') {
      setActiveTab('calendar');
      return true;
    }
    // 3. At root screen (Calendar with no modals) -> Minimize App on Android
    if (window.KomorebiNative && window.KomorebiNative.minimizeApp) {
      window.KomorebiNative.minimizeApp();
      return true;
    }
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
      return true;
    }
    return false;
  };

  // Expose global back handler for Android BridgeActivity and listen to keyboard / backbutton events
  useEffect(() => {
    window.handleKomorebiBack = handleBackNavigation;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBackNavigation();
        return;
      }
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
      if (e.key === 'Backspace' && !isInput) {
        e.preventDefault();
        handleBackNavigation();
      }
    };

    const handleCordovaBackButton = (e) => {
      e?.preventDefault?.();
      handleBackNavigation();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('backbutton', handleCordovaBackButton);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('backbutton', handleCordovaBackButton);
      window.handleKomorebiBack = null;
    };
  }, [isMediaViewerOpen, isMoodModalOpen, isProfileOpen, isAddOpen, isSnapModalOpen, isEditingWhisper, screenMode, activeTab]);

  // Universal Sanctuary Notification Engine
  const triggerNotification = ({
    title,
    caption,
    body,
    avatarUrl,
    type = 'general',
    thumbUrl = null,
    actionTab = null,
    durationMs = 6000
  }) => {
    if (!isNotificationsEnabled) return;

    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);

    const isPhotoAlert = type === 'photo';
    const finalDuration = isPhotoAlert ? 30000 : durationMs;

    if (isPhotoAlert) {
      if (isNotifSoundEnabled && window.AudioEngine) AudioEngine.playRingtone(selectedRingtone, 30000);
    } else if (isNotifSoundEnabled && window.AudioEngine) {
      AudioEngine.playNotificationChime();
    }

    try {
      if (window.KomorebiNative && window.KomorebiNative.showSystemNotification) {
        window.KomorebiNative.showSystemNotification(
          title || '✦ Komorebi Sanctuary',
          caption || body || 'New update from your partner',
          type || 'general'
        );
      }
    } catch (e) {
      console.warn('Native notification system trigger:', e);
    }

    setActiveNotification({
      id: Date.now(),
      title,
      caption: caption || body,
      avatarUrl: avatarUrl || myAvatar.iconUrl,
      type,
      thumbUrl,
      actionTab,
      durationMs: finalDuration
    });

    notifTimerRef.current = setTimeout(() => {
      setActiveNotification(null);
    }, finalDuration);
  };

  const handleDismissNotification = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    if (window.AudioEngine) AudioEngine.stopRingtone();
    setActiveNotification(null);
  };

  const triggerPhotoNotification = (snap, isIncoming = false) => {
    const senderName = isIncoming ? partnerTraveler.name : 'You';
    const avatar = isIncoming ? partnerAvatar.iconUrl : myAvatar.iconUrl;

    triggerNotification({
      title: `📸 Locket Photo from ${senderName}`,
      caption: snap.caption || 'Sent a special moment to your Sanctuary Locket! ✨',
      avatarUrl: avatar,
      type: 'photo',
      thumbUrl: snap.imageUrl,
      durationMs: 30000
    });
  };


  // High-Performance Diff-Based Realtime Polling Engine (Local Wi-Fi Hub)
  const lastSyncPayloadRef = useRef('');

  useEffect(() => {
    let isMounted = true;

    const pollWiFiServer = async () => {
      if (!window.WiFiSync || document.hidden) return;
      const data = await WiFiSync.fetchLatest();
      if (!data || !isMounted) return;

      const rawJson = JSON.stringify(data);
      if (rawJson === lastSyncPayloadRef.current) {
        return; // Zero re-renders when data is unchanged
      }
      lastSyncPayloadRef.current = rawJson;

      if (data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans);
      }
      if (data.messages && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
      if (data.latest_snap !== undefined) {
        setLatestSnap(prev => {
          if (data.latest_snap && (!prev || prev.id !== data.latest_snap.id)) {
            if (data.latest_snap.sentBy !== activeTraveler.name.toLowerCase()) {
              triggerPhotoNotification(data.latest_snap, true);
            }
          }
          return data.latest_snap;
        });
      }
      if (data.live_ping && data.live_ping.sentBy) {
        if (data.live_ping.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
          if (!window.lastHandledPing || window.lastHandledPing !== data.live_ping.time) {
            window.lastHandledPing = data.live_ping.time;
            triggerNotification({
              title: `⚡ Live Ping from ${data.live_ping.sentBy}`,
              caption: `Thinking of you right now! 🌸 (${window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood} mood)`,
              type: 'ping',
              avatarUrl: partnerAvatar?.iconUrl,
              actionTab: 'chat'
            });
          }
        }
      }
      if (data.timezone_info && data.timezone_info.sentBy) {
        if (data.timezone_info.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
          setPartnerTimezoneInfo(data.timezone_info);
          if (window.saveStorage) saveStorage('partner_timezone', data.timezone_info);
        }
      }
      if (data.whisper_note !== undefined) {
        setWhisperNote(data.whisper_note);
      }
      if (data.partner_status) {
        if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
        if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
      }
      if (data.cycle_logs && typeof data.cycle_logs === 'object') {
        setCycleLogs(data.cycle_logs);
      }
      if (data.cycle_settings && typeof data.cycle_settings === 'object') {
        setCycleSettings(data.cycle_settings);
      }
      if (data.widget_config && typeof data.widget_config === 'object') {
        setWidgetConfig(data.widget_config);
        if (window.saveStorage) saveStorage('widget_config', data.widget_config);
      }
      if (data.profiles && typeof data.profiles === 'object') {
        const myKey = activeTraveler.name.toLowerCase();
        const partnerKey = partnerTraveler.name.toLowerCase();
        if (data.profiles[partnerKey]?.avatar) {
          setPartnerAvatar(data.profiles[partnerKey].avatar);
          if (window.saveStorage) saveStorage('partner_avatar', data.profiles[partnerKey].avatar);
        }
        if (data.profiles[myKey]?.avatar) {
          setMyAvatar(data.profiles[myKey].avatar);
          if (window.saveStorage) saveStorage('my_avatar', data.profiles[myKey].avatar);
        }
      }
    };

    pollWiFiServer();
    const interval = setInterval(pollWiFiServer, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeTraveler.name, partnerTraveler.name, partnerAvatar?.iconUrl, selectedRingtone]);

  // Supabase 24/7 Global Realtime Database Subscriptions
  useEffect(() => {
    if (supabaseConfig && supabaseConfig.url && supabaseConfig.key && window.SupabaseSync) {
      const connected = SupabaseSync.init(supabaseConfig);
      setIsSupabaseConnected(connected);

      if (connected) {
        SupabaseSync.fetchAll().then(data => {
          if (data) {
            if (data.plans && Array.isArray(data.plans)) setPlans(data.plans);
            if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
            if (data.latest_snap !== undefined && data.latest_snap !== null) {
              setLatestSnap(data.latest_snap);
            }
            if (data.timezone_info && data.timezone_info.sentBy) {
              if (data.timezone_info.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
                setPartnerTimezoneInfo(data.timezone_info);
                if (window.saveStorage) saveStorage('partner_timezone', data.timezone_info);
              }
            }
            if (data.whisper_note !== undefined) setWhisperNote(data.whisper_note);
            if (data.partner_status) {
              if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
              if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
            }
            if (data.cycle_logs && typeof data.cycle_logs === 'object') {
              setCycleLogs(data.cycle_logs);
            }
            if (data.cycle_settings && typeof data.cycle_settings === 'object') {
              setCycleSettings(data.cycle_settings);
            }
            if (data.widget_config && typeof data.widget_config === 'object') {
              setWidgetConfig(data.widget_config);
              if (window.saveStorage) saveStorage('widget_config', data.widget_config);
            }
            if (data.profiles && typeof data.profiles === 'object') {
              const myKey = activeTraveler.name.toLowerCase();
              const partnerKey = partnerTraveler.name.toLowerCase();
              if (data.profiles[partnerKey]?.avatar) {
                setPartnerAvatar(data.profiles[partnerKey].avatar);
                if (window.saveStorage) saveStorage('partner_avatar', data.profiles[partnerKey].avatar);
              }
              if (data.profiles[myKey]?.avatar) {
                setMyAvatar(data.profiles[myKey].avatar);
                if (window.saveStorage) saveStorage('my_avatar', data.profiles[myKey].avatar);
              }
            }
          }
        });

        const unsub = SupabaseSync.subscribe((key, value) => {
          if (key === 'plans' && Array.isArray(value)) {
            setPlans(value);
          } else if (key === 'messages' && Array.isArray(value)) {
            setMessages(value);
          } else if (key === 'latest_snap') {
            setLatestSnap(prev => {
              if (value && (!prev || prev.id !== value.id)) {
                if (value.sentBy !== activeTraveler.name.toLowerCase()) {
                  triggerPhotoNotification(value, true);
                }
              }
              return value;
            });
          } else if (key === 'live_ping' && value && value.sentBy) {
            if (value.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
              triggerNotification({
                title: `⚡ Live Ping from ${value.sentBy}`,
                caption: `Thinking of you right now! 🌸 (${window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood} mood)`,
                type: 'ping',
                avatarUrl: partnerAvatar.iconUrl,
                actionTab: 'chat'
              });
            }
          } else if (key === 'timezone_info' && value && value.sentBy) {
            if (value.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
              setPartnerTimezoneInfo(value);
              if (window.saveStorage) saveStorage('partner_timezone', value);
            }
          } else if (key === 'whisper_note' && value !== undefined) {
            setWhisperNote(value);
          } else if (key === 'cycle_logs' && typeof value === 'object') {
            setCycleLogs(value);
          } else if (key === 'cycle_settings' && typeof value === 'object') {
            setCycleSettings(value);
          } else if (key === 'widget_config' && typeof value === 'object') {
            setWidgetConfig(value);
            if (window.saveStorage) saveStorage('widget_config', value);
          } else if (key === 'profiles' && typeof value === 'object') {
            const myKey = activeTraveler.name.toLowerCase();
            const partnerKey = partnerTraveler.name.toLowerCase();
            if (value[partnerKey]?.avatar) {
              setPartnerAvatar(value[partnerKey].avatar);
              if (window.saveStorage) saveStorage('partner_avatar', value[partnerKey].avatar);
            }
            if (value[myKey]?.avatar) {
              setMyAvatar(value[myKey].avatar);
              if (window.saveStorage) saveStorage('my_avatar', value[myKey].avatar);
            }
          }
        });

        return () => {
          if (unsub) unsub();
        };
      }
    }
  }, [supabaseConfig]);

  const handleSaveSupabaseConfig = (cfg) => {
    setSupabaseConfig(cfg);
    if (window.saveStorage) saveStorage('supabase_config', cfg);
    if (window.SupabaseSync) {
      const ok = SupabaseSync.init(cfg);
      setIsSupabaseConnected(ok);
      if (ok) {
        triggerNotification({
          title: '✦ Cloud Connected',
          caption: 'Supabase Realtime Cloud Sync is now active!',
          type: 'general'
        });
      }
    }
  };

  const handleManualSync = async () => {
    try {
      if (window.HapticEngine) HapticEngine.trigger('light');
      // 1. WiFi Local Sync Pull
      if (window.WiFiSync) {
        const wifiData = await window.WiFiSync.fetchData();
        if (wifiData) {
          if (wifiData.plans && Array.isArray(wifiData.plans)) setPlans(wifiData.plans);
          if (wifiData.messages && Array.isArray(wifiData.messages)) setMessages(wifiData.messages);
          if (wifiData.latest_snap !== undefined) setLatestSnap(wifiData.latest_snap);
          if (wifiData.cycle_logs && typeof wifiData.cycle_logs === 'object') setCycleLogs(wifiData.cycle_logs);
          if (wifiData.cycle_settings && typeof wifiData.cycle_settings === 'object') setCycleSettings(wifiData.cycle_settings);
          if (wifiData.whisper_note !== undefined) setWhisperNote(wifiData.whisper_note);
        }
      }
      // 2. Supabase 24/7 Global Sync Pull
      if (window.SupabaseSync && isSupabaseConnected) {
        const sbData = await window.SupabaseSync.fetchAll();
        if (sbData) {
          if (sbData.plans && Array.isArray(sbData.plans)) setPlans(sbData.plans);
          if (sbData.messages && Array.isArray(sbData.messages)) setMessages(sbData.messages);
          if (sbData.latest_snap !== undefined) setLatestSnap(sbData.latest_snap);
          if (sbData.cycle_logs && typeof sbData.cycle_logs === 'object') setCycleLogs(sbData.cycle_logs);
          if (sbData.cycle_settings && typeof sbData.cycle_settings === 'object') setCycleSettings(sbData.cycle_settings);
          if (sbData.whisper_note !== undefined) setWhisperNote(sbData.whisper_note);
        }
      }
      if (window.HapticEngine) HapticEngine.trigger('success');
    } catch (e) {
      console.warn('Manual pull-sync error:', e);
    }
  };

  const handleAddPlan = (newPlan) => {
    const updated = [newPlan, ...plans];
    pushSyncUpdate('plans', updated, setPlans);
  };

  const handleQuickAddPlan = (e) => {
    e.preventDefault();
    if (!quickPlanTitle.trim()) return;
    if (window.AudioEngine) AudioEngine.playTone(600);

    const safeTitle = window.SecurityGuard ? window.SecurityGuard.sanitizeText(quickPlanTitle, 80) : quickPlanTitle;
    const newPlan = {
      id: Date.now().toString(),
      title: safeTitle,
      time: 'All Day',
      date: selectedDateStr,
      type: 'Date',
      emoji: '✨',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed: false,
      isRevealed: true
    };

    const updated = [newPlan, ...plans];
    setQuickPlanTitle('');
    pushSyncUpdate('plans', updated, setPlans);
  };

  const handleDeletePlan = (id, e) => {
    if (e) e.stopPropagation();
    if (confirm('Delete this plan?')) {
      if (window.AudioEngine) AudioEngine.playTone(380);
      const updated = plans.filter(c => c.id !== id);
      pushSyncUpdate('plans', updated, setPlans);
    }
  };

  const handleToggleRevealPlan = (id) => {
    if (window.AudioEngine) AudioEngine.playTone(650);
    const updated = plans.map(c => (c.id === id ? { ...c, isRevealed: true } : c));
    pushSyncUpdate('plans', updated, setPlans);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (window.AudioEngine) AudioEngine.playTone(650);

    const safeText = window.SecurityGuard ? window.SecurityGuard.sanitizeText(inputText, 500) : inputText;
    const newMsg = {
      id: Date.now().toString(),
      sender: activeTraveler.name.toLowerCase(),
      text: safeText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, newMsg];
    setInputText('');
    pushSyncUpdate('messages', updated, setMessages);
  };

  const handleSendSnap = (snapData) => {
    const snap = {
      id: Date.now().toString(),
      imageUrl: snapData.imageUrl,
      caption: snapData.caption,
      time: 'Just now',
      sentBy: activeTraveler.name.toLowerCase(),
      mediaType: snapData.mediaType || 'image',
      items: snapData.items || []
    };

    setLatestSnap(snap);
    setIsSnapModalOpen(false);
    triggerPhotoNotification(snap, false);
    pushSyncUpdate('latest_snap', snap);
  };

  const handleToggleSleeping = () => {
    const nextState = !isSleeping;
    if (window.AudioEngine) AudioEngine.playTone(nextState ? 350 : 650);
    setIsSleeping(nextState);
    pushSyncUpdate('partner_status', { energy: myEnergy, sleeping: nextState });
  };

  const handleUpdateEnergy = (newVal) => {
    setMyEnergy(newVal);
    pushSyncUpdate('partner_status', { energy: newVal, sleeping: isSleeping });
  };

  const handleSaveWhisper = () => {
    if (window.AudioEngine) AudioEngine.playTone(680);
    const cleanNote = window.SecurityGuard ? window.SecurityGuard.sanitizeText(tempWhisper, 140) : tempWhisper;
    setIsEditingWhisper(false);
    pushSyncUpdate('whisper_note', cleanNote, setWhisperNote);
  };

  const handleLogout = () => {
    if (window.AudioEngine) AudioEngine.playTone(400);
    if (window.saveStorage) {
      saveStorage('auto_login_enabled', false);
      saveStorage('saved_auth_user', null);
    }
    setIsProfileOpen(false);
    setIsLoggedIn(false);
  };

  const handleLogin = (user, partner) => {
    setActiveTraveler(user);
    setPartnerTraveler(partner);
    if (window.saveStorage) {
      saveStorage('active_user', user);
      saveStorage('partner_user', partner);
    }
    const myKey = user.name.toLowerCase();
    const partnerKey = partner.name.toLowerCase();
    const isUserMikkie = myKey.includes('mikkie');
    const userAv = getTravelerAvatar(user.name, isUserMikkie);
    const partnerAv = getTravelerAvatar(partner.name, !isUserMikkie);
    setMyAvatar(userAv);
    setPartnerAvatar(partnerAv);
    setIsLoggedIn(true);

    const tz = window.getLocalTimezoneInfo ? window.getLocalTimezoneInfo() : { timezone: 'UTC', city: 'Local' };
    setMyTimezoneInfo(tz);
    const tzPayload = { sentBy: user.name, ...tz };
    if (window.WiFiSync) WiFiSync.pushUpdate({ timezone_info: tzPayload });
    if (window.SupabaseSync) SupabaseSync.syncUp('timezone_info', tzPayload);
  };

  return (
    <div className="device-viewport-wrapper">
      {/* Android Smartphone Chassis */}
      <div className="android-device-chassis" style={{ position: 'relative' }}>
        {/* Heads-up HD Notification Banner */}
        {window.HDNotificationBanner && (
          <HDNotificationBanner
            notification={activeNotification}
            onClose={handleDismissNotification}
            onClick={() => {
              handleDismissNotification();
              setIsSnapModalOpen(false);
            }}
          />
        )}

        {/* MAIN NATIVE ANDROID APP */}
        {!isLoggedIn ? (
          window.AuthGateScreen && <AuthGateScreen onLogin={handleLogin} />
        ) : (
          <div className="android-screen">
            {/* App Top Bar */}
            <div className="app-top-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="./assets/iconforapp.jpg"
                  alt="App Icon"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--color-primary)', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                />
                <div>
                  <div className="app-brand-title" style={{ fontSize: '15px', lineHeight: '1.1' }}>KOMOREBI</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{activeTraveler.name} & {partnerTraveler.name}</div>
                </div>
              </div>
              <button 
                className="switch-partner-pill" 
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(600);
                  setIsProfileOpen(true);
                }} 
                title="Profile & Settings"
              >
                <img 
                  src={myAvatar?.iconUrl || (activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png')} 
                  alt="" 
                  style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
                  }}
                />
                <span>{activeTraveler.name}</span>
              </button>
            </div>

            {/* TAB VIEW WITH SMOOTH NATIVE SLIDE-FADE TRANSITIONS */}
            <div key={activeTab} className="tab-view-transition">
              {/* TAB 1: CALENDAR & FEED */}
              {activeTab === 'calendar' && window.CalendarTab && (
                <CalendarTab
                  activeTraveler={activeTraveler}
                  partnerTraveler={partnerTraveler}
                  myAvatar={myAvatar}
                  partnerAvatar={partnerAvatar}
                  myEnergy={myEnergy}
                  isSleeping={isSleeping}
                  myMood={myMood}
                  partnerMood={partnerMood}
                  myTimezoneInfo={myTimezoneInfo}
                  partnerTimezoneInfo={partnerTimezoneInfo}
                  calYear={calYear}
                  calMonth={calMonth}
                  selectedDateStr={selectedDateStr}
                  todayDateStr={todayDateStr}
                  plans={plans}
                  quickPlanTitle={quickPlanTitle}
                  whisperNote={whisperNote}
                  tempWhisper={tempWhisper}
                  isEditingWhisper={isEditingWhisper}
                  latestSnap={latestSnap}
                  cycleState={todayCycleState}
                  onToggleSleeping={handleToggleSleeping}
                  onUpdateEnergy={handleUpdateEnergy}
                  onOpenMoodModal={() => setIsMoodModalOpen(true)}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                  onTodayJump={handleTodayJump}
                  onSelectDate={setSelectedDateStr}
                  onOpenAddModal={() => setIsAddOpen(true)}
                  onQuickAddPlan={handleQuickAddPlan}
                  onSetQuickPlanTitle={setQuickPlanTitle}
                  onDeletePlan={handleDeletePlan}
                  onToggleRevealPlan={handleToggleRevealPlan}
                  onSetIsEditingWhisper={setIsEditingWhisper}
                  onSetTempWhisper={setTempWhisper}
                  onSaveWhisper={handleSaveWhisper}
                  onOpenMediaViewer={() => setIsMediaViewerOpen(true)}
                  onOpenSnapModal={() => setIsSnapModalOpen(true)}
                  onOpenCycleTracker={() => setActiveTab('cycle')}
                  onManualSync={handleManualSync}
                />
              )}

              {/* TAB 2: FLO-INSPIRED CYCLE SANCTUARY */}
              {activeTab === 'cycle' && window.CycleTrackerView && (
                <CycleTrackerView
                  settings={cycleSettings}
                  cycleLogs={cycleLogs}
                  onSaveLog={handleSaveCycleLog}
                  onDeleteLog={handleDeleteCycleLog}
                  onSaveSettings={handleSaveCycleSettings}
                  onResetAllCycleData={handleResetAllCycleData}
                  onBackToCalendar={() => setActiveTab('calendar')}
                  activeTraveler={activeTraveler}
                  partnerTraveler={partnerTraveler}
                />
              )}

              {/* TAB 3: MESSAGES & CHAT STREAM */}
              {activeTab === 'chat' && window.ChatTab && (
                <ChatTab
                  chatTheme={chatTheme}
                  activeTraveler={activeTraveler}
                  partnerTraveler={partnerTraveler}
                  myAvatar={myAvatar}
                  partnerAvatar={partnerAvatar}
                  myMood={myMood}
                  partnerMood={partnerMood}
                  messages={messages}
                  inputText={inputText}
                  chatEndRef={chatEndRef}
                  onSetChatTheme={setChatTheme}
                  onSendMessage={handleSendMessage}
                  onSetInputText={setInputText}
                  onClearChat={() => {
                    if (confirm('Clear chat history?')) {
                      if (window.AudioEngine) AudioEngine.playTone(380);
                      if (window.HapticEngine) HapticEngine.trigger('warning');
                      setMessages([]);
                    }
                  }}
                  onBackToCalendar={() => setActiveTab('calendar')}
                  onSendPing={() => {
                    const pingData = { sentBy: activeTraveler.name, time: Date.now() };
                    if (window.WiFiSync) WiFiSync.pushUpdate({ live_ping: pingData });
                    if (window.SupabaseSync) SupabaseSync.syncUp('live_ping', pingData);
                    triggerNotification({
                      title: `⚡ Ping Sent to ${partnerTraveler.name}`,
                      caption: `Sent love to ${partnerTraveler.name}! 🌸 (${window.getMoodData ? window.getMoodData(myMood).name : myMood} mood)`,
                      type: 'ping',
                      avatarUrl: myAvatar.iconUrl,
                      actionTab: 'chat'
                    });
                  }}
                  onManualSync={handleManualSync}
                />
              )}
            </div>

            {/* Bottom Android Navigation Bar */}
            <div className="bottom-nav-bar">
              <button
                className={`nav-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(480);
                  if (window.HapticEngine) HapticEngine.trigger('light');
                  setActiveTab('calendar');
                }}
              >
                {window.Icons && <Icons.Calendar size={17} />}
                <span>Sanctuary</span>
              </button>

              <button
                className={`nav-tab-btn ${activeTab === 'cycle' ? 'active' : ''}`}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(550);
                  if (window.HapticEngine) HapticEngine.trigger('light');
                  setActiveTab('cycle');
                }}
              >
                {window.FloVectorIcons && <FloVectorIcons.TenderBreasts size={17} color={activeTab === 'cycle' ? 'var(--color-primary)' : 'currentColor'} />}
                <span>Cycle</span>
              </button>

              <button
                className="nav-tab-btn"
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(650);
                  if (window.HapticEngine) HapticEngine.trigger('medium');
                  setIsSnapModalOpen(true);
                }}
                title="Send Photo to Locket"
              >
                {window.Icons && <Icons.Camera size={17} />}
                <span>Locket</span>
              </button>

              <button
                className={`nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(520);
                  if (window.HapticEngine) HapticEngine.trigger('light');
                  setActiveTab('chat');
                }}
              >
                {window.Icons && <Icons.Chat size={17} />}
                <span>Chat</span>
              </button>
            </div>
          </div>
        )}

        {/* Vector Mood Picker Modal */}
        {window.MoodPickerModal && (
          <MoodPickerModal
            isOpen={isMoodModalOpen}
            onClose={() => setIsMoodModalOpen(false)}
            currentMood={myMood}
            onSelectMood={(moodId) => {
              setMyMood(moodId);
              if (window.WiFiSync) WiFiSync.pushUpdate({ partner_mood: moodId });
              if (window.SupabaseSync) SupabaseSync.syncUp('partner_mood', moodId);
              triggerNotification({
                title: `Mood Updated: ${window.getMoodData ? window.getMoodData(moodId).name : moodId}`,
                caption: `Shared with ${partnerTraveler.name}! 💖`,
                type: 'mood',
                avatarUrl: myAvatar.iconUrl
              });
            }}
            partnerName={partnerTraveler.name}
          />
        )}

        {/* Fullscreen Media Viewer */}
        {isMediaViewerOpen && latestSnap && window.FullscreenMediaViewer && (
          <FullscreenMediaViewer
            snap={latestSnap}
            activeTraveler={activeTraveler}
            partnerTraveler={partnerTraveler}
            onClose={() => setIsMediaViewerOpen(false)}
            onSendNew={() => { setIsMediaViewerOpen(false); setIsSnapModalOpen(true); }}
          />
        )}

        {/* Send Photo Bottom Sheet */}
        {window.SendPictureSheet && (
          <SendPictureSheet
            isOpen={isSnapModalOpen}
            onClose={() => setIsSnapModalOpen(false)}
            onSendPicture={handleSendSnap}
            activeTraveler={activeTraveler}
          />
        )}

        {/* Add Plan Bottom Sheet */}
        {window.AddPlanSheet && (
          <AddPlanSheet
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={handleAddPlan}
            activeTraveler={activeTraveler}
            initialDate={selectedDateStr}
          />
        )}

        {/* Profile Customizer & Settings */}
        {window.ProfileCustomizerSheet && (
          <ProfileCustomizerSheet
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            currentAvatar={myAvatar}
            onSelectAvatar={handleSelectAvatar}
            onLogout={handleLogout}
            activeTraveler={activeTraveler}
            onUpdateName={(name) => setActiveTraveler(prev => ({ ...prev, name }))}
            supabaseConfig={supabaseConfig}
            onSaveSupabaseConfig={handleSaveSupabaseConfig}
            isSupabaseConnected={isSupabaseConnected}
            selectedRingtone={selectedRingtone}
            onSelectRingtone={setSelectedRingtone}
            isLockscreenEnabled={isLockscreenEnabled}
            onToggleLockscreen={setIsLockscreenEnabled}
            isNotificationsEnabled={isNotificationsEnabled}
            onToggleNotifications={setIsNotificationsEnabled}
            isNotifSoundEnabled={isNotifSoundEnabled}
            onToggleNotifSound={setIsNotifSoundEnabled}
            widgetConfig={widgetConfig}
            onSaveWidgetConfig={handleSaveWidgetConfig}
            partnerTraveler={partnerTraveler}
            partnerAvatar={partnerAvatar}
            partnerMood={partnerMood}
            whisperNote={whisperNote}
            myEnergy={myEnergy}
            isSleeping={isSleeping}
            onTestNotification={() => {
              triggerNotification({
                title: `⚡ Notification Alert Preview`,
                caption: `Testing your live sanctuary notification alert! 🌸 (${window.getMoodData ? window.getMoodData(myMood).name : myMood} mood)`,
                type: 'ping',
                avatarUrl: myAvatar.iconUrl,
                actionTab: 'chat'
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AndroidApp />);
