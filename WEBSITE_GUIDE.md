# 网站维护与修改指南 (Website Guide)

本文档旨在帮助您理解 `L2-T2.github.io` 的 Hexo 工作区结构，并提供从**源码层面**修改和发布内容的完整步骤。

## 1. 核心概念：源码 vs 生成文件

您当前的工作区是 Hexo 博客的**源码 (Source)**。

*   **请修改这里**：`source/` 目录下的 Markdown 文件 (`.md`) 和 `_config.yml` 配置文件。
*   **不要修改这里**：`public/` 目录。
    *   `public` 文件夹是 Hexo 根据源码自动生成的静态网页 (HTML/CSS/JS)。
    *   每次运行 `hexo generate`，`public` 都会被覆盖。如果您直接修改 `public` 中的文件，**下次生成时修改会丢失**。

## 2. 文件结构详解

```text
.
├── _config.yml         # 站点全局配置文件 (标题、作者、部署设置等)
├── package.json        # 项目依赖信息
├── source/             # [核心] 存放网站所有的文章和页面源码
│   ├── _posts/         #     -> 博客文章 (.md 文件)
│   ├── about/          #     -> "关于" 页面
│   ├── notes/          #     -> "Notes" 页面
│   └── ...
├── themes/             # 主题文件夹
│   └── particlex/      #     -> 您当前使用的 particlex 主题
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
hexo new "文章标题"
```
这将在 `source/_posts/` 下生成一个新的 `.md` 文件。

#### 修改页面 (如 About)
编辑 `source/about/index.md` 文件。

### 第二步：本地预览 (Preview)

修改完成后，建议先在本地查看效果：

```bash
hexo server
# 或者简写为
hexo s
```
然后浏览器访问 `http://localhost:4000`。
*   按 `Ctrl + C` 停止服务器。

### 第三步：发布上线 (Deploy)

要将修改更新到 `L2-T2.github.io` 网站，需要执行生成和部署。

#### 前置准备 (仅需做一次)
检查 `_config.yml` 底部是否已配置部署信息，并确保安装了 git 部署插件。
如果在 `package.json` 中没有看到 `hexo-deployer-git`，请先安装：
```bash
npm install hexo-deployer-git --save
```
并在 `_config.yml` 中配置：
```yaml
deploy:
  type: git
  repo: https://github.com/L2-T2/L2-T2.github.io.git  # 您的仓库地址
  branch: main  # 或 master
```

#### 正式发布命令
```bash
# 1. 清除旧缓存 (可选，推荐)
hexo clean

# 2. 生成静态文件 (Generate)
hexo generate  # 或 hexo g

# 3. 部署到 GitHub (Deploy)
hexo deploy    # 或 hexo d
```

*(注：如果不使用插件部署，您也可以手动将 `public` 文件夹内的所有内容复制到您的 GitHub Pages 仓库并上传)*

## 4. 常用配置修改

### 修改网站基本信息
编辑根目录下的 `_config.yml`：
```yaml
title: L2-T2           # 网站标题
author: 从云和风        # 作者名
language: en           # 语言 (zh-CN 为中文)
```

### 修改主题样式
编辑 `themes/particlex/_config.yml`。这里的配置控制主题的具体外观，如侧边栏、颜色、菜单导航等。
