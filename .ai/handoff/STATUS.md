# openclaw-ops: Current State of the Nation

> Last updated: 2026-02-26 by claude-sonnet-4.6 (AAHP v3 migration)
> Commit: 3789a72
>
> **Rule:** This file is rewritten (not appended) at the end of every session.
> It reflects the *current* reality, not history. History lives in LOG.md.

---

<!-- SECTION: summary -->
Active plugin. /cron, /privacy-scan, /limits, /release, /handoff, /staging-smoke all implemented. Triage CI suspended. Staging smoke runner working.
<!-- /SECTION: summary -->

<!-- SECTION: build_health -->
## Build Health

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` | (Unknown) | Not recently verified |
| `npm test` | (Unknown) | Not configured |
| `lint` | (Unknown) | Not configured |

<!-- /SECTION: build_health -->

---

<!-- SECTION: commands -->
## Commands

| Command | Status | Notes |
|---------|--------|-------|
| `/cron` | Active | Shows crontab + systemd timers + scripts + latest reports |
| `/privacy-scan` | Active | Report-only, filenames only for secret matches |
| `/limits` | Active | Shows cooldown windows + auth expiry ETAs |
| `/release` | Active | Prints QA gate checklist |
| `/handoff` | Active | Shows recent handoff log tail |
| `/staging-smoke` | Active | Sequential staging installs for all openclaw-* repos |

<!-- /SECTION: commands -->

---

<!-- SECTION: what_is_missing -->
## What is Missing

| Gap | Severity | Description |
|-----|----------|-------------|
| /limits improvement | MEDIUM | Display cooldowns + auth expiry only, avoid dumping model list |
| Active cooldown detection | MEDIUM | Best-effort detection from model-failover state |
| Triage CI | LOW | Suspended - 403 cross-repo failures, needs re-enable with fix |
| openclaw-docker staging | MEDIUM | Failed staging-smoke (package.json missing openclaw.extensions) |

<!-- /SECTION: what_is_missing -->

---

<!-- SECTION: safety_rules -->
## Safety Rules

- Never print secrets in command output
- Privacy scan reports list filenames only for secret-like matches, never matched lines
- `/limits` should report windows/ETAs (cooldowns, expiry), not dump all model names

<!-- /SECTION: safety_rules -->

---

## Trust Levels

- **(Verified)**: confirmed by running code/tests
- **(Assumed)**: derived from docs/config, not directly tested
- **(Unknown)**: needs verification
