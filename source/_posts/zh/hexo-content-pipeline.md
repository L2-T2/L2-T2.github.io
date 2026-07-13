---
title: Hexo 内容流水线
date: 2026-03-22
layout: entry
slug: hexo-content-pipeline
description: 本仓库所采用的构建与内容流水线，包括共享元数据约定和静态资源处理方式。
categories: [technical-notes]
tags:
  - Hexo
  - 静态网站
  - 工具链
repo: https://github.com/L2-T2/L2-T2.github.io
lang: zh-CN
lang_path: zh/
translation_key: hexo-content-pipeline
---

## 目的

本文记录网站面向代码的一侧：Markdown 内容、首页资源、共享模板与生成结果如何相互衔接。

## 依赖项

本仓库目前依赖一套精简的 Hexo 工具链：

```text
hexo
hexo-generator-archive
hexo-generator-index
hexo-generator-tag
hexo-renderer-ejs
hexo-renderer-pandoc
hexo-server
```

## 工作流程

```bash
npm run clean
npm run build
npm run server
```

## 这套流水线负责什么

- 为首页、栏目列表页和文章详情页提供共享布局。
- 渲染笔记、随笔、项目与代码条目的 Markdown 内容。
- 将 `homepage/` 中的资源复制到生成结果中，从而确保首页目录始终是内容的唯一可信来源。
- 提供可预测的路由，例如 `/learning-journals/<slug>/`、`/essay/<slug>/`、`/project/<slug>/` 和 `/technical-notes/<slug>/`。

## 局限

本站有意保持为静态网站。页面渲染不依赖客户端框架；除非内容模型确实需要，否则不会额外引入构建层。
