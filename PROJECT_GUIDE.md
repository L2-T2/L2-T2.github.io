# Research Website Project Guide

## Project Overview

### Purpose and Positioning

This website serves as a **research-oriented personal homepage** designed to document and communicate an evolving intellectual trajectory in mathematics, statistics, and causal inference. Unlike a traditional portfolio or CV website, this platform functions as a living archive of research thinking—a space where learning, exploration, and formal research coexist.

The site is structured to serve multiple audiences:

- **PhD supervisors and academic collaborators**: To understand research interests, methodological depth, and intellectual development
- **Interdisciplinary researchers**: To identify shared interests across causality, statistics, narrative systems, and digital humanities
- **Industry research roles**: To demonstrate technical depth, clear communication, and sustained intellectual curiosity

### Core Philosophy

The website organizes content by **functional type** rather than chronological or course-based categories. This reflects a fundamental principle: research is not a linear accumulation of coursework, but an iterative process of understanding, questioning, and synthesizing across domains.

The four primary content types represent different modes of intellectual work:

- **Notes**: Conceptual understanding and technical learning
- **Projects**: Sustained research questions and investigations
- **Essays**: Methodological reflection and interdisciplinary synthesis
- **Codes**: Technical implementation and reproducibility

This structure allows content to evolve naturally—a note may inspire a project, a project may generate an essay, and all may produce code. The website architecture mirrors the actual process of research.

---

## Site Architecture

### Structural Overview

```
Home
├── Notes          (Learning, concepts, technical intuition)
├── Projects       (Research investigations, ongoing work)
├── Essays         (Methodology, reflection, synthesis)
├── Codes          (Implementation, tools, reproducibility)
└── About          (Identity, CV, contact)
```

### Rationale for Organization

**Why not organize by course or time?**

Academic courses are pedagogical containers, not intellectual categories. A single research question often draws from multiple courses; conversely, a single course may touch on unrelated topics. Organizing by course creates artificial boundaries that obscure the actual structure of knowledge.

Time-based organization (blog-style) privileges recency over relevance. Research insights do not expire; a foundational note from two years ago may be more valuable than a recent update. The architecture should support **cumulative knowledge building**, not chronological narrative.

**Why these four categories?**

Each category serves a distinct epistemological function:

- **Notes** capture the process of understanding—they document how you came to know something, not just what you know
- **Projects** frame questions and investigations—they represent sustained engagement with a problem
- **Essays** step back to examine methodology, connections, and implications—they are reflective rather than technical
- **Codes** ground abstract ideas in concrete implementation—they ensure reproducibility and practical utility

This structure supports the full cycle of research: learning (Notes), investigating (Projects), reflecting (Essays), and implementing (Codes).

---

## Home Page

### Function and Role

