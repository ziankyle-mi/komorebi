/**
 * ✦ KOMOREBI — Flo-Inspired Cycle & Ovulation Calculation Engine (Pure Logic Layer)
 * Hardened with Multi-Month Dual-Numbering & Comprehensive Flo Categories
 */

const DEFAULT_CYCLE_SETTINGS = {
  cycleLength: 28,          // Average days per cycle (21 - 35)
  periodDuration: 5,        // Average period bleeding days (3 - 10)
  lastPeriodStart: new Date().toISOString().slice(0, 10), // ISO YYYY-MM-DD
  allowIntimacyTracking: true
};

// Authentic Flo "What are you feeling today?" quick bubbles
const FLO_FEELING_BUBBLES = [
  { id: 'egg_white', category: 'discharge', label: 'Egg white', icon: '💧', color: '#93c5fd' },
  { id: 'calm', category: 'moods', label: 'Calm', icon: '😌', color: '#6ee7b7' },
  { id: 'happy', category: 'moods', label: 'Happy', icon: '😊', color: '#f8cf65' },
  { id: 'creamy', category: 'discharge', label: 'Creamy', icon: '💧', color: '#c084fc' },
  { id: 'cramps', category: 'symptoms', label: 'Cramps', icon: '⚡', color: '#fb7185' },
  { id: 'tender_breasts', category: 'symptoms', label: 'Tender', icon: '🌸', color: '#fca5c9' },
  { id: 'energetic', category: 'moods', label: 'Energetic', icon: '✨', color: '#fde047' },
  { id: 'bloating', category: 'symptoms', label: 'Bloating', icon: '🫧', color: '#a5b4fc' }
];

// Comprehensive Flo Categories matching Reference Screenshot 2
const FLO_CATEGORIES = {
  sex_and_drive: {
    title: 'Sex and sex drive',
    icon: '💖',
    items: [
      { id: 'didnt_have_sex', label: "Didn't have sex", icon: '🚫' },
      { id: 'protected_sex', label: 'Protected sex', icon: '🔒' },
      { id: 'unprotected_sex', label: 'Unprotected sex', icon: '🔓' },
      { id: 'oral_sex', label: 'Oral sex', icon: '💋' },
      { id: 'anal_sex', label: 'Anal sex', icon: '🍑' },
      { id: 'masturbation', label: 'Masturbation', icon: '💓' },
      { id: 'sensual_touch', label: 'Sensual touch', icon: '💖' },
      { id: 'sex_toys', label: 'Sex toys', icon: '🪢' },
      { id: 'orgasm', label: 'Orgasm', icon: '✨' },
      { id: 'high_sex_drive', label: 'High sex drive', icon: '❤️‍🔥' },
      { id: 'neutral_sex_drive', label: 'Neutral sex drive', icon: '💗' },
      { id: 'low_sex_drive', label: 'Low sex drive', icon: '💔' }
    ]
  },
  discharge: {
    title: 'Vaginal discharge',
    icon: '💧',
    items: [
      { id: 'no_discharge', label: 'No discharge', icon: '🫧' },
      { id: 'spotting', label: 'Spotting', icon: '🩸' },
      { id: 'sticky', label: 'Sticky', icon: '💧' },
      { id: 'creamy', label: 'Creamy', icon: '🥛' },
      { id: 'egg_white', label: 'Egg white', icon: '🥚' },
      { id: 'watery', label: 'Watery', icon: '🌊' },
      { id: 'unusual', label: 'Unusual', icon: '⚠️' }
    ]
  },
  symptoms: {
    title: 'Physical symptoms',
    icon: '🌿',
    items: [
      { id: 'cramps', label: 'Cramps', icon: '⚡' },
      { id: 'headache', label: 'Headache', icon: '🤕' },
      { id: 'tender_breasts', label: 'Tender breasts', icon: '🌸' },
      { id: 'bloating', label: 'Bloating', icon: '🫧' },
      { id: 'acne', label: 'Acne', icon: '✨' },
      { id: 'fatigue', label: 'Fatigue', icon: '💤' },
      { id: 'backache', label: 'Backache', icon: '🌿' },
      { id: 'cravings', label: 'Cravings', icon: '🍫' },
      { id: 'insomnia', label: 'Insomnia', icon: '🌙' },
      { id: 'nausea', label: 'Nausea', icon: '🤢' }
    ]
  },
  moods: {
    title: 'Mood & emotions',
    icon: '✨',
    items: [
      { id: 'calm', label: 'Calm', icon: '😌' },
      { id: 'happy', label: 'Happy', icon: '😊' },
      { id: 'energetic', label: 'Energetic', icon: '☀️' },
      { id: 'sensitive', label: 'Sensitive', icon: '🥺' },
      { id: 'irritable', label: 'Irritable', icon: '😤' },
      { id: 'sad', label: 'Sad / Low', icon: '😢' },
      { id: 'anxious', label: 'Anxious', icon: '😰' },
      { id: 'loving', label: 'Affectionate', icon: '🥰' }
    ]
  },
  activity: {
    title: 'Physical activity',
    icon: '🏃‍♀️',
    items: [
      { id: 'yoga', label: 'Yoga & stretch', icon: '🧘‍♀️' },
      { id: 'walking', label: 'Walking', icon: '🚶‍♀️' },
      { id: 'running', label: 'Running', icon: '🏃‍♀️' },
      { id: 'gym', label: 'Gym / Fitness', icon: '🏋️‍♀️' },
      { id: 'rest_day', label: 'Rest day', icon: '🛋️' }
    ]
  }
};

