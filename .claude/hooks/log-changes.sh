#!/usr/bin/env bash
#
# Appends a dated entry to the "Change log" section of ARCHITECTURE-AUDIT.md
# whenever the working tree has changed since the last entry.
#
# Wired up as a Stop hook in .claude/settings.json, so it runs at the end of
# every turn. It records WHAT changed. The WHY — the reasoning, the trade-offs,
# the measurements — is written into the body of the audit by hand; a shell
# script cannot know any of that.
#
# TWO GUARDS, both load-bearing:
#
#   1. ARCHITECTURE-AUDIT.md is excluded from the change set. Without this the
#      hook's own append makes the tree dirty, so the next Stop sees a change
#      and appends again, forever, even on turns where nothing happened.
#
#   2. A fingerprint of the change set is cached in .claude/.audit-log-state.
#      Files stay dirty until they are committed, so without this every single
#      turn would append an identical entry for the same uncommitted work.
#      An entry is written only when the set of changed files actually differs
#      from the last one logged.
#
# Exits 0 in every path — a logging hook must never block or fail a turn.

set -u

# Self-locating: the repo root is two levels up from .claude/hooks/, so this
# works no matter where the hook is invoked from and survives the project being
# moved or cloned elsewhere. Do not hardcode an absolute path here.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd) || exit 0
REPO=$(cd "$SCRIPT_DIR/../.." 2>/dev/null && pwd) || exit 0
cd "$REPO" 2>/dev/null || exit 0

AUDIT="ARCHITECTURE-AUDIT.md"
STATE=".claude/.audit-log-state"

command -v git >/dev/null 2>&1 || exit 0
[ -f "$AUDIT" ] || exit 0

# Guard 1: what changed, ignoring the audit itself.
# -uall names each new file instead of collapsing a whole untracked directory to
# one "?? .claude/" line, which told you nothing about what was actually added.
# Safe here: node_modules and .next are gitignored, so it does not explode.
CHANGED=$(git status --porcelain -uall -- . ":(exclude)$AUDIT" 2>/dev/null)
[ -z "$CHANGED" ] && exit 0

# Guard 2: skip if this is the same change set already logged.
FINGERPRINT=$(printf '%s' "$CHANGED" | git hash-object --stdin 2>/dev/null)
[ -z "$FINGERPRINT" ] && exit 0
if [ -f "$STATE" ] && [ "$(cat "$STATE" 2>/dev/null)" = "$FINGERPRINT" ]; then
  exit 0
fi

STAMP=$(date "+%Y-%m-%d %H:%M")
HEAD_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "no commits")
COUNT=$(printf '%s\n' "$CHANGED" | grep -c .)

{
  printf '\n### %s — %s file(s) changed · at `%s`\n\n' "$STAMP" "$COUNT" "$HEAD_SHA"
  # Porcelain codes: M modified, A added, D deleted, R renamed, ?? untracked.
  printf '%s\n' "$CHANGED" | sed 's/^/    /'
  printf '\n'
} >> "$AUDIT"

mkdir -p "$(dirname "$STATE")" 2>/dev/null
printf '%s' "$FINGERPRINT" > "$STATE"

exit 0
