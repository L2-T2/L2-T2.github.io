import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import { CONTENT_TYPES, LANGUAGES, PROJECT_ROOT, SERVER } from "./config.mjs";
import { createSession, parseCookies, readSession, verifyPassword } from "./lib/auth.mjs";
import {
  hashText,
  listArticles,
  readArticle,
  serializeArticle,
  sourcePathFromId,
  splitMarkdown,
  metadataFromFrontMatter,
  extrasFromFrontMatter,
  targetSourcePath,
  validateArticle,
} from "./lib/content.mjs";
import {
  createDraft,
  findActiveDraftForSource,
  getDraft,
  listDrafts,
  markPreviewed,
  markPublished,
  markPushed,
  removeDraft,
  updateDraft,
} from "./lib/drafts.mjs";
import {
  commitPublishedFile,
  currentCommit,
  fileAtCommit,
  retryPush,
  versionsForFile,
} from "./lib/git.mjs";
import { buildPreview, cleanupPreviews, clearPreview, previewFilePath } from "./lib/preview.mjs";

const app = express();
const publicDirectory = path.join(import.meta.dirname, "public");
const loginAttempts = new Map();
const previewBuilds = new Map();
const publishingDrafts = new Set();

function requireEnvironment() {
  const passwordHash = process.env.EDITOR_PASSWORD_HASH;
  const sessionSecret = process.env.EDITOR_SESSION_SECRET;
  if (!passwordHash) throw new Error("缺少 EDITOR_PASSWORD_HASH；请先运行 npm run editor:credentials");
  if (!sessionSecret || sessionSecret.length < 32) {
    throw new Error("EDITOR_SESSION_SECRET 必须至少 32 个字符；请先运行 npm run editor:credentials");
  }
  return { passwordHash, sessionSecret };
}

const credentials = requireEnvironment();

app.disable("x-powered-by");
if (process.env.EDITOR_TRUST_PROXY) {
  const trustProxy = /^\d+$/.test(process.env.EDITOR_TRUST_PROXY)
    ? Number(process.env.EDITOR_TRUST_PROXY)
    : process.env.EDITOR_TRUST_PROXY;
  app.set("trust proxy", trustProxy);
}
app.use(express.json({ limit: "2mb", type: "application/json" }));
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cache-Control": "no-store",
  });
  if (SERVER.secureCookies) res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

function sessionFor(req) {
  const token = parseCookies(req.headers.cookie).editor_session;
  return readSession(token, credentials.sessionSecret);
}

function requireAuth(req, res, next) {
  const session = sessionFor(req);
  if (!session) return res.status(401).json({ error: "请先登录" });
  req.editorSession = session;
  next();
}

function requireCsrf(req, res, next) {
  if (req.get("x-csrf-token") !== req.editorSession.csrf) {
    return res.status(403).json({ error: "安全令牌已失效，请刷新后重试" });
  }
  next();
}

function loginAllowed(ip) {
  const now = Date.now();
  const recent = (loginAttempts.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000);
  loginAttempts.set(ip, recent);
  return recent.length < 8;
}

function recordFailedLogin(ip) {
  loginAttempts.set(ip, [...(loginAttempts.get(ip) || []), Date.now()]);
}

