---
name: commit-and-deploy
description: Verifies, commits, and pushes working code to GitHub, then runs a Vercel preview deploy as a build safety-net. Production deploy always requires separate explicit confirmation.
version: 1.0.0
---

# Commit & Deploy Workflow Skill

## Philosophy
GitHub push = "save my work." Vercel preview = "prove it actually builds/runs somewhere real, not just on my machine." Production = a *separate, deliberate* decision, never bundled into the automatic flow.

## Trigger Conditions
- Automatically after a code change, feature, or bugfix is implemented **and confirmed working**.
- Manually when the user runs `/commit` or `/ship` or asks to save/push progress.
- Production promotion **never** triggers automatically — always requires the user to say something like "deploy to prod" / "ship to production" in the same request.

---

## Execution Protocol

Stop and report at any failed step. Never skip ahead.

### Step 1: Repo Safety Check
1. `git status -s` — inspect untracked/modified files.
2. `git branch --show-current` — confirm branch. If on `main`/`master` and the repo normally uses feature branches, ask before continuing.
3. **Never stage or commit:**
   - Secrets: `.env`, `.env.*`, `*.pem`, `*.key`, `*.crt`, `credentials*.json`
   - Local data: `*.sqlite`, `*.db`, `.local/`
   - Build artifacts/deps: `node_modules/`, `dist/`, `build/`, `.venv/`, `__pycache__/`
4. If a sensitive/untracked file matching the above shows up, stop, alert the user, add it to `.gitignore` before proceeding.

### Step 2: Verification Gate
- Run the project's real check from `package.json` `scripts` (or existing CI/lint config) — don't guess a generic command:
  - TS/JS: `tsc --noEmit`, `lint`, or `build`
  - Python: `pytest -q` or `py_compile`
- **On failure:** stop, report the exact error, do not commit or push.

### Step 3: Targeted Staging & Commit
- Stage only the files relevant to the task, by explicit path — never `git add -A` / `git add .`.
- `git diff --cached` — re-scan the actual diff content for secrets (filename check in Step 1 won't catch a key pasted inside a tracked file).
- Commit using Conventional Commits format: `type(scope): summary`, imperative mood, ≤72-char summary line.

### Step 4: Push to GitHub
- `git push origin <current-branch>`.
- If the branch has no upstream yet, use `git push -u origin <current-branch>`.
- If push is rejected (diverged history), stop and report — never force-push (`--force`/`-f`) without explicit user instruction, since it can destroy remote history.

### Step 5: Vercel Preview — the Safety Net
This step exists to catch "works on my machine" problems: missing env vars, build config drift, platform-specific issues.
1. Confirm the project is linked to Vercel (`.vercel/project.json` exists). If not, stop and tell the user to run `vercel link` — don't attempt to auto-link.
2. Run `vercel` (no flags) to create a **preview** deployment — this never touches production.
3. Report the preview URL and build result to the user.
4. **If the preview build fails:** report it clearly. The GitHub push in Step 4 already happened (your work is saved) — but flag that the pushed code doesn't build cleanly on Vercel, since local and CI environments can differ.

### Step 6: Production (only if explicitly requested)
- Only run if the user's request explicitly says to deploy to production in this same interaction — never inferred from context or "it's ready" language alone.
- Confirm one more time in chat before running: state what will go live and on what URL.
- `vercel --prod`.
- Report the production URL and note the prior deployment for rollback reference (`vercel rollback` or via dashboard).

---

## Safety Boundaries (never automatic)
- Never force-push.
- Never promote a preview to production without explicit, same-request confirmation.
- Never modify Vercel env vars (`vercel env add/rm`) without explicit instruction.
- Never deploy/push if the verification gate (Step 2) or the Vercel preview build (Step 5) fails — surface the error instead.
- If the project has no Vercel link, Steps 1–4 (commit + push) still complete normally; only Step 5+ is skipped, with a clear note to the user that no safety-net build check ran.
