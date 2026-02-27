# openclaw-ops: Build Dashboard

> Single source of truth for build health, test coverage, and pipeline state.
> Updated by agents at the end of every completed task.

---

## Purpose

Operational commands for OpenClaw:
- `/cron` dashboard (crontab + systemd user timers + scripts + latest reports)
- `/privacy-scan` runner (report-only)
- `/limits` (current limit windows)
- `/release` (QA gate checklist)
- `/handoff` (recent handoff log tail)
- `/staging-smoke` (sequential staging installs for all openclaw-* repos)

---

## Key Paths

| Path | Purpose |
|------|---------|
| `~/.openclaw/workspace` | OpenClaw workspace |
| `cron/scripts/*.sh` | Cron scripts |
| `cron/reports/*` | Cron reports |
| `memory/model-ratelimits.json` | Failover limit state |

---

## Safety Rules

- Never print secrets in command output
- Privacy scan reports filenames only (never matched lines)
- `/limits` reports windows/ETAs (cooldowns, expiry), not model list

---

## Open Tasks

| ID | Task | Priority | Blocked by | Ready? |
|----|------|----------|-----------|--------|
| T-001 | Improve /limits output | MEDIUM | - | Ready |
| T-002 | Add cooldown detection from model-failover | MEDIUM | - | Ready |
| T-003 | Fix and re-enable triage CI | LOW | 403 permission issue | Blocked |
