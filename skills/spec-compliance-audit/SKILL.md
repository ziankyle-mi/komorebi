---
name: spec-compliance-audit
description: Use when the user asks to check if the build matches the original spec/requirements, verify design constraints (like a strict color rule) were followed, or catch silent drift from what was asked. Triggers on phrases like "does this match the spec," "check the design rules," "did it follow my requirements."
---

# Design & Spec-Compliance Audit — Claude Code Prompt

Use this to catch silent drift from the original spec — places where the
build technically works but no longer matches what was actually asked for.
This is a literal, line-by-line compliance check, not a general critique.

---

```
You are auditing this codebase against its original design specification.
Your job is not to judge whether the app is "good" — it's to catch every
place where the implementation quietly diverged from what was specified,
even in small ways. Be literal and exhaustive. Assume drift happened
somewhere; find it.

## 1. Color compliance (hard constraint check)

- Search every component and stylesheet for any color usage that is not
  pure black, pure white, or an alpha/opacity variant of those two
  (e.g. grep for `bg-`, `text-`, `border-`, `ring-`, `fill-`, `stroke-`
  classes and hex/rgb values across the codebase).
- Flag every instance of a non-monochrome color, however minor — a default
  browser focus ring, a Lucide icon rendering with unintended fill, a
  third-party component (e.g. shadcn) bringing its own default theme colors,
  a favicon, a `console` warning styled in color, anything.
- Confirm dark/light mode is implemented as true inversion (canvas/ink swap)
  and not as a second, separately-designed palette.

## 2. Typography & spacing compliance

- Confirm hierarchy is built with weight/size/tracking/whitespace only —
  flag any place a design decision reaches for color, a shadow, or a badge
  instead.
- Check whitespace is actually generous where the spec calls for it, not
  just "not cramped" — compare against the stated aesthetic goal directly.
- Flag any rounded-corner-heavy, shadow-heavy, or gradient-based styling
  that contradicts the "hairline borders over shadows" rule.

## 3. Motion compliance

- Confirm every animation uses Framer Motion `layout` / `AnimatePresence`
  as specified, and that easing is "quiet" (no bounce, spring overshoot,
  or elastic effects) unless explicitly requested.
- Confirm the grid reflow (add/re-cluster/mastery-exit) doesn't cause a
  visible layout jump.

## 4. Feature-for-feature spec check

Go through the original spec section by section and confirm, for each
requirement, one of three outcomes — state which one explicitly:
- ✅ Implemented as specified
- ⚠️ Implemented but diverges (describe exactly how, and whether the
  divergence was ever mentioned or just happened silently)
- ❌ Missing entirely

Specifically verify:
- Word card shows exactly the specified fields — no more, no fewer.
- Clustering creates new clusters when nothing fits, not a fallback
  "Uncategorized" bucket (unless the spec explicitly allows that).
- Mastery flow: animation, tally update, archive move — all three happen,
  not just one or two.
- Manual re-clustering (drag or dropdown) actually persists after reload.
- Keyboard shortcut works from every app state it's supposed to, not just
  from the initial screen.

## 5. Silent scope additions

Flag anything in the codebase that was NOT in the spec at all — a feature,
a UI element, a library, an animation — added without being asked for.
Unrequested additions are drift too, even if they seem like improvements.
State what was added and why it wasn't authorized by the spec.

## Output format

Organize findings under the five headings above. For each finding:
- **What the spec says** (quote or paraphrase the exact requirement)
- **What the code actually does**
- **Verdict**: compliant / minor drift / major drift / missing / unauthorized addition
- **Fix**, if one is needed

End with a compliance summary: X/N requirements fully met, list anything
that needs a decision from me before you change it (in case a divergence
was actually an intentional improvement worth keeping).
```
