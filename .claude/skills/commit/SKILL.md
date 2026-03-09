---
name: commit
description: Use this skill when the user asks to commit changes to the myappcube website.
---

# Smart Commit — myappcube web

Create a git commit following Conventional Commits for this project.

## Steps

1. Run `git status` and `git diff --staged`. If nothing staged, run `git diff` and check untracked files.
2. Run `git log --oneline -5` to see recent commit style.
3. Stage relevant files (never `git add -A` blindly — check for secrets).
4. Determine type:
   - `feat:` — new page or section
   - `fix:` — bug fix
   - `style:` — visual/layout changes only
   - `content:` — text/copy updates
   - `chore:` — config, CNAME, meta changes

5. Write message: lowercase, imperative, under 72 chars, no period.
   Example: `feat: add privacy policy page for el infiltrado`

6. Commit:
```bash
git commit -m "$(cat <<'EOF'
<type>: <description>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

7. Confirm with `git log --oneline -1`.