const FLOW_OPTIONS = [
  { id: 'none', label: 'None', color: 'transparent' },
  { id: 'spotting', label: 'Spotting', color: '#fca5a5' },
  { id: 'light', label: 'Light', color: '#f87171' },
  { id: 'medium', label: 'Medium', color: '#ef4444' },
  { id: 'heavy', label: 'Heavy', color: '#b91c1c' }
];

const CycleEngine = {
  parseDate(dateStr) {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  },

  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  diffDays(d1, d2) {
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  },

  addDaysToStr(dateStr, days) {
    const d = this.parseDate(dateStr);
    d.setDate(d.getDate() + days);
    return this.formatDate(d);
  },

  isFemaleUser(user) {
    if (!user) return false;
    const name = String(user.name || '').toLowerCase();
    return name.includes('mikkie') || user.gender === 'female' || user.role === 'female';
  },

  getEffectiveLastPeriodStart(settings, logs, targetDateStr = null) {
    const target = targetDateStr ? this.parseDate(targetDateStr) : new Date();
    const manualStarts = Object.keys(logs || {})
      .filter(dateStr => {
        const log = logs[dateStr];
        return log && log.flow && log.flow !== 'none';
      })
      .sort();

    const sessionStarts = [];
    let prevDate = null;

    for (const dStr of manualStarts) {
      const cur = this.parseDate(dStr);
      if (!prevDate || this.diffDays(prevDate, cur) > 2) {
        sessionStarts.push(dStr);
      }
      prevDate = cur;
    }

    const pastStarts = sessionStarts.filter(s => this.diffDays(this.parseDate(s), target) >= 0);
    if (pastStarts.length > 0) {
      return pastStarts[pastStarts.length - 1];
    }

    return settings.lastPeriodStart || this.formatDate(new Date());
  },

  calculateCycleState(settings = DEFAULT_CYCLE_SETTINGS, logs = {}, targetDateStr = null) {
    const targetDate = targetDateStr ? this.parseDate(targetDateStr) : new Date();
    const targetStr = this.formatDate(targetDate);

    const cycleLen = Math.max(21, Math.min(35, settings.cycleLength || 28));
    const periodDur = Math.max(3, Math.min(10, settings.periodDuration || 5));
    const lastStartStr = this.getEffectiveLastPeriodStart(settings, logs, targetStr);
    const lastStart = this.parseDate(lastStartStr);

    const elapsedDays = this.diffDays(lastStart, targetDate);
    
    let currentCycleDay = (elapsedDays % cycleLen) + 1;
    if (currentCycleDay <= 0) {
      currentCycleDay += cycleLen;
    }

    const ovulationDay = Math.max(1, cycleLen - 14);
    const fertileStartDay = Math.max(1, ovulationDay - 5);
    const fertileEndDay = Math.min(cycleLen, ovulationDay + 1);

    let phaseKey = 'follicular';
    let phaseName = 'Follicular Phase';
    let phaseColor = '#60a5fa';
    let pregnancyChance = 'Low';

    const dayLog = logs[targetStr] || null;
    const hasPeriodLogged = dayLog && dayLog.flow && dayLog.flow !== 'none';

    if (hasPeriodLogged || currentCycleDay <= periodDur) {
      phaseKey = 'menstrual';
      phaseName = 'Menstrual Phase';
      phaseColor = '#fb7185';
      pregnancyChance = 'Low';
    } else if (currentCycleDay === ovulationDay) {
      phaseKey = 'ovulation';
      phaseName = 'Ovulation Day';
      phaseColor = '#20b2aa';
      pregnancyChance = 'High';
    } else if (currentCycleDay >= fertileStartDay && currentCycleDay <= fertileEndDay) {
      phaseKey = 'fertile';
      phaseName = 'Fertile Window';
      phaseColor = '#5eead4';
      pregnancyChance = currentCycleDay >= ovulationDay - 2 ? 'High' : 'Medium';
    } else if (currentCycleDay > fertileEndDay) {
      phaseKey = 'luteal';
      phaseName = 'Luteal Phase';
      phaseColor = '#c084fc';
      pregnancyChance = 'Low';
    }

    const daysUntilNextPeriod = cycleLen - currentCycleDay + 1;
    const nextPeriodStartDate = this.addDaysToStr(targetStr, daysUntilNextPeriod);

    return {
      targetDateStr: targetStr,
      currentCycleDay,
      totalCycleDays: cycleLen,
      periodDuration: periodDur,
      ovulationDay,
      fertileStartDay,
      fertileEndDay,
      phaseKey,
      phaseName,
      phaseColor,
      pregnancyChance,
      daysUntilNextPeriod,
      nextPeriodStartDate,
      hasPeriodLogged,
      dayLog
    };
  },

  /**
   * Generates authentic Flo month structure with dual cycle numbers,
   * period continuous lines, and ovulation dotted rings.
   */
  generateFloMonthData(year, month, settings, logs) {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    // Convert to Monday = 0 for standard Flo ISO week
    const mondayFirstOffset = (firstDayIndex + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Empty lead-in padding
    for (let i = 0; i < mondayFirstOffset; i++) {
      days.push({ empty: true, id: `pad-${i}` });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const state = this.calculateCycleState(settings, logs, dStr);

      const isBleeding = state.hasPeriodLogged || (state.phaseKey === 'menstrual' && state.currentCycleDay <= state.periodDuration);
      const isOvulation = state.phaseKey === 'ovulation';
      const isFertile = state.phaseKey === 'fertile' || isOvulation;

      days.push({
        empty: false,
        dayNum: d,
        dateStr: dStr,
        cycleDay: state.currentCycleDay,
        periodBleedDay: isBleeding ? state.currentCycleDay : null,
        isBleeding,
        isOvulation,
        isFertile,
        phaseKey: state.phaseKey,
        dayLog: state.dayLog
      });
    }

    return {
      year,
      month,
      monthName: new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' }),
      days
    };
  },

  getPhaseInsights(phaseKey, partnerName = 'Zian') {
    const insights = {
      menstrual: {
        title: 'Menstrual Phase 🩸',
        subtitle: 'Rest, Comfort & Low Energy',
        energy: 'Low Energy • High Sensitivity',
        careTips: [
          `Prepare warm chamomile tea and a cozy heat pack for Mikkie. 🍵`,
          `Give gentle lower back massages and offer comforting snacks. 🍫`,
          `Keep activities relaxed — cozy movie night or restful naps together.`
        ]
      },
      follicular: {
        title: 'Follicular Phase 🌿',
        subtitle: 'Rising Energy & Vibrant Mood',
        energy: 'Rising Energy • Sharp & Creative',
        careTips: [
          `Great time for fun dates, going out, and trying new restaurants! 🍽️`,
          `Mikkie is feeling creative and upbeat — plan fun activities together. ✨`,
          `Enjoy co-op games and active hobbies!`
        ]
      },
      ovulation: {
        title: 'Ovulation Peak ✨',
        subtitle: 'Peak Confidence & High Fertility',
        energy: 'Peak Energy • Magnetic Glow',
        careTips: [
          `Mikkie is feeling radiant and confident today! 💖`,
          `Express appreciation, compliments, and plan a romantic dinner. 🌹`,
          `Chances of pregnancy are at their highest tier (High).`
        ]
      },
      fertile: {
        title: 'Fertile Window 🌸',
        subtitle: 'High Fertility & Radiant Glow',
        energy: 'High Energy • Warm Glow',
        careTips: [
          `Mikkie has high energy and vibrant mood today. 💕`,
          `Show affection, share sweet whisper notes, and enjoy quality time. ✨`
        ]
      },
      luteal: {
        title: 'Luteal Phase 🌙',
        subtitle: 'Winding Down & Self-Care',
        energy: 'Winding Down • Craving Comfort',
        careTips: [
          `Be extra patient and attentive — mood can be sensitive during this phase. 🫂`,
          `Cook her favorite comfort meals and keep sweet treats stocked! 🧁`,
          `Draw a warm bath or encourage peaceful relaxation.`
        ]
      }
    };

    return insights[phaseKey] || insights.follicular;
  },

  /**
   * Generates proactive partner care notification nudges
   */
  getPartnerNotificationNudge(settings = DEFAULT_CYCLE_SETTINGS, logs = {}, partnerName = 'Mikkie') {
    const todayStr = this.formatDate(new Date());
    const state = this.calculateCycleState(settings, logs, todayStr);
    const { daysUntilNextPeriod, phaseKey, currentCycleDay, totalCycleDays } = state;

    if (phaseKey === 'menstrual' || state.hasPeriodLogged) {
      return {
        type: 'period_active',
        phase: 'Menstrual Phase',
        title: `${partnerName} is on Day ${currentCycleDay} of Period`,
        message: `She might be experiencing cramps or low energy today. A warm heating pad, gentle lower back rubs, or a peaceful evening will mean the world to her.`,
        icon: 'WaterDrop',
        accentColor: '#fb7185',
        badge: 'Active Support',
        urgency: 'high'
      };
    }

    if (daysUntilNextPeriod <= 3 && daysUntilNextPeriod > 0) {
      return {
        type: 'period_approaching',
        phase: 'PMS Alert',
        title: `${partnerName}'s period starts in ~${daysUntilNextPeriod} ${daysUntilNextPeriod === 1 ? 'day' : 'days'}`,
        message: `Hormone levels are transitioning. Surprise her with comfort snacks 🍫, hot chamomile tea 🍵, and extra sweet check-ins today!`,
        icon: 'Sparkle',
        accentColor: '#f43f5e',
        badge: 'Care Reminder',
        urgency: 'high'
      };
    }

    if (phaseKey === 'ovulation') {
      return {
        type: 'ovulation',
        phase: 'Peak Ovulation',
        title: `Peak Radiant Day for ${partnerName} ✨`,
        message: `Her energy, natural confidence, and glow are at their absolute highest today. Wonderful time for a romantic date or sweet quality time!`,
        icon: 'Sparkle',
        accentColor: '#20b2aa',
        badge: 'Peak Energy',
        urgency: 'medium'
      };
    }

    if (phaseKey === 'luteal' && currentCycleDay >= totalCycleDays - 5) {
      return {
        type: 'pms_sensitivity',
        phase: 'Luteal Phase',
        title: `Pre-Menstrual Sensitivity Window`,
        message: `Emotional sensitivity and tiredness are common now. Active listening, emotional validation, and small thoughtful gestures make a huge difference.`,
        icon: 'TenderBreasts',
        accentColor: '#c084fc',
        badge: 'Empathy Guide',
        urgency: 'medium'
      };
    }

    return {
      type: 'follicular_harmony',
      phase: 'Follicular Phase',
      title: `Harmony & Rising Spirits 🌿`,
      message: `${partnerName} is feeling sharp and creative today. Enjoy sharing daily updates, talking about goals, or planning fun upcoming plans together.`,
      icon: 'Sparkle',
      accentColor: '#60a5fa',
      badge: 'Daily Glow',
      urgency: 'low'
    };
  },

  /**
   * Computes Mood + Cycle Phase Correlation Analysis across logged days
   */
  getMoodCycleCorrelations(logs = {}, settings = DEFAULT_CYCLE_SETTINGS) {
    const phases = {
      menstrual: { name: 'Menstrual', color: '#fb7185', totalDays: 0, items: {}, topMoods: [] },
      follicular: { name: 'Follicular', color: '#60a5fa', totalDays: 0, items: {}, topMoods: [] },
      ovulation: { name: 'Ovulation', color: '#20b2aa', totalDays: 0, items: {}, topMoods: [] },
      luteal: { name: 'Luteal', color: '#c084fc', totalDays: 0, items: {}, topMoods: [] }
    };

    const dateKeys = Object.keys(logs || {});
    if (dateKeys.length === 0) {
      // Seed default educational baseline correlation
      return {
        hasData: false,
        totalLoggedDays: 0,
        phaseStats: {
          menstrual: { name: 'Menstrual', color: '#fb7185', samplePercent: 78, primaryFeel: 'Cramps & Rest', topChips: ['cramps', 'calm', 'tender_breasts'] },
          follicular: { name: 'Follicular', color: '#60a5fa', samplePercent: 88, primaryFeel: 'High Energy & Joy', topChips: ['happy', 'energetic', 'calm'] },
          ovulation: { name: 'Ovulation', color: '#20b2aa', samplePercent: 94, primaryFeel: 'Radiant & Affectionate', topChips: ['loving', 'egg_white', 'happy'] },
          luteal: { name: 'Luteal', color: '#c084fc', samplePercent: 70, primaryFeel: 'Sensitive & Cozy', topChips: ['sensitive', 'cozy', 'bloating'] }
        },
        summaryInsight: 'Log symptoms daily in the sanctuary to unlock your personalized couple cycle insights!'
      };
    }

    // Process logged days
    dateKeys.forEach(dateStr => {
      const log = logs[dateStr];
      if (!log) return;
      const state = this.calculateCycleState(settings, logs, dateStr);
      const phaseKey = (state.phaseKey === 'fertile' ? 'ovulation' : state.phaseKey) || 'follicular';
      const phaseObj = phases[phaseKey] || phases.follicular;

      phaseObj.totalDays += 1;
      const items = log.floItems || [];
      items.forEach(itemId => {
        phaseObj.items[itemId] = (phaseObj.items[itemId] || 0) + 1;
      });
    });

    const phaseStats = {};
    Object.keys(phases).forEach(k => {
      const p = phases[k];
      const sortedItems = Object.entries(p.items)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([id, count]) => ({ id, count }));

      phaseStats[k] = {
        name: p.name,
        color: p.color,
        loggedDays: p.totalDays,
        topChips: sortedItems.map(i => i.id),
        dominantFeel: sortedItems.length > 0 ? sortedItems[0].id.replace(/_/g, ' ') : 'Balanced'
      };
    });

    return {
      hasData: true,
      totalLoggedDays: dateKeys.length,
      phaseStats,
      summaryInsight: 'Patterns updated in real-time based on your sanctuary logs.'
    };
  },

  /**
   * Calibrates cycle predictions based on user accuracy feedback
   */
  calibrateAccuracyFeedback(feedbackType, currentSettings = DEFAULT_CYCLE_SETTINGS) {
    const currentLen = currentSettings.cycleLength || 28;
    let newLen = currentLen;
    let feedbackLabel = 'Confirmed on schedule';

    switch (feedbackType) {
      case 'exact':
        newLen = currentLen;
        feedbackLabel = 'Prediction exact on day! Calibration confirmed.';
        break;
      case 'early_1':
        newLen = Math.max(21, currentLen - 1);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (-1d).';
        break;
      case 'early_2':
        newLen = Math.max(21, currentLen - 2);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (-2d).';
        break;
      case 'late_1':
        newLen = Math.min(35, currentLen + 1);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (+1d).';
        break;
      case 'late_2':
        newLen = Math.min(35, currentLen + 2);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (+2d).';
        break;
      default:
        break;
    }

    return {
      updatedSettings: {
        ...currentSettings,
        cycleLength: newLen,
        lastCalibrated: Date.now()
      },
      feedbackLabel
    };
  }
};

window.CycleEngine = CycleEngine;
window.DEFAULT_CYCLE_SETTINGS = DEFAULT_CYCLE_SETTINGS;
window.FLO_FEELING_BUBBLES = FLO_FEELING_BUBBLES;
window.FLO_CATEGORIES = FLO_CATEGORIES;
window.FLOW_OPTIONS = FLOW_OPTIONS;
