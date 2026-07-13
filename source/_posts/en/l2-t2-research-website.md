---
title: L2-T2 Research Website
date: 2026-03-22
layout: entry
slug: l2-t2-research-website
lang: en
lang_path: ''
translation_key: l2-t2-research-website
description: A static research site organized around notes, essays, projects, and code with shared templates and a homepage-led entry flow.
categories: [project]
tags:
  - Website
  - Hexo
  - Information Architecture
status: active
repo: https://github.com/L2-T2/L2-T2.github.io
featured: true
---

## Overview

This project is the website itself: a research-oriented static site that functions as a working archive rather than a chronological feed. The main goal is to keep homepage navigation, content structure, and publishing workflow aligned so that new work can be added with minimal template changes.

## Scope

- Use the homepage as the primary entry point.
- Keep notes, essays, projects, and code as separate but structurally aligned sections.
- Prefer markdown content plus shared templates over hand-maintained duplicate HTML.
- Keep the build static and lightweight.

## Current State

- Homepage and content sections now share a clearer routing model.
- Section pages act as real list pages rather than decorative placeholders.
- Detail pages expose consistent metadata, summaries, and return paths.

## Why It Matters

The project is also an infrastructure exercise: the site should make intellectual work easier to publish instead of forcing every new entry through custom layout work.

## Next Steps

- Continue filling the `project` section with longer-running research work.
- Add more code entries when reusable tooling appears.
- Keep homepage copy and section metadata synchronized through the shared template flow.