function cookie(value, maxAge) {
  const parts = [
    `editor_session=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
  ];
  if (SERVER.secureCookies) parts.push("Secure");
  return parts.join("; ");
}

app.get("/api/session", (req, res) => {
  const session = sessionFor(req);
  if (!session) return res.status(401).json({ authenticated: false });
  res.json({
    authenticated: true,
    csrf: session.csrf,
    settings: {
      contentTypes: CONTENT_TYPES,
      languages: LANGUAGES,
      autoPush: SERVER.autoPush,
    },
  });
});

app.post("/api/login", async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (!loginAllowed(ip)) return res.status(429).json({ error: "尝试次数过多，请 15 分钟后再试" });
  if (!(await verifyPassword(req.body?.password, credentials.passwordHash))) {
    recordFailedLogin(ip);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return res.status(401).json({ error: "密码不正确" });
  }
  loginAttempts.delete(ip);
  const session = createSession(credentials.sessionSecret, SERVER.sessionHours);
  res.setHeader("Set-Cookie", cookie(session.token, SERVER.sessionHours * 60 * 60));
  res.json({ authenticated: true, csrf: session.csrf });
});

app.post("/api/logout", requireAuth, requireCsrf, (req, res) => {
  res.setHeader("Set-Cookie", cookie("", 0));
  res.status(204).end();
});

app.get("/api/library", requireAuth, async (req, res) => {
  const [articles, drafts] = await Promise.all([listArticles(), listDrafts()]);
  const activeBySource = new Map(
    drafts.filter((draft) => draft.state === "draft" && draft.sourcePath).map((draft) => [draft.sourcePath, draft.id]),
  );
  res.json({
    articles: articles.map((article) => ({
      ...article,
      activeDraftId: activeBySource.get(article.sourcePath) || null,
    })),
    drafts: drafts.map(({ body, ...draft }) => ({
      ...draft,
      bodyLength: body.length,
    })),
  });
});

app.post("/api/drafts", requireAuth, requireCsrf, async (req, res) => {
  const draft = await createDraft();
  res.status(201).json({ draft });
});

app.get("/api/drafts/:id", requireAuth, async (req, res) => {
  const draft = await getDraft(req.params.id);
  if (!draft) return res.status(404).json({ error: "草稿不存在" });
  res.json({ draft });
});

app.put("/api/drafts/:id", requireAuth, requireCsrf, async (req, res) => {
  if (publishingDrafts.has(req.params.id)) {
    return res.status(409).json({ error: "该草稿正在发布，请等待发布结果" });
  }
  const result = await updateDraft(req.params.id, req.body?.revision, req.body || {});
  if (result.status === "missing") return res.status(404).json({ error: "草稿不存在" });
  if (result.status === "locked") return res.status(409).json({ error: "该版本已发布，不能继续修改", draft: result.draft });
  if (result.status === "conflict") {
    return res.status(409).json({ error: "另一设备已保存更新，请刷新后再编辑", draft: result.draft });
  }
  await clearPreview(req.params.id);
  res.json({ draft: result.draft });
});

app.delete("/api/drafts/:id", requireAuth, requireCsrf, async (req, res) => {
  if (publishingDrafts.has(req.params.id)) {
    return res.status(409).json({ error: "该草稿正在发布，不能删除" });
  }
  const removed = await removeDraft(req.params.id);
  if (!removed) return res.status(404).json({ error: "草稿不存在" });
  await clearPreview(req.params.id);
  res.status(204).end();
});

app.post("/api/articles/:articleId/edit", requireAuth, requireCsrf, async (req, res) => {
  const sourcePath = sourcePathFromId(req.params.articleId);
  if (!sourcePath) return res.status(400).json({ error: "文章 ID 无效" });
  const existing = await findActiveDraftForSource(sourcePath);
  if (existing) return res.json({ draft: existing, existing: true });
  const article = await readArticle(sourcePath).catch(() => null);
  if (!article) return res.status(404).json({ error: "文章不存在" });
  article.baseCommit = await currentCommit();
  const draft = await createDraft({ article });
  res.status(201).json({ draft, existing: false });
});

app.post("/api/drafts/:id/preview", requireAuth, requireCsrf, async (req, res) => {
  const draft = await getDraft(req.params.id);
  if (!draft || draft.state !== "draft") return res.status(404).json({ error: "可预览的草稿不存在" });
  const validation = validateArticle(draft.metadata, draft.body);
  if (!validation.valid) return res.status(422).json({ error: "请先修正文章信息", details: validation.errors });

  let build = previewBuilds.get(draft.id);
  if (!build) {
    build = buildPreview(draft).finally(() => previewBuilds.delete(draft.id));
    previewBuilds.set(draft.id, build);
  }
  const preview = await build;
  const latest = await getDraft(draft.id);
  if (!latest || latest.state !== "draft" || latest.revision !== draft.revision) {
    return res.status(409).json({ error: "预览生成期间草稿已更新，请重新预览最新修订" });
  }
  await markPreviewed(draft.id, draft.revision);
  res.json({ preview });
});

app.post("/api/drafts/:id/publish", requireAuth, requireCsrf, async (req, res) => {
  if (req.body?.confirmation !== "PUBLISH") {
    return res.status(400).json({ error: "缺少明确的发布确认" });
  }
  if (publishingDrafts.has(req.params.id)) {
    return res.status(409).json({ error: "该草稿已经在发布中" });
  }
  publishingDrafts.add(req.params.id);
  try {
    const draft = await getDraft(req.params.id);
    if (!draft || draft.state !== "draft") return res.status(404).json({ error: "可发布的草稿不存在" });
    if (Number(req.body?.revision) !== draft.revision) {
      return res.status(409).json({ error: "草稿不是最新版本，请刷新后再发布", draft });
    }
    const validation = validateArticle(draft.metadata, draft.body);
    if (!validation.valid) return res.status(422).json({ error: "文章校验失败", details: validation.errors });
    const sourcePath = targetSourcePath(draft.metadata);
    if (draft.sourcePath && sourcePath !== draft.sourcePath) {
      return res.status(409).json({ error: "已发布文章不能在编辑器中修改语言或 Slug" });
    }

    const absolute = path.join(PROJECT_ROOT, sourcePath);
    const currentRaw = await fs.readFile(absolute, "utf8").catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!draft.sourcePath && currentRaw !== null) return res.status(409).json({ error: "该 Slug 已被占用" });
    if (draft.sourcePath && (currentRaw === null || hashText(currentRaw) !== draft.baseFileHash)) {
      return res.status(409).json({ error: "公开源文件已在别处更新；当前草稿未覆盖它，请重新打开文章合并修改" });
    }

    await buildPreview(draft);
    const content = serializeArticle(validation.metadata, draft.body, draft.frontMatterExtras);
    const published = await commitPublishedFile({
      sourcePath,
      content,
      title: validation.metadata.title,
      category: validation.metadata.category,
      draftId: draft.id,
    });
    const record = await markPublished(draft.id, { sourcePath, ...published });
    res.json({
      draft: record,
      commit: published.commit,
      pushed: published.pushed,
      pushError: published.pushError,
      message: published.pushed
        ? "已推送公开版本，GitHub Pages 正在部署"
        : SERVER.autoPush
          ? "已创建发布版本，但推送失败；可稍后重试"
          : "已创建本地发布版本；当前未启用自动推送",
    });
  } finally {
    publishingDrafts.delete(req.params.id);
  }
});

app.post("/api/drafts/:id/retry-push", requireAuth, requireCsrf, async (req, res) => {
  const draft = await getDraft(req.params.id);
  if (!draft || draft.state !== "published" || !draft.publishedCommit) {
    return res.status(404).json({ error: "没有可推送的发布版本" });
  }
  if ((await currentCommit()) !== draft.publishedCommit) {
    return res.status(409).json({ error: "仓库已有更新，请在服务器上检查后手动推送" });
  }
  await retryPush();
  await markPushed(draft.id);
  res.json({ pushed: true });
});

app.get("/api/articles/:articleId/versions", requireAuth, async (req, res) => {
  const sourcePath = sourcePathFromId(req.params.articleId);
  if (!sourcePath) return res.status(400).json({ error: "文章 ID 无效" });
  res.json({ versions: await versionsForFile(sourcePath) });
});

app.post("/api/articles/:articleId/versions/:sha/restore", requireAuth, requireCsrf, async (req, res) => {
  const sourcePath = sourcePathFromId(req.params.articleId);
  if (!sourcePath) return res.status(400).json({ error: "文章 ID 无效" });
  const current = await readArticle(sourcePath).catch(() => null);
  if (!current) return res.status(404).json({ error: "文章不存在" });
  const raw = await fileAtCommit(req.params.sha, sourcePath);
  const parsed = splitMarkdown(raw);
  const draft = await createDraft({
    article: {
      sourcePath,
      fileHash: current.fileHash,
      baseCommit: await currentCommit(),
      metadata: metadataFromFrontMatter(parsed.frontMatter),
      frontMatterExtras: extrasFromFrontMatter(parsed.frontMatter),
      body: parsed.body,
    },
    restoredFrom: req.params.sha,
  });
  res.status(201).json({ draft });
});

app.get(/^\/api\/preview\/([a-f0-9-]{36})\/site\/(.*)$/, requireAuth, async (req, res) => {
  const id = req.params[0];
  const relative = req.params[1];
  const filePath = previewFilePath(id, relative || "index.html");
  if (!filePath) return res.status(404).end();
  const stat = await fs.stat(filePath).catch(() => null);
  const target = stat?.isDirectory() ? path.join(filePath, "index.html") : filePath;
  if (!target || !(await fs.stat(target).catch(() => null))) return res.status(404).end();
  if (target.endsWith(".html")) {
    let html = await fs.readFile(target, "utf8");
    const nonce = crypto.randomBytes(18).toString("base64");
    const allowedScripts = new Set([
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js",
      "https://giscus.app/client.js",
      `/api/preview/${id}/site/assets/site.js`,
    ]);
    html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attributes, body) => {
      const source = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      if (!source || !allowedScripts.has(source)) return "<!-- script removed from private preview -->";
      return `<script${attributes} nonce="${nonce}">${body}</script>`;
    });
    html = html.replace("<head>", '<head><meta name="robots" content="noindex,nofollow"><meta name="editor-preview" content="private">');
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'none'; script-src 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src https://fonts.gstatic.com https://cdn.jsdelivr.net data:; img-src 'self' data: https:; frame-src https://giscus.app; connect-src https://giscus.app; base-uri 'none'; form-action 'none'; frame-ancestors 'self'`,
    );
    res.type("html").send(html);
  } else {
    res.sendFile(target);
  }
});

app.use(
  express.static(publicDirectory, {
    etag: false,
    maxAge: 0,
    setHeaders(res) {
      res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; frame-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      );
    },
  }),
);

app.get("/{*path}", (req, res) => res.sendFile(path.join(publicDirectory, "index.html")));

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  const details = process.env.NODE_ENV === "production" ? undefined : error.stderr?.trim() || error.message;
  res.status(500).json({ error: "操作失败，请检查服务器日志", details });
});

cleanupPreviews().catch(console.error);
app.listen(SERVER.port, SERVER.host, () => {
  const scheme = SERVER.secureCookies ? "https" : "http";
  console.log(`Private editor listening at ${scheme}://${SERVER.host}:${SERVER.port}`);
  if (!SERVER.secureCookies) console.warn("Development mode: cookies are not Secure. Production must use HTTPS and NODE_ENV=production.");
  if (!SERVER.autoPush) console.warn("EDITOR_AUTO_PUSH is disabled; publishing will create a local Git commit only.");
});
