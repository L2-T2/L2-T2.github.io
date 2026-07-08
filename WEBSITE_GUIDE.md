# 网站维护与修改指南 (Website Guide)

本文档旨在帮助您理解 `L2-T2.github.io` 的 Hexo 工作区结构，并提供从**源码层面**修改和发布内容的完整步骤。

## 1. 核心概念：源码 vs 生成文件

您当前的工作区是 Hexo 博客的**源码 (Source)**。

*   **请修改这里**：`source/` 目录下的 Markdown 文件 (`.md`)、`homepage/homepage.html` 和 `_config.yml` 配置文件。
*   **不要修改这里**：`public/` 目录。
    *   `public` 文件夹是 Hexo 根据源码自动生成的静态网页 (HTML/CSS/JS)。
    *   每次运行 `npm run build` 或 `npx hexo generate`，`public` 都会被覆盖。如果您直接修改 `public` 中的文件，**下次生成时修改会丢失**。

## 2. 文件结构详解

```text
.
├── _config.yml         # 站点全局配置文件 (标题、作者、部署设置等)
├── package.json        # 项目依赖信息
├── .github/workflows/  # GitHub Actions 自动部署配置 (deploy.yml)
├── .gitignore          # 忽略 node_modules/、public/、db.json 等
├── homepage/           # [核心] 首页模板单一事实来源
├── source/             # [核心] 存放网站内容源码
│   ├── _posts/             #     -> learning-journals / essay / project / technical-notes 条目
│   ├── about/              #     -> "关于" 页面
│   ├── learning-journals/  #     -> Learning Journals 列表页
│   ├── essay/              #     -> Essay 列表页
│   ├── project/            #     -> Project 列表页
│   ├── technical-notes/    #     -> Technical Notes 列表页
│   └── assets/         #     -> 公共 CSS / JS
├── themes/             # 布局模板文件夹
│   └── particlex/      #     -> 当前只承担 Hexo layout 层
├── public/             # [自动生成] 最终用于发布的静态网页文件
└── scaffolds/          # 文章模板文件
```

## 3. 日常维护工作流

### 第一步：创建或修改内容

#### 修改现有文章
1.  进入 `source/_posts/` 目录。
2.  使用 Markdown 编辑器打开对应的 `.md` 文件。
3.  编辑内容。注意文件顶部的 `---` 包裹区域是**Front-matter (属性区)**，用于设置标题、日期、标签等。

#### 新建文章
在终端运行：
```bash
npx hexo new "文章标题"
```
这将在 `source/_posts/` 下生成一个新的 `.md` 文件。

#### 修改页面 (如 About)
编辑 `source/about/index.md` 文件。

#### 修改首页
编辑 `homepage/homepage.html` 文件。

- 首页的结构、文案、区块顺序、首页专属样式都以这里为准。
- 不要直接改 `public/index.html`。

### 第二步：本地预览 (Preview)

修改完成后，建议先在本地查看效果：

```bash
npm run server
# 或者
npx hexo server
```
然后浏览器访问 `http://localhost:4000`。
*   按 `Ctrl + C` 停止服务器。

> 如果直接运行 `hexo server` 出现 `command not found: hexo`，说明没有安装全局 Hexo CLI。此项目已把 Hexo 安装在本地依赖中，请使用 `npm run server` 或 `npx hexo server`。

### 第三步：发布上线 (Deploy)

本站使用 **GitHub Actions 自动部署**，**不需要**手动运行部署命令。流程如下：

```text
修改 source/  →  git commit  →  git push origin main  →  GitHub Actions 自动构建  →  上线 l2-t2.github.io
```

#### 前置准备 (仅需做一次)
在 GitHub 仓库中打开 **Settings → Pages → Build and deployment**，将 **Source** 设为 **GitHub Actions**。
部署流程定义在 `.github/workflows/deploy.yml`，每次推送到 `main` 分支都会自动构建并发布。

#### 日常发布命令
```bash
# 1. 本地预览，确认无误
npm run server

# 2. 提交并推送到 main 分支（推送即自动部署）
git add .
git commit -m "Update: 本次修改说明"
git push origin main
```

推送后，在仓库的 **Actions** 标签页可看到 “Deploy site to GitHub Pages” 工作流运行，约 1–2 分钟后网站更新完成。

> 完整的写作与发布步骤（含各内容类型的 front-matter 模板）见 [PUBLISHING.md](PUBLISHING.md)。

## 4. 常用配置修改

### 修改网站基本信息
编辑根目录下的 `_config.yml`：
```yaml
title: L2-T2           # 网站标题
author: Liuting Chen   # 作者名（与 _config.yml 保持一致）
language: en           # 语言 (zh-CN 为中文)
```

### 修改导航或模板逻辑
编辑：

- `themes/particlex/_config.yml`
- `themes/particlex/layout/`

### 修改公共样式或脚本
编辑：

- `source/assets/site.css`
- `source/assets/site.js`