The Home page serves as the **intellectual entry point** to the website. It is not a comprehensive index (that's what navigation is for), but rather a curated introduction that answers three questions:

1. **Who are you?** (Brief self-introduction)
2. **What are you thinking about?** (Featured/latest content)
3. **Where should I go next?** (Clear navigation)

The Home page should create a first impression of **clarity, depth, and intellectual seriousness**. It is not a marketing page; it is an invitation to engage with research thinking.

### Typical Content Modules

A well-structured Home page includes:

1. **Hero Section**: Site title, brief tagline, background image
2. **Short Self-Introduction**: 2-3 sentences establishing research identity
3. **Latest Notes**: 3-5 recent notes showing current learning focus
4. **Latest Essays**: 2-3 recent essays demonstrating reflective thinking
5. **Featured Projects** (optional): 1-2 ongoing projects highlighting research direction

The balance between "latest" and "featured" is important. "Latest" shows activity and engagement; "featured" shows curation and judgment. Both are valuable signals.

### Visual Elements and Images

**Image Philosophy**

The Home page typically includes a hero image or background. This image is **atmospheric, not informational**—it sets tone rather than conveying content.

**Image Characteristics**

Appropriate images for a research homepage:
- Abstract patterns, mathematical structures, data visualizations
- Natural phenomena with structural interest (networks, fractals, flows)
- Minimalist, high-contrast compositions
- Avoid: personal photos, stock imagery, overly decorative elements

**Image Placement**

Images are typically stored in:
- `source/images/` for content-specific images
- `themes/<theme>/source/images/` for theme-level assets (avatar, background)

**Replacing Images**

To update the Home page background:
1. Prepare a high-resolution image (minimum 1920px width)
2. Place in the appropriate theme directory
3. Update theme configuration to reference the new image path
4. Regenerate the site to apply changes

**Design Principle**: The image should enhance readability and focus, not compete with text. If in doubt, use a subtle gradient or solid color rather than a complex image.

---

## Notes Section

### Definition and Scope

Notes are **learning artifacts**—they document the process of understanding concepts, techniques, and theories. A note is not a summary of a textbook chapter or lecture; it is a personal reconstruction of an idea in your own terms.

**What distinguishes a Note from other content?**

- **Notes are conceptual**: They focus on understanding "why" and "how," not just "what"
- **Notes are technical**: They may include derivations, proofs, or detailed explanations
- **Notes are iterative**: A note can be updated as understanding deepens
- **Notes are atomic**: Each note should address a specific concept or technique

**Notes vs. Course Assignments**

Course assignments are exercises designed to test understanding within a pedagogical framework. Notes are self-directed explorations that may draw from multiple courses or extend beyond course material. An assignment becomes a note when you reframe it around a question that matters to you, not just to the course requirements.

**Notes vs. Drafts**

Drafts are incomplete or provisional. Notes are complete expressions of current understanding—they may be revised, but they are not "unfinished." If you're not ready to explain an idea clearly, it's not yet a note.

### Recommended Note Structure

A well-formed note typically includes:

#### 1. Motivation
Why does this concept matter? What question does it answer? What problem does it solve?

#### 2. Core Idea
The central insight, stated as clearly and simply as possible. This should be comprehensible to someone with general mathematical maturity, even if they don't know the specific domain.

#### 3. Technical Details
Formal definitions, theorems, derivations, or algorithms. This is where precision matters. Include enough detail that someone could reconstruct the idea from your note.

#### 4. Interpretation / Intuition
What does this really mean? How should one think about it? What are the key insights that make it "click"?

#### 5. Context
How does this relate to other concepts? What are the prerequisites? What does it enable?

#### 6. Open Questions
What remains unclear? What would you like to understand better? What are the limitations or edge cases?

This structure is a guideline, not a template. Some notes may emphasize intuition over formalism; others may be primarily technical. The key is that each note should be **self-contained and purposeful**.

### Notes Upload Workflow

#### Step 1: Prepare Content

If starting from LaTeX notes:
- Convert to Markdown (use Pandoc or manual conversion)
- Ensure math is in LaTeX format (will be rendered by KaTeX/MathJax)
- Extract or recreate figures as separate image files

If starting from handwritten notes:
- Type up in Markdown
- Scan and include handwritten sections as images if they add value (e.g., diagrams)

#### Step 2: Add Front Matter

Every note should include standardized metadata:

```yaml
---
title: "Descriptive Title"
date: YYYY-MM-DD
category: notes
tags:
  - causality
  - probability
  - statistics
  - meta
course: "Optional: Course Name"
math: true  # if LaTeX math is used
---
```

**Tag Guidelines**:
- Use tags to indicate conceptual domains, not courses
- Prefer broad tags (causality, probability) over narrow ones (Pearl's do-calculus)
- The `meta` tag is for notes about learning, research methodology, or epistemology

#### Step 3: Place in Post Directory

Save the file in `source/_posts/` with a descriptive filename:
- Use lowercase with hyphens: `causal-graphs-fundamentals.md`
- Avoid dates in filenames (dates are in front matter)

#### Step 4: Local Preview

```bash
hexo clean
hexo generate
hexo server
```

Navigate to `http://localhost:4000/notes/` to verify the note appears correctly.

#### Step 5: Publish

Once satisfied:
```bash
hexo generate
hexo deploy  # or manual git deployment
```

### Supplementary Materials

**Original LaTeX Files**

If you want to provide the original LaTeX source:
1. Create a `source/files/` directory
2. Place PDF and/or `.tex` files there
3. Link from the note: `[Download PDF](/files/note-name.pdf)`

**Large Derivations**

If a derivation is too long for the main note, consider:
- Creating a separate "appendix" note and linking to it
- Including a PDF supplement
- Providing a GitHub repository link with full derivations

---

## Projects Section

### Definition and Scope

A **project** is a sustained investigation of a research question. Unlike a note (which explains an existing concept), a project explores something uncertain or unknown.

**What qualifies as a project?**

- A research question you're actively investigating
- A methodological exploration (e.g., comparing causal discovery algorithms)
- A substantial implementation or tool development
- A replication or extension of published work

**What doesn't qualify?**

- Course assignments (unless significantly extended)
- One-off analyses or exercises
- Ideas you haven't started working on (those can be notes about "open questions")

**Projects vs. Notes**

- Notes are about understanding; projects are about discovering
- Notes explain what is known; projects explore what is unknown
- Notes are complete; projects are ongoing (and that's legitimate)

### Project Page Structure

Each project should have a dedicated page including:

#### 1. Motivation
What question are you trying to answer? Why does it matter? What gap in knowledge or methodology are you addressing?

#### 2. Research Question
State the question explicitly and precisely. A good research question is:
- Specific enough to be answerable
- Broad enough to be interesting
- Clear enough to guide investigation

#### 3. Approach / Method
What methods are you using? What data, models, or frameworks? Why these choices?

#### 4. Current Status
Where are you in the investigation? What have you learned so far? What remains to be done?

Use explicit status labels:
- **Ongoing**: Active work
- **Paused**: Temporarily set aside (with reason)
- **Done**: Completed (even if not "successful")

#### 5. Links and Resources
- GitHub repository (if applicable)
- Related notes or essays
- Key references or inspirations

### Project Lifecycle

**Ongoing Projects**

Most projects should be in this state most of the time. Research is slow. It's better to have a few well-documented ongoing projects than many abandoned ones.

Update the project page periodically (monthly or quarterly) to reflect progress, even if progress is "I'm stuck on X" or "I realized Y doesn't work."

**Completed Projects**

A project is "done" when:
- You've answered the question (or determined it's unanswerable)
- You've written up the findings (as an essay, paper, or detailed note)
- You've decided to stop working on it for principled reasons

"Done" does not mean "published" or "successful." Negative results and abandoned directions are legitimate outcomes.

**Paused Projects**

Sometimes you need to pause a project to pursue something more urgent or because you lack necessary skills/resources. That's fine. Document why you paused it and what would need to happen to resume it.

### Why Incomplete Projects Matter

For PhD applications and research positions, ongoing and paused projects demonstrate:
- Intellectual ambition (you tackle hard questions)
- Honesty (you don't hide difficulties)
- Persistence (you return to problems over time)

A website with only "completed" projects looks curated to the point of dishonesty. Research is messy. Show the mess.

---

## Essays Section

### Definition and Scope

Essays are **reflective, synthetic, and methodological** writing. They step back from technical details to examine broader questions about how research is done, how ideas connect, or what problems matter.

**What distinguishes an essay?**

- **Reflective**: Essays examine the process of research, not just results
- **Synthetic**: Essays connect ideas across domains or methods
- **Argumentative**: Essays make a claim or propose a perspective
- **Accessible**: Essays are readable by someone outside your specific subfield

**Essays vs. Notes**

- Notes explain concepts; essays argue about ideas
- Notes are technical; essays are conceptual
- Notes are domain-specific; essays are often interdisciplinary

### Why Essays Matter

For PhD applications, essays demonstrate:
- **Intellectual maturity**: You can think about thinking
- **Interdisciplinary potential**: You see connections others miss
- **Communication skill**: You can explain complex ideas clearly

For interdisciplinary research, essays show you can bridge communities and translate between frameworks.

### Essay Topics

Good essay topics include:
- Methodological reflections (e.g., "When is causal discovery possible?")
- Interdisciplinary connections (e.g., "Causality and narrative structure")
- Critiques or extensions of existing work
- Philosophical or epistemological questions in your field
- Reflections on learning or research process

Avoid:
- Summaries of papers or books (that's a note)
- Purely technical derivations (that's a note)
- Vague generalities without grounding in specific work

### Essay Structure

Essays are more flexible than notes, but should include:
1. **Clear thesis or question**
2. **Motivation** (why this matters)
3. **Argument or exploration** (the main content)
4. **Implications or open questions**

Length: Typically 1500-3000 words. Long enough to develop an idea, short enough to maintain focus.

---

## Codes Section

### Definition and Scope

The Codes section is an **index of implementations**, not a code repository itself. Each entry documents a piece of software, script, or tool you've developed, with enough information that someone could use it.

**What belongs in Codes?**

- Research implementations (algorithms, simulations, analyses)
- Tools or utilities you've built
- Reproducible analysis pipelines
- Tutorials or demonstrations

**What doesn't belong?**

- Course assignments (unless significantly extended)
- Trivial scripts
- Code that's not documented or runnable

### Code Entry Structure

Each code entry should include:

#### 1. Purpose
What does this code do? What problem does it solve? Who might use it?

#### 2. Environment and Dependencies
- Programming language and version
- Required libraries or packages
- Operating system requirements (if any)

#### 3. Installation
Step-by-step instructions to set up the environment and install dependencies.

#### 4. How to Run
Clear instructions with example commands. Include:
- Basic usage
- Key parameters or options
- Expected output

#### 5. Example Output
Show what success looks like. Include:
- Sample output (text, plots, or results)
- Interpretation of output
- Common issues and how to resolve them

#### 6. Repository Link
Link to the GitHub repository (or other version control) where the full code lives.

### Relationship to GitHub

The Codes section is **documentation**, not a substitute for version control. The actual code should live in a GitHub repository. The website entry provides:
- Context (why this code exists)
- Usage instructions (how to run it)
- Examples (what it does)

Think of it as a README++ that integrates with your research narrative.

---

## About Section

### Function and Content

The About page establishes your **research identity**. It is the most stable page on the site—update it when your research direction shifts significantly, but not frequently.

### Recommended Content Modules

#### 1. Short Bio (2-3 paragraphs)
- Current position and institution
- Research interests (broad themes)
- Intellectual trajectory (how you got here)

Tone: Professional but personal. Avoid jargon; explain your work to a smart generalist.

#### 2. Research Interests
List 3-5 core areas with brief explanations:
- Causal inference: Methods for understanding cause-effect relationships
- High-dimensional statistics: Statistical methods for complex data
- Narrative systems: Mathematical structure of stories and explanations

#### 3. Education
- Degrees, institutions, dates
- Relevant coursework or specializations
- Thesis topics (if applicable)

#### 4. Research Experience / Projects
Brief descriptions of major projects or research positions. Link to detailed project pages.

#### 5. Skills
Technical skills relevant to research:
- Programming languages
- Statistical methods
- Software tools

Avoid laundry lists. Focus on skills that define your research capability.

#### 6. Publications (if any)
List papers, preprints, or conference presentations. Include links to PDFs or repositories.

#### 7. CV Download (optional)
If you maintain a PDF CV, provide a download link. The About page should be self-contained, but some readers prefer PDF format.

### About vs. Notes/Essays

The About page is **declarative** (this is who I am), while Notes and Essays are **demonstrative** (this is how I think). Both are necessary. The About page provides context; the content provides evidence.

---

## Content Maintenance Workflow

### Update Frequency

**Notes**: Add new notes as you learn significant concepts. Aim for 1-2 per month during active learning periods. Quality over quantity—one deep note is better than five shallow ones.

**Projects**: Update project pages monthly or quarterly. Even if progress is slow, document what you're thinking about or struggling with.

**Essays**: Write essays when you have something to say, not on a schedule. Aim for 2-4 per year. Essays require synthesis, which takes time.

**Codes**: Add code entries when you complete a significant implementation. Update existing entries if functionality changes.

**About**: Update 1-2 times per year, or when your research direction shifts.

### What to Publish vs. Keep Private

**Publish**:
- Anything you'd be comfortable discussing with a potential advisor
- Work that demonstrates your thinking, even if incomplete
- Negative results or abandoned directions (with honest reflection)
- Technical depth that shows expertise

**Keep Private**:
- Rough drafts or half-formed ideas
- Work that's primarily course compliance (unless you've extended it)
- Content that's more about venting than reflecting
- Anything you're not prepared to defend or discuss

**Guideline**: If you wouldn't want to talk about it in a research meeting, don't publish it. But don't confuse "incomplete" with "unpublishable"—research is always incomplete.

### Evolution: Learning Record → Research Archive

**Year 1**: The site is primarily a learning record. Notes dominate. Projects are exploratory. Essays are rare.

**Year 2**: Projects become more substantial. Essays emerge as you develop methodological opinions. Notes become more selective and deeper.

**Year 3+**: The site is a research archive. Projects are central. Essays demonstrate intellectual maturity. Notes are highly focused on research-relevant concepts.

This evolution is natural and desirable. Don't try to skip to Year 3 content in Year 1. The progression itself demonstrates growth.

### Maintenance Principles

1. **Consistency over intensity**: Regular small updates beat sporadic large ones
2. **Revision is legitimate**: Update old notes as understanding deepens
3. **Link generously**: Connect related content across sections
4. **Prune rarely**: Keep old content unless it's actively misleading
5. **Document uncertainty**: "I don't fully understand X" is valuable content

---

## Design and Aesthetic Principles

### Core Principles

#### 1. Clarity Over Decoration
Every visual element should serve comprehension. If an image, color, or layout choice doesn't make content clearer, remove it.

#### 2. Structure Over Volume
A well-organized site with 20 pieces of content is better than a chaotic site with 100. Invest in navigation, categorization, and linking.

#### 3. Text-First, Image-Second
Research is primarily textual. Images should illustrate or enhance text, not replace it. Avoid image-heavy designs that obscure content.

#### 4. Academic Longevity
Design for a 5-10 year lifespan. Avoid trendy aesthetics that will look dated quickly. Classic, minimal designs age well.

### Practical Guidelines

- **Typography**: Use readable fonts (serif for long text, sans-serif for headings). Ensure sufficient contrast and line spacing.
- **Color**: Neutral backgrounds (white, light gray) with accent colors for links and highlights. Avoid bright or saturated colors.
- **Layout**: Wide margins, clear hierarchy, consistent spacing. Content should be easy to scan.
- **Navigation**: Always visible, clearly labeled, predictable. Readers should never be lost.

### What to Avoid

- Flashy animations or transitions
- Auto-playing media
- Complex layouts that obscure content
- Excessive branding or self-promotion
- Anything that feels like a "personal brand" rather than a research presence

---

## Final Remarks

### What This Website Is

This website is a **research trajectory made visible**. It documents how you learn, what you investigate, how you think, and what you build. It is not a finished product; it is a living record of intellectual development.

### What This Website Is Not

- **Not a portfolio**: You're not selling services or showcasing "best work." You're documenting a research process.
- **Not a blog**: You're not writing for an audience or building a following. You're creating a research archive.
- **Not a CV**: You're not listing credentials. You're demonstrating thinking.

### The Value of Imperfection

Perfect websites are static. Research is dynamic. A website that shows struggle, revision, and uncertainty is more honest—and more valuable—than one that presents only polished results.

Incomplete projects, revised notes, and essays that raise more questions than they answer are all legitimate content. They show you're doing real research, not performing competence.

### Long-Term Vision

Over years, this website should become:
- A **research archive**: A record of what you've learned and investigated
- A **thinking tool**: A place to clarify ideas by writing them down
- A **collaboration signal**: A way for others to understand your work and find connections
- A **intellectual autobiography**: A narrative of how your research interests evolved

It should not become:
- A burden to maintain
- A source of anxiety about "content quality"
- A performance for an imagined audience

### Sustainability

The website is sustainable if:
- Adding content feels natural, not forced
- You write for yourself first, readers second
- You update when you have something to say, not on a schedule
- You're comfortable with the site being "incomplete"

If maintaining the website feels like work rather than documentation, something is wrong. Adjust your expectations or workflow accordingly.

### Closing Thought

This website is not about presenting yourself as an expert. It's about documenting the process of becoming one. That process is long, uncertain, and full of false starts. Show it honestly. That honesty is what makes research credible.

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Intended Audience**: Self (primary), collaborators, advisors  
**Review Cycle**: Annually or when research direction shifts significantly
