# Barracudas 3 — Claude Code Instructions

## Auto-commit & push after every task

After completing any task that modifies files in this project, automatically run:

```
git add .
git commit -m "Auto-update: [brief description of what was changed]"
git push origin main
```

- Do this after every completed task without asking for confirmation.
- The commit message should briefly describe what changed (e.g. "Auto-update: fix hero overlay on mobile").
- Always keep GitHub in sync with local changes automatically.
- Do NOT commit mid-task (e.g. between individual file edits that are part of the same task). Commit once when the full task is done.
