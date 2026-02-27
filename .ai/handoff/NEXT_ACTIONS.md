# openclaw-ops: Next Actions for Incoming Agent

> Priority order. Work top-down.
> Updated: 2026-02-26 (AAHP v3 migration)

---

## T-001: Improve /limits command

**Goal:** Display cooldowns + auth expiry only, avoid dumping the full configured model list.

**Context:**
- `/limits` currently may dump all model names (privacy/verbosity issue)
- Should only report: active cooldowns with ETA, auth expiry windows
- State source: `memory/model-ratelimits.json` (if model-failover enabled)

**What to do:**
1. Open the `/limits` command handler
2. Filter output to show only: active cooldown windows, auth token expiry, rate limit reset ETAs
3. Remove or hide the full model list from output
4. Test: run `/limits` and verify output is minimal and safe

**Files:**
- Command handler file for `/limits` (check package.json for entry point)

**Definition of done:**
- [ ] `/limits` output shows only windows/ETAs
- [ ] No model list in output
- [ ] STATUS.md updated

---

## T-002: Add active cooldown detection from model-failover state

**Goal:** Best-effort detection of active cooldowns from model-failover state file.

**Context:**
- model-failover writes state to `~/.openclaw/workspace/memory/model-ratelimits.json`
- `/limits` should read this file if present and surface active cooldowns

**What to do:**
1. Read `memory/model-ratelimits.json` if it exists
2. Parse active cooldowns (models with non-zero cooldown remaining)
3. Surface as: "Model X: cooldown expires in Y minutes"
4. Gracefully skip if file not found

**Definition of done:**
- [ ] `/limits` reads and parses model-failover state
- [ ] Active cooldowns shown with ETA
- [ ] Graceful fallback if file missing

---

## T-003: Fix and re-enable triage CI ⏳ Blocked

**Goal:** Re-enable the `openclaw-triage-labels` GitHub Actions workflow.

**Blocked by:** Need to resolve 403 cross-repo permission errors with GITHUB_TOKEN.

**What to do once unblocked:**
1. Investigate why GITHUB_TOKEN gets 403 on cross-repo issue updates
2. Options: use PAT with repo scope, or narrow scope to only the current repo
3. Update `.github/workflows/openclaw-triage-labels.yml`
4. Test with a manual dispatch
5. Re-enable scheduled trigger

---

## Recently Completed

| Item | Resolution |
|------|-----------|
| /cron + /privacy-scan | Created 2026-02-24 |
| /limits | Created 2026-02-24 |
| /release + /handoff | Created 2026-02-25 |
| /staging-smoke | Created 2026-02-25 |
| openclaw.extensions patches | Applied to 5 repos 2026-02-25 |
| Triage CI | Suspended 2026-02-26 (403 errors) |

---

## Reference: Key File Locations

| What | Where |
|------|-------|
| Cron scripts | `cron/scripts/*.sh` |
| Cron reports | `cron/reports/*` |
| Release checklist | `RELEASE.md` |
| Failover state | `memory/model-ratelimits.json` |
| Plugin manifest | `openclaw.plugin.json` |
| CI workflow | `.github/workflows/openclaw-triage-labels.yml` |
