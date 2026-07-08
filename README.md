# L2-T2 Research Homepage

Source workspace for the personal research homepage at **https://l2-t2.github.io**.

It is a [Hexo](https://hexo.io/) static site organized as a **research archive**, not a chronological blog. Content is grouped by four durable types — **Learning Journals**, **Essay**, **Project**, and **Technical Notes** — plus an **About** page and a custom homepage.

The editing principle is simple: **edit the source files, then let Hexo regenerate the static output.** You never hand-edit the generated site.

> New to publishing here? Read **[PUBLISHING.md](PUBLISHING.md)** for the step-by-step "how to add a post and put it online" workflow.

---

## Quick Start

Requirements: **Node.js 18+** and **[Pandoc](https://pandoc.org/installing.html)** (the Markdown renderer used by this site).

```bash
npm install        # install dependencies (first time only)
npm run server     # preview locally at http://localhost:4000/
```

Useful commands:

```bash
npm run clean      # clear Hexo cache (db.json) and the generated public/ folder
npm run build      # generate the static site into public/
npm run server     # live local preview at http://localhost:4000/ (alias: npm run dev)
```

If `hexo` is reported as `command not found`, use the `npm run` scripts above or `npx hexo <command>`. Hexo is a **project dependency**, not a required global install.

---

## How Deployment Works

Deployment is **automatic via GitHub Actions** — you do not run a deploy command. For a first-time, step-by-step setup walkthrough, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

```
edit source  →  git commit  →  git push origin main  →  GitHub Actions builds  →  live at l2-t2.github.io
```

The workflow lives in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On every push to `main` it installs Node and Pandoc, runs `hexo generate`, and publishes `public/` to GitHub Pages.

**One-time repository setup** (do this once, in the GitHub web UI):

1. Push this repository to `https://github.com/L2-T2/L2-T2.github.io`.
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions** (not "Deploy from a branch").
4. Push any change to `main`; watch the run under the **Actions** tab. When it finishes, the site is live.

Because CI rebuilds the site from source, the generated `public/` folder and the `db.json` cache are **git-ignored** — they are never committed. See [PUBLISHING.md](PUBLISHING.md) for the day-to-day publishing routine.

---

## Project Model

The site has three layers:

1. **Content layer** — Markdown entries and page copy in `source/`.
2. **Presentation layer** — homepage files (`homepage/`), shared CSS/JS (`source/assets/`), and EJS layouts (`themes/particlex/layout/`).
3. **Generated layer** — static HTML/CSS/JS output in `public/`.

Only the first two layers are edited by hand. **`public/` is generated output** and is overwritten by every build.

### Toolchain

| Concern        | Tool                                                                 |
| -------------- | -------------------------------------------------------------------- |
| Static site    | Hexo 7.x                                                             |
| Markdown → HTML| `hexo-renderer-pandoc` (**requires Pandoc installed**)              |
| Theme / layout | `themes/particlex` — a local, layout-only theme (EJS templates)      |
| Math rendering | LaTeX in posts → Pandoc emits `\( \)` / `\[ \]` → **KaTeX** (CDN) renders it in the browser |
| Code highlight | **highlight.js** (CDN) + Hexo's built-in highlighter                 |
| Hosting        | GitHub Pages, deployed by GitHub Actions                            |

---

## Repository Structure

```text
.
├── _config.yml                   # Hexo site config: title, URL, routes, permalink, theme, pandoc
├── package.json                  # npm scripts and Hexo dependencies
├── package-lock.json             # locked dependency tree (used by CI's `npm ci`)
├── .gitignore                    # excludes node_modules/, public/, db.json, OS cruft
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build + deploy to Pages on push to main
│
├── README.md                     # this file — architecture and editing map
├── PUBLISHING.md                 # how to write and publish a new entry (start here to post)
├── WEBSITE_GUIDE.md              # 中文维护指南 (Chinese maintenance guide)
├── PROJECT_GUIDE.md              # editorial / content-planning guide
├── POST_TEMPLATE.md              # generic front-matter + body template
│
├── homepage/                     # SINGLE SOURCE OF TRUTH for the homepage
│   ├── homepage.html             #   structure + copy (with __TOKENS__ filled in at build time)
│   ├── homepage.css              #   homepage-only styles
│   ├── homepage.js               #   homepage-only interactions (tag rails, copy-email)
│   └── assets/                   #   homepage images (e.g. example.jpg = the "Now" preview)
│
├── scripts/
│   └── copy-homepage-assets.js   # copies homepage/ assets to public/ and exposes the template helper
│
├── scaffolds/                    # templates used by `hexo new <layout> "<title>"`
│   ├── learning-journals.md      #   learning journals (custom)
│   ├── essay.md                  #   essays            (custom)
│   ├── project.md                #   projects          (custom)
│   ├── technical-notes.md        #   technical notes   (custom)
│   ├── post.md                   #   Hexo default (unused by this site's workflow)
│   └── page.md                   #   Hexo default (unused by this site's workflow)
│
├── source/                       # all editable content
│   ├── _posts/                   #   every Learning Journals / Essay / Project / Technical Notes entry
│   ├── about/index.md            #   About page (layout: page)
│   ├── learning-journals/index.md #  Learning Journals section landing page (layout: section)
│   ├── essay/index.md            #   Essay section landing page             (layout: section)
│   ├── project/index.md          #   Project section landing page           (layout: section)
│   ├── technical-notes/index.md  #   Technical Notes section landing page   (layout: section)
│   └── assets/                   #   shared site CSS (site.css) and JS (site.js) for inner pages
│
├── themes/
│   └── particlex/
│       ├── _config.yml           # navigation menu, social links, contact email, footer
│       └── layout/               # shared EJS templates (see below)
│
├── tools/
│   └── notes_math_replace.py     # maintenance script: rewrites \[ \] to $$ in notes posts
│
└── public/                       # GENERATED OUTPUT — git-ignored, do not hand-edit
```

### Theme layouts (`themes/particlex/layout/`)

| File           | Renders                                                              |
| -------------- | ------------------------------------------------------------------- |
| `layout.ejs`   | The HTML shell: `<head>`, fonts, CSS/JS includes, KaTeX/highlight.js |
| `index.ejs`    | The homepage — loads `homepage/homepage.html` and fills its tokens   |
| `section.ejs`  | A section landing page (the card list for learning-journals/essay/project/technical-notes) |
| `entry.ejs`    | A single entry detail page (incl. essay TOC + annotations)           |
| `page.ejs`     | A static page such as About                                          |
| `archives.ejs` | The date-based archive                                               |
| `tags.ejs`     | Tag listing pages                                                    |
| `menu.ejs` / `footer.ejs` | Shared navigation and footer partials                    |

---

## Content Architecture

### Homepage

The homepage is maintained entirely from the `homepage/` folder:

```text
homepage/homepage.html    # structure and copy
homepage/homepage.css     # homepage-only styles
homepage/homepage.js      # homepage-only interactions
homepage/assets/          # homepage images and media
```

At build time, [`themes/particlex/layout/index.ejs`](themes/particlex/layout/index.ejs) reads `homepage.html` and replaces `__TOKENS__` with live site data — section counts, the two most recent entries per section, the featured "Now" link, contact links, and tag data.

> **Homepage rule:** edit `homepage/homepage.html`, **never** `public/index.html`.

### Section pages

The four section landing pages live at:

```text
source/learning-journals/index.md   source/project/index.md
source/essay/index.md               source/technical-notes/index.md
```

Each uses `layout: section` and a `section:` value that decides which posts to list:

```yaml
---
title: Learning Journals
layout: section
section: learning-journals   # one of: learning-journals | essay | project | technical-notes
---
```

List rendering is shared by [`themes/particlex/layout/section.ejs`](themes/particlex/layout/section.ejs).

### Entry pages

All long-form entries live in `source/_posts/`. The **first category decides the section and the URL**:

```yaml
layout: entry
categories: [learning-journals]   # -> /learning-journals/<slug>/
categories: [essay]               # -> /essay/<slug>/
categories: [project]             # -> /project/<slug>/
categories: [technical-notes]     # -> /technical-notes/<slug>/
slug: stable-url-slug
description: One-sentence summary for cards and entry headers
tags: [Topic]
```

Detail-page rendering is shared by [`themes/particlex/layout/entry.ejs`](themes/particlex/layout/entry.ejs).

### Static pages

Static pages such as About live outside `_posts` and use `layout: page`:

```text
source/about/index.md   ->   /about/   (rendered by page.ejs)
```

---

## Content Types

The four types share the same `layout: entry` but differ in the front-matter fields that actually render. Fields below marked **(rendered)** are read by the templates; others are optional metadata.

### Learning Journals — technical learning artifacts

Definitions, derivations, proof sketches, concept explanations, course-linked records.

```yaml
---
title: Brownian Motion - Existence Proof
date: 2026-02-06
layout: entry
slug: brownian-motion-existence-proof
description: One-sentence technical summary.     # (rendered) hero + card summary
categories: [learning-journals]
tags: [Probability, Stochastic Processes]        # (rendered) tag chips/links
course: Probability Theory                       # (rendered) "Course" field, if present
---
```

### Essay — reflective / argumentative writing

Long-form, possibly interdisciplinary. Essays get extra features in the template: a **table of contents** (auto-built from `h2`–`h4`) and **margin annotations**.

```yaml
---
title: ...
date: 2026-03-14
layout: entry
slug: ...
description: One-sentence public summary.        # (rendered)
categories: [essay]
subtitle: Optional longer subtitle.              # (rendered) fallback summary
byline: L2-T2                                     # (rendered) essay-only "Byline" field
tags: [Language, AI]                             # (rendered)
---
```

Annotation syntax (essays only) — the block is lifted out of the body and shown in the margin, with a numbered marker placed on the element whose `id` matches the anchor:

```markdown
> [!NOTE|Annotation title|#target-anchor]
> Annotation body text.
```

### Project — sustained research or engineering work

```yaml
---
title: ...
date: 2026-03-22
layout: entry
slug: ...
description: What this project investigates or builds.   # (rendered)
categories: [project]
status: active                                           # (rendered) badge on card + detail
repo: https://github.com/L2-T2/example                   # (rendered) "Repository" link
featured: true                                           # promotes it to the homepage "Now" panel
tags: [Website, Hexo]                                    # (rendered)
---
```

`featured: true` makes a project the homepage **"Now"** highlight. If no project is featured, the homepage falls back to the most recent post. Use it on **one** project at a time.

### Technical Notes — reproducible implementations and tooling

```yaml
---
title: ...
date: 2026-03-22
layout: entry
slug: ...
description: What the code does and why it exists.       # (rendered)
categories: [technical-notes]
repo: https://github.com/L2-T2/example                   # (rendered) "Repository" link
tags: [Hexo, Tooling]                                    # (rendered)
---
```

The `scaffolds/technical-notes.md` body suggests sections: Purpose, Dependencies, Installation, How to Run, Example Output, Notes.

---

## Routing

Configured in `_config.yml` as `permalink: :category/:slug/`. Because this is a **user site** (`l2-t2.github.io`), the site root is `/`.

```text
/                  homepage
/learning-journals/  learning journals list   /learning-journals/<slug>/  entry detail
/essay/              essay list               /essay/<slug>/              essay detail
/project/            project list             /project/<slug>/            project detail
/technical-notes/    technical notes list     /technical-notes/<slug>/    entry detail
/about/            about page
/archives/         date-based archive
/tags/<tag>/       tag pages
```

Use stable, lowercase, hyphenated slugs. **Avoid changing a slug after publishing** — it breaks existing links.

---

## Editing Workflow

| To change…                              | Edit…                                                                 |
| --------------------------------------- | --------------------------------------------------------------------- |
| A post's text                           | the relevant file in `source/_posts/`                                 |
| The homepage layout/copy                | `homepage/homepage.html` (+ `.css` / `.js`)                           |
| Homepage **dynamic data** (new token)   | `themes/particlex/layout/index.ejs`                                   |
| Inner-page cards, entry pages, typography | `source/assets/site.css`, `source/assets/site.js`, `themes/particlex/layout/` |
| Navigation menu, social links, contact email | `themes/particlex/_config.yml`                                   |
| Site title, author, URL, permalink, theme | `_config.yml`                                                       |

After any change: `npm run server` to preview, then commit and push to deploy.

---

## Extension Guide

### Add a new content section (e.g. `reading`)

1. Add `source/reading/index.md` with `layout: section` and `section: reading`.
2. Add `reading` to `category_map` in `_config.yml`.
3. Add a menu item in `themes/particlex/_config.yml`.
4. Add the label in the `sectionLabel()` maps inside `section.ejs` and `entry.ejs`.
5. If it should appear on the homepage, add tokens in `homepage/homepage.html` and populate them in `index.ejs`.
6. Add a `scaffolds/reading.md` if entries will be created often.

### Add a new metadata field to entry cards/headers

1. Add the field to the entry front matter.
2. Read it in `entry.ejs` (detail page) and/or `section.ejs` (list card).
3. Add styles in `source/assets/site.css` if needed.

### Add downloadable assets

```text
homepage/assets/   # homepage-only images/media
source/assets/     # shared CSS/JS and site-wide assets
source/files/      # downloadable PDFs, .tex, supplements (create as needed)
```

Reference them with site-root paths, e.g. `[Download PDF](/files/example.pdf)`.

---

## Maintenance Rules

- Edit `source/`, `homepage/`, `themes/particlex/`, and `scripts/` only.
- **Never hand-edit `public/`** — it is regenerated and git-ignored.
- Give every entry exactly **one** primary section category (`categories: [learning-journals]` form).
- Always set a `description` so cards, headers, and homepage summaries read well.
- Keep tags conceptual and reusable; avoid one-off tags.
- Keep `slug` stable once published.
- Use `featured: true` on at most one project.
- Preview with `npm run server` before pushing.

---

## Troubleshooting

**`hexo: command not found`** — use `npm run server` / `npm run build`, or `npx hexo ...`. Hexo is a local dependency.

**Math doesn't render / shows raw `\(...\)`** — math is rendered in the browser by KaTeX, and requires Pandoc at build time. Confirm Pandoc is installed (`pandoc --version`) and rebuild with `npm run clean && npm run build`.

**Stale local preview** — `npm run clean && npm run build && npm run server`.

**A change in `public/` disappeared** — expected. `public/` is generated; move the change to `homepage/`, `source/`, or `themes/particlex/`.

**A post shows in the wrong section** — check `categories:`; the **first** category determines the section.

**GitHub Actions build fails on `npm ci`** — ensure `package-lock.json` is committed and in sync with `package.json`. As a fallback you can change the workflow's install step to `npm install`.

**GitHub Actions build fails rendering Markdown** — the CI installs Pandoc via `apt-get`; if a post uses an unusual Pandoc feature, check the failing step's log under the **Actions** tab.

**Site deploys but 404s / looks unstyled** — confirm **Settings → Pages → Source = GitHub Actions**, and that `_config.yml` `url:` is `https://l2-t2.github.io`.

---

## Documentation Map

| File                | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `README.md`         | Architecture, structure, and editing map (this file)       |
| `PUBLISHING.md`     | **How to write and publish a new entry** — start here      |
| `DEPLOYMENT.md`     | **First-time deploy to GitHub Pages** — step by step       |
| `WEBSITE_GUIDE.md`  | 中文维护指南 (Chinese maintenance workflow)                |
| `PROJECT_GUIDE.md`  | Editorial / content-planning guide                         |
| `POST_TEMPLATE.md`  | Generic front-matter + body template                       |
