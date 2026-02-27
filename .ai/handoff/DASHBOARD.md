# openclaw-ops: Build Dashboard

> Single source of truth for build health, test coverage, and pipeline state.
> Updated by agents at the end of every completed task.

---

## Purpose

Operational commands for OpenClaw:
- `/health` - Quick system health check (gateway, resources, plugins, errors)
- `/services` - Show all OpenClaw profiles and service status
- `/logs [service] [lines]` - View gateway or plugin logs
- `/plugins` - Detailed plugin dashboard with versions and workspace info
- `/cron` - Cron dashboard (crontab + systemd user timers + scripts + latest reports)
- `/privacy-scan` - GitHub privacy scanning (report-only)
- `/limits` - Provider auth expiry + observed cooldown windows
- `/release` - Staging gateway QA checklist
- `/staging-smoke` - Sequential staging installs for all openclaw-* repos
- `/handoff` - Recent handoff log tail

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

## v0.2 Roadmap - GitHub Issues

| Issue | Title | Labels | Priority | Status |
|-------|-------|--------|----------|--------|
| [#1](https://github.com/homeofe/openclaw-ops/issues/1) | Extract shared utilities into a common module | enhancement | High | Open |
| [#2](https://github.com/homeofe/openclaw-ops/issues/2) | Add test infrastructure and basic command tests | enhancement | High | Open |
| [#3](https://github.com/homeofe/openclaw-ops/issues/3) | Implement Phase 2 /config command | enhancement | Medium | Open |
| [#4](https://github.com/homeofe/openclaw-ops/issues/4) | Fix Windows disk usage detection in /health | bug | Medium | Open |
| [#5](https://github.com/homeofe/openclaw-ops/issues/5) | Fix triage CI workflow cross-repo 403 errors | bug | Low | Open |

---

## Open Tasks (Legacy Tracking)

| ID | Task | Priority | Blocked by | Ready? | GitHub Issue |
|----|------|----------|-----------|--------|--------------|
| T-001 | Improve /limits output | MEDIUM | - | Ready | Covered by #1 refactor |
| T-002 | Add cooldown detection from model-failover | MEDIUM | - | Ready | Covered by #1 refactor |
| T-003 | Fix and re-enable triage CI | LOW | 403 permission issue | Blocked | [#5](https://github.com/homeofe/openclaw-ops/issues/5) |
| T-004 | Extract shared utilities | HIGH | - | Ready | [#1](https://github.com/homeofe/openclaw-ops/issues/1) |
| T-005 | Add test infrastructure | HIGH | - | Ready | [#2](https://github.com/homeofe/openclaw-ops/issues/2) |
| T-006 | Implement /config command | MEDIUM | T-004 | After #1 | [#3](https://github.com/homeofe/openclaw-ops/issues/3) |
| T-007 | Fix Windows disk detection | MEDIUM | - | Ready | [#4](https://github.com/homeofe/openclaw-ops/issues/4) |
