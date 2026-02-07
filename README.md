# L2-T2 Research Homepage

A research-oriented personal homepage built with [Hexo](https://hexo.io/) and the [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) theme.

## 🎯 Overview

This site organizes content into 5 main sections:

- **Notes**: Learning notes, concept explorations, derivations
- **Projects**: Research and engineering projects (with status tracking)
- **Essays**: Long-form writing, methodology reflections
- **Codes**: Code repositories, scripts, and tools
- **About**: Personal information and CV

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Generate static files
hexo generate

# Start local server
hexo server
```

Visit `http://localhost:4000` to view your site.

## 📝 Creating Content

### Create a Note

```bash
hexo new note "Understanding Causal Graphs"
```

Edit the generated file in `source/_posts/` and add:
- `category: notes` (already set by template)
- `tags`: causality, probability, statistics, meta
- `course`: (optional) course name

### Create a Project

```bash
hexo new project "Causal Discovery Research"
```

Set the following fields:
- `status`: ongoing | done | paused
- `repo`: GitHub repository URL
- `featured`: true (to show on homepage)

### Create an Essay

```bash
hexo new essay "On Statistical Thinking"
```

### Create a Code Entry

```bash
hexo new code "Python Causal Toolkit"
```

Include:
- Purpose
- Dependencies
- Installation instructions
- Usage examples

## 📁 Project Structure

```
.
├── _config.yml              # Main Hexo configuration
├── package.json             # Dependencies
├── scaffolds/               # Content templates
│   ├── note.md             # Template for notes
│   ├── project.md          # Template for projects
│   ├── essay.md            # Template for essays
│   └── code.md             # Template for code entries
├── source/                  # Source files
│   ├── _posts/             # Blog posts
│   ├── about/              # About page
│   ├── notes/              # Notes aggregation page
│   ├── projects/           # Projects aggregation page
│   ├── essays/             # Essays aggregation page
│   └── codes/              # Codes aggregation page
├── themes/
│   └── particlex/          # ParticleX theme
└── public/                 # Generated static files (git ignored)
```

## ⚙️ Configuration

### Site Information

Edit `_config.yml`:

```yaml
title: L2-T2
description: '月遇从云,花遇和风'
author: 从云和风
url: https://l2-t2.github.io
```

### Navigation Menu

Edit `themes/particlex/_config.yml` to customize the menu.

### About Page

Edit `source/about/index.md` and replace:
- `<YOUR_NAME>` with your name
- `<YOUR_EMAIL>` with your email
- `<YOUR_GITHUB>` with your GitHub username
- Fill in Education, Research, Projects, Skills sections

## 🌐 Deployment

### Option 1: Manual Deployment

```bash
hexo generate
cd public
git init
git add .
git commit -m "Deploy website"
git push -f https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git main
```

### Option 2: Automated Deployment

1. Install deployer:
```bash
npm install hexo-deployer-git --save
```

2. Configure in `_config.yml`:
```yaml
deploy:
  type: git
  repo: https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
  branch: main
```

3. Deploy:
```bash
hexo deploy
```

## 🛠️ Common Commands

```bash
# Clean cache and generated files
hexo clean

# Generate static files
hexo generate
# or
hexo g

# Start local server
hexo server
# or
hexo s

# Deploy to remote
hexo deploy
# or
hexo d

# Create new post
hexo new [layout] "Title"
```

## 📚 Content Organization

### Information Architecture

Content is organized by **type/topic** rather than by course:

- **Notes**: Short-form learning materials
  - Tags: causality, probability, statistics, meta
  - Optional `course` field for reference

- **Projects**: Ongoing research work
  - Status tracking (ongoing/done/paused)
  - Repository links
  - Featured projects can appear on homepage

- **Essays**: Long-form writing
  - Methodology reflections
  - Interdisciplinary connections

- **Codes**: Technical documentation
  - Purpose, dependencies, usage
  - Example outputs

## 🎨 Customization

### Theme Configuration

Edit `themes/particlex/_config.yml` for:
- Avatar image
- Background images
- Color scheme
- Social links
- Comment systems

### Custom Layouts

- Aggregation pages: `source/{notes,projects,essays,codes}/index.md`
- Category layout: `themes/particlex/layout/category.ejs`

## 📖 Documentation

For detailed implementation information, see:
- [Implementation Plan](/.gemini/antigravity/brain/39120b49-6cc0-4f34-bd97-6fef520a1fc5/implementation_plan.md)
- [Walkthrough](/.gemini/antigravity/brain/39120b49-6cc0-4f34-bd97-6fef520a1fc5/walkthrough.md)

## 🔧 Troubleshooting

### "No layout" warnings
These are normal for archive pages. Important pages generate correctly.

### Changes not showing
Run `hexo clean && hexo generate` to rebuild.

### Port already in use
Use `hexo server -p 5000` to use a different port.

## 📄 License

This project uses the [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) theme.

## 🙏 Acknowledgments

- [Hexo](https://hexo.io/) - Static site generator
- [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) - Theme

---

**Research Interests**: Mathematics → Causal Inference → Narrative & Mechanism Design
