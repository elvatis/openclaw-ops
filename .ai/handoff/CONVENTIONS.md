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
