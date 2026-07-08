---
title: Hexo Content Pipeline
date: 2026-03-22
layout: entry
slug: hexo-content-pipeline
description: The build and content pipeline used by this repository, including shared metadata conventions and static asset handling.
categories: [technical-notes]
tags:
  - Hexo
  - Static Site
  - Tooling
repo: https://github.com/L2-T2/L2-T2.github.io
---

## Purpose

This entry documents the code-facing side of the site: how markdown content, homepage assets, shared templates, and generated output fit together.

## Dependencies

The repository currently depends on a small Hexo toolchain:

```text
hexo
hexo-generator-archive
hexo-generator-index
hexo-generator-tag
hexo-renderer-ejs
hexo-renderer-pandoc
hexo-server
```

## Workflow

```bash
npm run clean
npm run build
npm run server
```

## What This Pipeline Handles

- Shared layouts for homepage, section lists, and detail pages.
- Markdown rendering for notes, essays, projects, and code entries.
- Copying `homepage/` assets into generated output so the homepage remains the source of truth.
- Predictable routes such as `/learning-journals/<slug>/`, `/essay/<slug>/`, `/project/<slug>/`, and `/technical-notes/<slug>/`.

## Limits

The site is intentionally static. It does not depend on a client framework for page rendering, and it avoids adding extra build layers unless the content model truly needs them.
