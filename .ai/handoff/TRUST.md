# openclaw-ops-elvatis: Trust Register

> Tracks verification status of critical system properties.

---

## Confidence Levels

| Level | Meaning |
|-------|---------|
| **verified** | An agent executed code, ran tests, or observed output to confirm this |
| **assumed** | Derived from docs, config files, or chat, not directly tested |
| **untested** | Status unknown; needs verification |

---

## Build System

| Property | Status | Last Verified | TTL | Expires | Agent | Notes |
|----------|--------|---------------|-----|---------|-------|-------|
| `npm run build` passes | untested | - | - | - | - | Not verified recently |
| `npm test` passes | untested | - | - | - | - | Not configured |

---

## Plugin Commands

| Property | Status | Last Verified | TTL | Expires | Agent | Notes |
|----------|--------|---------------|-----|---------|-------|-------|
| `/cron` runs correctly | assumed | 2026-02-24 | 14d | 2026-03-10 | - | Created + smoke tested |
| `/privacy-scan` runs | assumed | 2026-02-24 | 14d | 2026-03-10 | - | Report-only mode |
| `/limits` runs | assumed | 2026-02-24 | 14d | 2026-03-10 | - | Shows cooldown windows |
| `/release` prints gate | assumed | 2026-02-25 | 14d | 2026-03-11 | - | RELEASE.md gate |
| `/staging-smoke` runs | assumed | 2026-02-25 | 7d | 2026-03-04 | - | Sequential installs |
| Triage CI workflow | untested | - | - | - | - | Suspended (403 errors) |

---

## Security

| Property | Status | Last Verified | TTL | Expires | Agent | Notes |
|----------|--------|---------------|-----|---------|-------|-------|
| No secrets in command output | assumed | 2026-02-25 | 14d | 2026-03-11 | - | Privacy scan is report-only |
| No model names in /limits | untested | - | - | - | - | Improvement needed (T-001) |

---

## Update Rules (for agents)

- Change `untested` - `verified` only after **running actual code/tests**
- Never downgrade `verified` without explaining why in `LOG.md`
