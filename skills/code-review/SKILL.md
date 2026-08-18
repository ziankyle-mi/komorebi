---
name: code-review
description: Reviews code changes for bugs, style issues, edge cases, security vulnerabilities, performance bottlenecks, and best practices. Triggers on phrases like "review this code," "do a code review," "check my changes," "look for bugs in this diff."
---

# Code Review Skill

When reviewing code, follow this systematic evaluation process:

## 1. Correctness
- Determine what the code is supposed to do based on specifications or user requirements.
- Check whether the implementation actually achieves that intended goal.
- Look for incorrect assumptions, logic errors, and off-by-one indexing errors.
- Confirm that async/await, promises, and race conditions are handled reliably.

## 2. Edge Cases
- **Empty & Null Inputs**: Empty strings, empty arrays, `undefined`, `null`.
- **Invalid Inputs**: Malformed data shapes, special characters, extreme values.
- **Boundary Conditions**: Zero, single elements, array bounds, maximum lengths.
- **Error Handling**: Graceful failure modes rather than unhandled rejections or silent white screens.

## 3. Security
- Look for injection vulnerabilities (XSS, SQLi, command injection).
- Check authentication, authorization, and permission checks.
- Scan for exposed secrets, hardcoded API keys, or private tokens.
- Ensure untrusted client or user input is sanitized before rendering or storing.

## 4. Performance
- Identify unnecessary re-renders or missing memoization in hot render paths.
- Check for inefficient algorithms ($O(n^2)$ loops where $O(n)$ or $O(1)$ maps apply).
- Avoid redundant network requests, disk I/O, or database queries.
- Ensure bundle size is not bloated by importing unused heavy libraries.

## 5. Maintainability & Code Quality
- Check readability and self-documenting naming conventions.
- Ensure architectural consistency with existing project patterns and state conventions.
- Remove unnecessary complexity, premature abstractions, and dead code.
- Verify TypeScript types are doing real compile-time work rather than loose `any` casts.

## 6. Feedback Structure
For every important finding:
- **Location**: Specific file and line number.
- **Problem**: Stated plainly and objectively.
- **Impact / Why it matters**: The real-world consequence (crash, data loss, leak, slow performance).
- **Concrete Recommendation**: Provide a specific, drop-in fix rather than vague advice.
- Prioritize high-risk blockers and functional bugs over minor style preferences.

## 7. Final Verification
Before completing the review:
- Re-evaluate the highest-risk findings to verify evidence.
- Clearly distinguish confirmed bugs from optional refactoring suggestions.
- Provide a summary verdict (e.g. Ready to ship, Needs fixes, or Blocked).
