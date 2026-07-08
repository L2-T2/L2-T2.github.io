# Publishing Guide — How to Add a Post and Put It Online

This is the everyday workflow for adding content to **https://l2-t2.github.io**. If you only read one doc, read this one.

For the overall architecture, see [README.md](README.md).

---

## The mental model

You **never** build or upload the website by hand. You edit Markdown, push to GitHub, and a GitHub Actions robot rebuilds and publishes the site for you.

```
1. Write a Markdown file in source/_posts/
2. Preview locally  (npm run server)
3. git add / commit / push
4. GitHub Actions builds + deploys  →  live in ~1–2 minutes
```

There are four content types — **Learning Journals, Essay, Project, Technical Notes**. They are all just Markdown files in `source/_posts/`. The only thing that decides where a post appears is its `categories:` line.

---

## One-time setup (do this once per computer)

```bash
# 1. Install Node.js 18+      https://nodejs.org
# 2. Install Pandoc           https://pandoc.org/installing.html   (the Markdown engine this site uses)
# 3. In the project folder, install dependencies:
npm install
```

And once per repository, make sure GitHub Pages is set to deploy from Actions:
**GitHub → Settings → Pages → Build and deployment → Source = "GitHub Actions"**. (Details in [README.md](README.md#how-deployment-works).)

---

## TL;DR — publish a new learning journal in 6 lines

```bash
npx hexo new learning-journals "My New Journal"   # creates source/_posts/My-New-Journal.md
# …open that file, fill in the front matter, write your content…
npm run server                                    # preview at http://localhost:4000/learning-journals/
git add .
git commit -m "Add journal: My New Journal"
git push origin main                              # GitHub Actions deploys it automatically
```

The sections below explain each step.

---

## Step 1 — Create the post file

### Option A — use a scaffold (recommended)

`hexo new <type> "<Title>"` creates a file in `source/_posts/` pre-filled from the matching template in `scaffolds/`.

```bash
npx hexo new learning-journals "Martingale Convergence"    # a Learning Journals entry
npx hexo new essay             "On Reading Machines"       # an Essay entry
npx hexo new project           "Causal Discovery Toolkit"  # a Project entry
npx hexo new technical-notes   "Build Pipeline Notes"      # a Technical Notes entry
```

> The word after `new` must match a scaffold filename (`learning-journals`, `essay`, `project`, `technical-notes`). Each scaffold already sets the right `layout`, `categories`, and the useful fields for that type.

### Option B — create the file by hand

Make a new `.md` file in `source/_posts/` with a stable, lowercase, hyphenated filename:

```text
source/_posts/martingale-convergence.md
```

Then paste the front matter for the type you want (see Step 2). You can copy from [POST_TEMPLATE.md](POST_TEMPLATE.md) or from an existing post.

---

## Step 2 — Fill in the front matter

The block between the `---` fences at the top of the file is the **front matter**. It controls the title, URL, section, and metadata. Pick the block for your content type:

**Learning Journals**
```yaml
---
title: Martingale Convergence
date: 2026-06-28
layout: entry
categories: [learning-journals]
slug: martingale-convergence
description: A one-sentence summary shown on cards and at the top of the entry.
tags:
  - Probability
  - Martingales
course: Probability Theory      # optional
---
```

**Essay**
```yaml
---
title: On Reading Machines
date: 2026-06-28
layout: entry
categories: [essay]
slug: on-reading-machines
description: A one-sentence public summary.
subtitle: An optional longer subtitle, also used as a fallback summary.
byline: L2-T2
tags:
  - Media
  - Language
---
```

**Project**
```yaml
---
title: Causal Discovery Toolkit
date: 2026-06-28
layout: entry
categories: [project]
slug: causal-discovery-toolkit
description: What this project investigates or builds.
status: active                              # e.g. active | paused | completed | exploratory
repo: https://github.com/L2-T2/example      # optional; shows a "Repository" link
featured: false                             # set true to feature it on the homepage "Now" panel
tags:
  - Causality
  - Research
---
```

**Technical Notes**
```yaml
---
title: Build Pipeline Notes
date: 2026-06-28
layout: entry
categories: [technical-notes]
slug: build-pipeline-notes
description: What the code does and why it exists.
repo: https://github.com/L2-T2/example      # optional; shows a "Repository" link
tags:
  - Tooling
  - Hexo
---
```

### Field rules that matter

| Field         | Rule                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `categories`  | **Exactly one**, in brackets. The first/only value decides the section **and** the URL. |
| `slug`        | The URL segment. Lowercase, hyphenated. **Don't change it after publishing** — it breaks links. |
| `description` | Always fill this in — it's the card and header summary. One sentence.                  |
| `date`        | `YYYY-MM-DD`. Controls ordering (newest first).                                       |
| `tags`        | Conceptual and reusable (e.g. `Probability`), not one-offs.                            |

The resulting URL is `https://l2-t2.github.io/<category>/<slug>/`, e.g. `categories: [learning-journals]` + `slug: martingale-convergence` → `/learning-journals/martingale-convergence/`.

---

## Step 3 — Write the content

Everything below the closing `---` is normal **Markdown**.

**Math** — write LaTeX; it is rendered in the browser by KaTeX.

```markdown
Inline math uses \( ... \), for example \(X_t\) is a martingale.

Display math uses \[ ... \]:

\[
  \mathbb{E}[X_{t+1}\mid \mathcal{F}_t] = X_t
\]
```

> `$ ... $` and `$$ ... $$` also work. The maintenance script [`tools/notes_math_replace.py`](tools/notes_math_replace.py) can convert `\[ \]` to `$$` across notes if you prefer dollar signs.

**Code blocks** — fenced blocks are syntax-highlighted:

````markdown
```python
def f(x):
    return x * 2
```
````

**Images** — put the file under `source/` and link with a site-root path:

```text
source/images/diagram.png        →   ![Diagram](/images/diagram.png)
```

(Create `source/images/` or `source/files/` if it doesn't exist yet; anything under `source/` is copied to the site as-is.)

**Links between entries** — use the site-root path: `[see the existence proof](/learning-journals/brownian-motion-existence-proof/)`.

**Essay annotations** (essays only) — margin notes that attach to a heading or element by its `id`:

```markdown
> [!NOTE|Source|#commognition]
> Sfard introduces this term in *Thinking as Communicating* (2008).
```

---

## Step 4 — Preview locally

```bash
npm run server
```

Open **http://localhost:4000/** and check:

- the entry shows up in its section list (`/learning-journals/`, `/essay/`, `/project/`, or `/technical-notes/`);
- the detail page renders (math, code, images, links all correct);
- the homepage count and "Recent entries" updated.

Stop the server with `Ctrl + C`. If the preview looks stale, run `npm run clean && npm run server`.

---

## Step 5 — Publish (push to GitHub)

```bash
git add .
git commit -m "Add journal: Martingale Convergence"
git push origin main
```

That's it. Pushing to `main` triggers the **Deploy site to GitHub Pages** workflow.

> First time only — if the project isn't a git repo yet:
> ```bash
> git init
> git branch -M main
> git remote add origin https://github.com/L2-T2/L2-T2.github.io.git
> git add .
> git commit -m "Initial site"
> git push -u origin main
> ```

---

## Step 6 — Verify it went live

1. Open the repo's **Actions** tab on GitHub.
2. Watch the latest **Deploy site to GitHub Pages** run — green check = success (usually 1–2 min).
3. Visit **https://l2-t2.github.io/** and your new entry's URL.

If the run is red, click it to read the failing step. See [README.md → Troubleshooting](README.md#troubleshooting).

---

## Common follow-up tasks

**Edit an existing post** — change the file in `source/_posts/`, preview, then commit and push. (Keep the `slug` the same.)

**Delete a post** — delete its file in `source/_posts/`, then commit and push. Don't touch `public/`.

**Feature a project on the homepage** — set `featured: true` on exactly one project in `source/_posts/`, and `featured: false` (or remove it) on the others.

**Change the navigation, social links, or contact email** — edit `themes/particlex/_config.yml`.

**Change the site title, author, or URL** — edit `_config.yml`.

---

## Pre-publish checklist

- [ ] File is in `source/_posts/` with a lowercase-hyphenated name.
- [ ] `categories:` has exactly one value (`learning-journals` / `essay` / `project` / `technical-notes`).
- [ ] `slug` is set, lowercase, hyphenated, and final.
- [ ] `description` is a clear one-sentence summary.
- [ ] `date` is correct (`YYYY-MM-DD`).
- [ ] Previewed with `npm run server` — renders correctly.
- [ ] Committed and pushed to `main`.
- [ ] Actions run is green and the page is live.
