import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { CONTENT_TYPES, LANGUAGES, PROJECT_ROOT } from "../config.mjs";

const POSTS_ROOT = path.join(PROJECT_ROOT, "source", "_posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EDITABLE_FIELDS = new Set([
  "title",
  "date",
  "slug",
  "description",
  "category",
  "lang",
  "translationKey",
  "tags",
  "course",
  "subtitle",
  "byline",
  "status",
  "repo",
  "featured",
]);
const MANAGED_FRONT_MATTER_FIELDS = new Set([
  "title",
  "date",
  "layout",
  "slug",
  "description",
  "categories",
  "tags",
  "lang",
  "lang_path",
  "translation_key",
  "course",
  "subtitle",
  "byline",
  "status",
  "repo",
  "featured",
]);

export function hashText(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function articleId(sourcePath) {
  return Buffer.from(sourcePath, "utf8").toString("base64url");
}

export function sourcePathFromId(id) {
  try {
    const decoded = Buffer.from(id, "base64url").toString("utf8");
    if (!decoded.startsWith("source/_posts/") || !decoded.endsWith(".md")) return null;
    if (decoded.includes("..") || decoded.includes("\\")) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function splitMarkdown(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("文章缺少有效的 YAML front matter");
  return {
    frontMatter: parseYaml(match[1]) || {},
    body: match[2].replace(/^\r?\n/, ""),
  };
}

function categoryOf(value) {
  if (Array.isArray(value)) return String(value[0] || "");
  return String(value || "");
}

export function metadataFromFrontMatter(frontMatter) {
  const lang = frontMatter.lang === "zh-CN" ? "zh-CN" : "en";
  return {
    title: String(frontMatter.title || ""),
    date: formatDate(frontMatter.date),
    slug: String(frontMatter.slug || ""),
    description: String(frontMatter.description || ""),
    category: categoryOf(frontMatter.categories),
    lang,
    translationKey: String(frontMatter.translation_key || frontMatter.slug || ""),
    tags: Array.isArray(frontMatter.tags)
      ? frontMatter.tags.filter(Boolean).map(String)
      : [],
    course: String(frontMatter.course || ""),
    subtitle: String(frontMatter.subtitle || ""),
    byline: String(frontMatter.byline || ""),
    status: String(frontMatter.status || ""),
    repo: String(frontMatter.repo || ""),
    featured: frontMatter.featured === true,
  };
}

export function extrasFromFrontMatter(frontMatter) {
  return Object.fromEntries(
    Object.entries(frontMatter || {}).filter(([key]) => !MANAGED_FRONT_MATTER_FIELDS.has(key)),
  );
}

function formatDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

export function normalizeMetadata(input) {
  const clean = {};
  for (const field of EDITABLE_FIELDS) {
    if (Object.hasOwn(input || {}, field)) clean[field] = input[field];
  }
  clean.title = String(clean.title || "").trim();
  clean.date = String(clean.date || "").trim();
  clean.slug = String(clean.slug || "").trim().toLowerCase();
  clean.description = String(clean.description || "").trim();
  clean.category = String(clean.category || "").trim();
  clean.lang = clean.lang === "zh-CN" ? "zh-CN" : "en";
  clean.translationKey = String(clean.translationKey || clean.slug).trim();
  clean.tags = Array.isArray(clean.tags)
    ? [...new Set(clean.tags.map((tag) => String(tag).trim()).filter(Boolean))]
    : String(clean.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
  clean.course = String(clean.course || "").trim();
  clean.subtitle = String(clean.subtitle || "").trim();
  clean.byline = String(clean.byline || "").trim();
  clean.status = String(clean.status || "").trim();
  clean.repo = String(clean.repo || "").trim();
  clean.featured = clean.featured === true;
  return clean;
}

export function validateArticle(metadata, body) {
  const errors = [];
  const m = normalizeMetadata(metadata);
  if (!m.title) errors.push("标题不能为空");
  if (!DATE_PATTERN.test(m.date)) errors.push("日期必须是 YYYY-MM-DD");
  if (!SLUG_PATTERN.test(m.slug)) errors.push("Slug 只能包含小写字母、数字和连字符");
  if (!m.description) errors.push("摘要不能为空");
  if (!CONTENT_TYPES[m.category]) errors.push("内容类型无效");
  if (!LANGUAGES[m.lang]) errors.push("语言无效");
  if (!String(body || "").trim()) errors.push("正文不能为空");
  if (m.repo) {
    try {
      const url = new URL(m.repo);
      if (!/^https?:$/.test(url.protocol)) throw new Error();
    } catch {
      errors.push("仓库链接必须是有效的 HTTP(S) URL");
    }
  }
  return { valid: errors.length === 0, errors, metadata: m };
}

export function serializeArticle(metadata, body, frontMatterExtras = {}) {
  const result = validateArticle(metadata, body);
  if (!result.valid) throw new Error(result.errors.join("；"));
  const m = result.metadata;
  const frontMatter = {
    ...frontMatterExtras,
    title: m.title,
    date: m.date,
    layout: "entry",
    slug: m.slug,
    description: m.description,
    categories: [m.category],
    tags: m.tags,
    lang: m.lang,
    lang_path: LANGUAGES[m.lang].langPath,
    translation_key: m.translationKey || m.slug,
  };
  for (const field of CONTENT_TYPES[m.category].fields) {
    if (field === "featured") {
      frontMatter.featured = m.featured;
    } else if (m[field]) {
      frontMatter[field] = m[field];
    }
  }
  const yaml = stringifyYaml(frontMatter, { lineWidth: 0 }).trimEnd();
  return `---\n${yaml}\n---\n\n${String(body).trimEnd()}\n`;
}

export function targetSourcePath(metadata) {
  const m = normalizeMetadata(metadata);
  const language = LANGUAGES[m.lang];
  if (!language || !SLUG_PATTERN.test(m.slug)) throw new Error("无法确定文章路径");
  return path.posix.join("source", "_posts", language.directory, `${m.slug}.md`);
}

export async function readArticle(sourcePath) {
  const absolute = path.join(PROJECT_ROOT, sourcePath);
  const raw = await fs.readFile(absolute, "utf8");
  const { frontMatter, body } = splitMarkdown(raw);
  return {
    id: articleId(sourcePath),
    sourcePath,
    metadata: metadataFromFrontMatter(frontMatter),
    frontMatterExtras: extrasFromFrontMatter(frontMatter),
    body,
    fileHash: hashText(raw),
  };
}

async function listMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listMarkdownFiles(absolute)));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

export async function listArticles() {
  const files = await listMarkdownFiles(POSTS_ROOT);
  const articles = await Promise.all(
    files.map(async (absolute) => {
      const sourcePath = path.relative(PROJECT_ROOT, absolute).split(path.sep).join("/");
      const article = await readArticle(sourcePath);
      return {
        id: article.id,
        sourcePath,
        metadata: article.metadata,
      };
    }),
  );
  return articles.sort((a, b) =>
    `${b.metadata.date}:${b.metadata.title}`.localeCompare(`${a.metadata.date}:${a.metadata.title}`),
  );
}

export function newArticleDefaults() {
  const today = new Date().toISOString().slice(0, 10);
  return normalizeMetadata({
    title: "",
    date: today,
    slug: "",
    description: "",
    category: "learning-journals",
    lang: "zh-CN",
    tags: [],
    featured: false,
  });
}
