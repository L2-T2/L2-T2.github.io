import test from "node:test";
import assert from "node:assert/strict";
import {
  articleId,
  metadataFromFrontMatter,
  serializeArticle,
  sourcePathFromId,
  splitMarkdown,
  targetSourcePath,
  validateArticle,
} from "../lib/content.mjs";

const metadata = {
  title: "移动端写作",
  date: "2026-09-05",
  slug: "mobile-writing",
  description: "验证统一模板。",
  category: "essay",
  lang: "zh-CN",
  translationKey: "mobile-writing",
  tags: ["写作", "系统"],
  subtitle: "一个安全的发布流程",
  byline: "L2-T2",
};

test("文章模板可以稳定序列化并重新读取", () => {
  const raw = serializeArticle(metadata, "## 正文\n\n保存不是发布。");
  const parsed = splitMarkdown(raw);
  const result = metadataFromFrontMatter(parsed.frontMatter);
  assert.equal(result.title, metadata.title);
  assert.equal(result.category, "essay");
  assert.equal(result.lang, "zh-CN");
  assert.deepEqual(result.tags, metadata.tags);
  assert.match(parsed.body, /保存不是发布/);
});

test("未被编辑器管理的元数据会跨发布保留", () => {
  const raw = serializeArticle(metadata, "正文", { updated: "2026-08-01", custom_flag: true });
  const parsed = splitMarkdown(raw);
  assert.equal(parsed.frontMatter.updated, "2026-08-01");
  assert.equal(parsed.frontMatter.custom_flag, true);
  assert.equal(parsed.frontMatter.title, metadata.title);
});

test("内容路径只能由受支持的语言和 slug 产生", () => {
  assert.equal(targetSourcePath(metadata), "source/_posts/zh/mobile-writing.md");
  const path = "source/_posts/en/example.md";
  assert.equal(sourcePathFromId(articleId(path)), path);
  assert.equal(sourcePathFromId(articleId("../../secret.md")), null);
});

test("发布校验会阻止缺字段和危险链接", () => {
  const invalid = validateArticle({ ...metadata, slug: "Bad Slug", repo: "javascript:alert(1)" }, "");
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 2);
});
