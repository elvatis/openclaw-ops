# openclaw-ops-elvatis: Agent Conventions

> Every agent working on this project must read and follow these conventions.

---

## Language

- All code, comments, commits, and documentation in **English only**

## Code Style

- **TypeScript/JavaScript:** No strict TypeScript required unless existing tsconfig; Prettier formatting
- **Shell scripts:** POSIX-compatible, shellcheck-clean

## Branching & Commits

```
feat/<scope>-<short-name>    - new feature
fix/<scope>-<short-name>     - bug fix

Commit format:
  feat(scope): description [AAHP-auto]
  fix(scope): description [AAHP-fix]
```

## Architecture Principles

- **Report-only for destructive ops**: Privacy scan, QA runs - never auto-fix, report only
- **Safety-first for CI**: No auto-spawning fix agents, no auto-opening PRs
- **Staging gate**: All `openclaw-*` plugins must pass staging smoke before publish
- **Command output**: Never include model names, API keys, or internal paths in output

## What Agents Must NOT Do

- Push directly to `main`
- Write secrets or credentials into source files
- Print model names or API keys in command output
- Enable the triage CI job without fixing the 403 permission issue
- Use em dashes (`-`) anywhere in the codebase

---

*Update this file when conventions evolve.*

---

## 🚨 Release-Regel: Erst fertig, dann publishen (gilt für ALLE Plattformen)

**IMMER erst alles fertigstellen, danach publishen. Kein einziger Commit mehr dazwischen.**
Gilt für GitHub, npm, ClawHub, PyPI — egal ob ein Projekt auf einer oder mehreren Plattformen ist.
Sonst divergieren die Tarballs/Releases zwangsläufig.

### Reihenfolge (nie abweichen)
1. Alle Änderungen + Versionsbumps in **einem einzigen Commit** abschließen
2. `git push` → Plattform 1 (z.B. GitHub)
3. `npm publish` / `clawhub publish` / etc. — alle weiteren Plattformen
4. Kein weiterer Commit bis zum nächsten Release (außer reine interne Doku)

### Vor jedem Release: Alle Versionsstellen prüfen
```bash
grep -rn "X\.Y\.Z\|Current version\|Version:" \
  --include="*.md" --include="*.json" \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git
```
Typische vergessene Stellen: `README.md` Header, `SKILL.md` Footer, `package.json`,
`openclaw.plugin.json`, `.ai/handoff/STATUS.md` (Header + Plattform-Zeilen), Changelog-Eintrag.

### Secrets & private Pfade — NIEMALS in Repos
- Keine API Keys, Tokens, Passwörter, Secrets in Code oder Docs
- Keine absoluten lokalen Pfade (`/home/user/...`) in publizierten Dateien
- Keine `.env`-Dateien committen — immer in `.gitignore`
- Vor jedem Push: `git diff --staged` auf Secrets prüfen
