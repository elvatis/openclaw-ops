# openclaw-ops — DASHBOARD

## Purpose
Operational commands for OpenClaw:
- `/cron` dashboard (crontab + systemd user timers + scripts + latest reports)
- `/privacy-scan` runner (report-only)
- `/limits` (current limit windows)

## Safety rules
- Never print secrets in command output.
- Privacy scan reports list filenames only for secret-like matches, never matched lines.
- `/limits` should report *windows/ETAs* (cooldowns, expiry), not dump all model names.

## Key paths
- Workspace: `~/.openclaw/workspace`
- Cron scripts: `cron/scripts/*.sh`
- Reports: `cron/reports/*`
- Failover limit state (if enabled): `memory/model-ratelimits.json`

## Release checklist
- Bump version in `package.json` + `openclaw.plugin.json`
- `openclaw plugins install -l ~/.openclaw/workspace/openclaw-ops`
- `openclaw gateway restart`
- Smoke test: `/cron`, `/limits`, `/privacy-scan`
