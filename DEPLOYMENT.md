# Deployment Guide — Get the Site Online (First Time)

This walks you through publishing the site to **https://l2-t2.github.io** for the first time. You only do Parts 1–3 once. After that, updating the site is just `git push` (see [PUBLISHING.md](PUBLISHING.md)).

```
your computer ── git push ──▶ GitHub repo (L2-T2.github.io) ──▶ GitHub Actions builds ──▶ live at l2-t2.github.io
```

You do **not** build the site yourself. GitHub installs Node + Pandoc, runs `hexo generate`, and publishes the result. The build recipe is already in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

---

## Before you start

- A **GitHub account** with the username **`L2-T2`** (this site is wired to `https://github.com/L2-T2`).
- **Git** installed (you already have it).
- The repository must be **public** and named **exactly `L2-T2.github.io`** — that exact name is what makes GitHub serve it at the root domain `l2-t2.github.io`. Any other name turns it into a project site at a sub-path and the links will break.
- Node.js + Pandoc are **not** required to deploy (only if you want to preview locally first).

---

## Part 1 — Create the GitHub repository

1. Go to **https://github.com/new**.
2. **Repository name:** `L2-T2.github.io`
3. **Visibility:** **Public**.
4. **Do not** add a README, `.gitignore`, or license (the project already has them — adding them here causes a conflict on first push).
5. Click **Create repository**. Leave that page open; you'll need the URL: `https://github.com/L2-T2/L2-T2.github.io.git`.

---

## Part 2 — Push the site from your computer

Open a terminal in the project folder and run the commands below.

```bash
cd /Users/l2-t2/Documents/Vscode/L2-T2.github.io-main

git init                 # turn this folder into a git repository
git branch -M main       # name the branch "main" (the workflow deploys from main)
git add .                # stage all source files (.gitignore keeps node_modules/, public/, db.json out)
git commit -m "Initial site"

git remote add origin https://github.com/L2-T2/L2-T2.github.io.git
git push -u origin main
```

> **Authentication:** when `git push` asks for a password, GitHub no longer accepts your account password — paste a **Personal Access Token** instead.
> Create one at **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**, tick the **`repo`** scope, and use it as the password (username stays `L2-T2`). macOS will remember it after the first time.
> Easier alternatives: install the **`gh`** CLI and run `gh auth login`, or use the **GitHub Desktop** app to publish the folder.

After this, your code is on GitHub but the site isn't served yet — that's Part 3.

---

## Part 3 — Turn on GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. That's all there is to configure — there's nothing to pick for branch or folder in this mode.

---

## Part 4 — Watch the deploy and verify

1. Open the **Actions** tab of the repository.
2. You'll see a run named **"Deploy site to GitHub Pages."** Click it to watch the `build` then `deploy` jobs. It takes about **1–2 minutes**.
3. A green check means success. Open **https://l2-t2.github.io/** — your site is live.

> **If the very first run failed** because Pages wasn't switched on yet: after finishing Part 3, go to the **Actions** tab → open the latest run → **Re-run all jobs** (or just make any small commit and push again). It will pass the second time.

---

## Updating the site later

Every later change is just three commands — no GitHub settings to touch again:

```bash
git add .
git commit -m "describe your change"
git push origin main
```

GitHub rebuilds and redeploys automatically. For writing and publishing posts, see **[PUBLISHING.md](PUBLISHING.md)**.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `git push` rejected / asks for password endlessly | Use a **Personal Access Token** as the password (see Part 2), or run `gh auth login`, or use GitHub Desktop. |
| Push rejected: "updates were rejected / remote contains work you do not have" | You added a README/license when creating the repo. Run `git pull --rebase origin main` then `git push`, or recreate the repo empty. |
| Actions run is **red** at the *deploy* step | GitHub Pages source isn't set to **GitHub Actions** — do Part 3, then re-run the workflow. |
| Actions run is **red** at `npm ci` | Make sure `package-lock.json` was committed (it should be — it's not git-ignored). |
| Site loads but is **unstyled / 404s on links** | Confirm the repo is named exactly `L2-T2.github.io` and `_config.yml` has `url: https://l2-t2.github.io`. |
| "There isn't a GitHub Pages site here" | The first deploy hasn't finished, or Pages source isn't GitHub Actions yet. Check the Actions tab and Part 3. |
| Pages settings has no "GitHub Actions" option | The repo must be **public** (or you need GitHub Pro for private Pages). |

---

## One-time checklist

- [ ] GitHub repo created, **public**, named exactly `L2-T2.github.io`, with no auto-added README/license.
- [ ] `git init` → `git add .` → `git commit` → `git push -u origin main` succeeded.
- [ ] **Settings → Pages → Source = GitHub Actions**.
- [ ] **Actions** tab shows a green "Deploy site to GitHub Pages" run.
- [ ] **https://l2-t2.github.io/** loads correctly.
