# openclaw-ops: Next Actions for Incoming Agent

> Priority order. Work top-down.
> Updated: 2026-02-27 (v0.2 roadmap definition)

---

## T-004: Extract shared utilities into a common module

**GitHub Issue:** [#1](https://github.com/homeofe/openclaw-ops/issues/1)
**Priority:** HIGH

**Goal:** Eliminate duplicated utility functions between index.ts and extensions/phase1-commands.ts.

**What to do:**
1. Create `lib/utils.ts` exporting: `expandHome`, `safeExec`, `runCmd`, `latestFile`, `formatBytes`, `checkGatewayStatus`
2. Refactor `index.ts` to import from `lib/utils.ts`
3. Refactor `extensions/phase1-commands.ts` to import from `lib/utils.ts`
4. Unify the `runCmd` default timeout (currently 120s in index.ts vs 30s in phase1-commands.ts)
5. Update `tsconfig.json` include paths if needed
6. Verify all commands still work

**Definition of done:**
- [ ] No duplicated utility functions between files
- [ ] All existing commands still work after refactor
- [ ] New extensions can import shared utilities from one location

---

## T-005: Add test infrastructure and basic command tests

**GitHub Issue:** [#2](https://github.com/homeofe/openclaw-ops/issues/2)
**Priority:** HIGH
**Depends on:** T-004 (easier to test shared utilities once extracted)

**What to do:**
1. Add vitest as a dev dependency
2. Add `"test": "vitest run"` to package.json scripts
3. Write unit tests for pure utility functions (expandHome, formatBytes, latestFile)
4. Write integration tests for command handlers with mocked exec/spawn
5. Verify `npm test` passes

**Definition of done:**
- [ ] `npm test` runs and passes
- [ ] At least 5 unit tests + 2 command handler tests
- [ ] CI-friendly (no interactive prompts, no filesystem side effects)

---

## T-007: Fix Windows disk usage detection in /health

**GitHub Issue:** [#4](https://github.com/homeofe/openclaw-ops/issues/4)
**Priority:** MEDIUM

**What to do:**
1. Replace deprecated `wmic` with PowerShell `Get-PSDrive`
2. Detect correct drive letter from workspace path
3. Show used/total/percentage format
4. Graceful fallback if PowerShell unavailable

---

## T-006: Implement /config command

**GitHub Issue:** [#3](https://github.com/homeofe/openclaw-ops/issues/3)
**Priority:** MEDIUM
**Depends on:** T-004 (should use shared utilities)

**What to do:**
1. Create new command handler in `extensions/phase2-commands.ts`
2. Show current config, resolved paths, environment info
3. Validate against JSON schema
4. Mask secrets in output
5. Register in main register function
6. Update README.md

---

## T-003: Fix triage CI cross-repo permissions

**GitHub Issue:** [#5](https://github.com/homeofe/openclaw-ops/issues/5)
**Priority:** LOW
**Blocked by:** Requires PAT with repo scope set as TRIAGE_GH_TOKEN secret

**What to do once unblocked:**
1. Create fine-grained PAT scoped to homeofe/openclaw-* repos with issues:write
2. Add as TRIAGE_GH_TOKEN repository secret
3. Re-enable schedule trigger in workflow YAML
4. Test with manual dispatch

---

## Recently Completed

| Item | Resolution |
|------|-----------|
| Phase 1 commands (/health, /services, /logs, /plugins) | Implemented 2026-02-27, commit 72c5109 |
| v0.2 roadmap definition | Defined 2026-02-27, 5 GitHub issues created |
| /cron + /privacy-scan | Created 2026-02-24 |
| /limits | Created 2026-02-24 |
| /release + /handoff | Created 2026-02-25 |
| /staging-smoke | Created 2026-02-25 |
| openclaw.extensions patches | Applied to 5 repos 2026-02-25 |
| Triage CI | Suspended 2026-02-26 (403 errors) |
| AAHP v3 migration | Completed 2026-02-26 |

---

## Reference: Key File Locations

| What | Where |
|------|-------|
| Main entry point | `index.ts` |
| Phase 1 extensions | `extensions/phase1-commands.ts` |
| Plugin manifest | `openclaw.plugin.json` |
| Cron scripts | `cron/scripts/*.sh` |
| Cron reports | `cron/reports/*` |
| Release checklist | `RELEASE.md` |
| Failover state | `memory/model-ratelimits.json` |
| CI workflow | `.github/workflows/openclaw-triage-labels.yml` |
| Triage script | `scripts/triage_labels.py` |
