---
name: vibe-code-audit
description: Use when the user asks to check if code is vibe-coded, looks AI-generated, is messy/inconsistent, or wants it cleaned up to read like a human wrote it. Triggers on phrases like "is this vibe coded," "make this look human," "clean up the code style," "organize this properly."
---

# Vibe-Code Audit & Humanization Pass — Claude Code Prompt

Use this to check whether the codebase "smells" AI-generated (inconsistent
patterns, over-engineering, dead abstractions, generic naming) and to make
it read like it was written and organized by an experienced human developer
working on a real team.

---

```
You are auditing this codebase for signs of being "vibe coded" — generated
quickly by an AI without real engineering judgment — and then restructuring
it to read like it was written by an experienced human developer on a real
team, working under normal conventions.

## Part 1 — Detect the vibe-coded smells

Go file by file and flag any of the following if present:

1. **Inconsistent conventions**
   - Mixed naming styles (camelCase vs snake_case in the same file,
     inconsistent component/file naming)
   - Some files use arrow functions, others use function declarations, with
     no reason for the difference
   - Import ordering/grouping that's different in every file

2. **Over-engineering / unnecessary abstraction**
   - Interfaces or wrapper functions with exactly one implementation and no
     plausible reason to expect a second
   - Generic/config-driven code where a direct, simple implementation would
     have been clearer and this is a small app
   - Utility functions used exactly once, inlined nowhere

3. **Under-engineering / missing real structure**
   - Business logic embedded directly in components instead of extracted
   - Magic strings/numbers repeated across files instead of named constants
   - No separation between data-fetching, state, and presentation

4. **Dead or vestigial code**
   - Commented-out blocks
   - Props, state fields, or exports that are never used anywhere
   - Leftover console.logs, TODOs with no ticket/context, placeholder text
     ("Lorem ipsum", "TODO: implement this properly")

5. **Generic AI tells**
   - Overly verbose comments that restate what the code obviously does
     (e.g. `// increment the counter` above `count++`)
   - Excessive defensive try/catch around code that can't realistically throw
   - Boilerplate that doesn't match how the rest of the file is written —
     e.g. one function has thorough error handling and JSDoc, the next
     (written moments later) has none
   - Component/variable names that are too on-the-nose and generic
     (`handleSubmitButtonClickEvent` instead of `submitWord`)

6. **Inconsistent error handling / logging style**
   - Some places throw, some return null, some return an error object —
     with no stated convention

For each issue found, report: file, what's wrong, why it reads as
AI-generated rather than deliberate, and severity (cosmetic / real risk).

## Part 2 — Humanize it

After the audit, refactor with these goals:

- **Pick one convention per category and apply it everywhere** (naming,
  error handling, file structure, comment style) — consistency is the
  single biggest signal of a human codebase.
- **Delete anything not in active use** — dead code, unused exports, unused
  props, placeholder comments.
- **Comment like a human, not a narrator** — comments should explain *why*
  a non-obvious decision was made, never restate *what* the next line does.
  If a comment doesn't teach the reader something they couldn't get from
  the code itself, delete it.
- **Match abstraction to actual scale** — remove speculative flexibility
  (config options, interfaces, factory patterns) that exists for
  hypothetical future needs no one has asked for. Add structure only where
  the current code is genuinely tangled.
- **Normalize file organization** — consistent import order, consistent
  placement of types/constants/helpers relative to the component that uses
  them, consistent file naming.
- **Write a realistic commit-style summary** of what changed and why, as if
  handing this off to a teammate in a PR description — not a changelog of
  "fixed bugs and improved code quality."

## Output

1. The audit findings (Part 1), as a list.
2. The refactored files.
3. A short PR-style summary of what you changed and the convention you
   standardized on for each category.

Do not just reformat — actually make a judgment call on the *right*
convention for this specific codebase and justify it in one sentence.
```
