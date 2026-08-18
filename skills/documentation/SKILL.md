---
name: documentation
description: Use when the user asks to write documentation, a README, explain the codebase for other developers, or create handoff/onboarding docs in plain language. Triggers on phrases like "document this," "write a README," "explain this for other devs," "make this easy to understand."
---

# Documentation Pass — Layman / Handoff-Friendly — Claude Code Prompt

Use this once the app is stable. The goal is documentation that lets a
developer who has NEVER seen this codebase understand it quickly — without
needing to already know the project's jargon, decisions, or history.
Write for a smart engineer who is new here, not for someone who already
knows what "Cluster Boxes" or "Essence field" means.

---

```
You are writing documentation for this codebase aimed at a developer who
is joining the project today and has zero prior context. Assume they are
competent (knows React/TypeScript generally) but knows NOTHING about this
specific app — not its purpose, not its internal terminology, not why any
decision was made. Write like you're explaining it out loud to a smart
teammate on their first day, not like you're writing a formal spec.

## Rules for how you write

- Plain English first, technical detail second. Every section should be
  readable by someone skimming, then reward someone who reads closely.
- Define every project-specific term the first time it's used (e.g. what
  is a "Cluster," what does "mastered" mean in this app's data model) —
  don't assume the reader has read the original spec.
- Explain WHY, not just WHAT. "This uses Zustand with persist middleware"
  is not enough — say why persistence matters here (so a user's word list
  survives a page reload) and why this approach was chosen over alternatives
  if there's a reason worth knowing.
- Use short sentences and concrete examples over abstract description.
  Prefer "when a user adds the word 'evasive,' here's what happens step by
  step" over a purely structural description.
- No marketing language, no "seamlessly," no "robust architecture" — just
  clear, honest, plain description, including known limitations.
- Every code snippet you include should be minimal and directly tied to
  the point being explained — not a full file dump.

## Files to produce

### 1. `README.md` (project root)
- One paragraph: what this app does and who it's for, in plain language.
- Quick start: exact commands to install, run, and build — tested, not
  assumed.
- Screenshot or plain description of the core flow (add word → see
  breakdown → see it clustered → mark mastered).
- Environment variables / API keys needed, and what happens if they're
  missing (does it fall back gracefully, or break?).
- Link to the other docs below.

### 2. `docs/ARCHITECTURE.md`
- A plain-language walkthrough of how the pieces fit together — written as
  a narrative ("when the user types a word and hits enter, here's the path
  the data takes through the app"), not just a file tree.
- A simple diagram (ASCII is fine) showing data flow: input → parser →
  store → UI.
- Explain the store (Zustand) in plain terms: what state it holds, what
  each action does, in one sentence each — no need to reprint the types,
  just explain their purpose.
- Explain the parser abstraction: why there are two implementations
  (LLM-backed and fallback), and how the app decides which to use.
- One section: "if you need to change X, start in file Y" — a practical
  map for common changes (add a new field to a word card, change how
  clustering works, swap the LLM provider, etc.)

### 3. `docs/GLOSSARY.md`
- Every project-specific term defined in one line each: Cluster Box,
  Essence, Vibe, Mastered, Archive, etc. — whatever terminology this
  specific app actually uses in its code and UI.
- Include the plain-English meaning AND where it lives in the code
  (e.g. "Essence — the one-sentence plain definition; type field
  `WordEntry.essence`").

### 4. `docs/DECISIONS.md`
- A short list of notable choices and the plain-language reason behind
  each — e.g. "why black/white only," "why Zustand over Context," "why
  clusters are dynamic instead of a fixed list." One paragraph max per
  decision. Skip decisions that don't need explaining (obvious ones).
- If you don't actually know the reason behind a decision already in the
  code, say so explicitly rather than inventing a plausible-sounding one —
  flag it as "reason unclear, confirm with original author" instead of
  guessing.

## What NOT to do

- Don't reproduce the full spec or full type definitions verbatim — link
  or summarize instead of pasting large blocks.
- Don't write docs for features that don't actually exist in the code yet
  — describe what IS built, and separately note what's planned/missing if
  relevant.
- Don't use audit/checklist formatting here — this is prose meant to be
  read, not a report to review.

## After writing

List the files you created/updated, and flag anything you weren't
confident enough about to document accurately — better to leave a
"TODO: confirm this" note than to write something plausible but wrong.
```
