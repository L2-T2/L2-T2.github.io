import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { PRIVATE_ROOT } from "../config.mjs";
import { newArticleDefaults, normalizeMetadata } from "./content.mjs";

const DRAFTS_ROOT = path.join(PRIVATE_ROOT, "drafts");

async function ensureStore() {
  await fs.mkdir(DRAFTS_ROOT, { recursive: true, mode: 0o700 });
  await fs.chmod(PRIVATE_ROOT, 0o700).catch(() => {});
}

function draftPath(id) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error("草稿 ID 无效");
  return path.join(DRAFTS_ROOT, `${id}.json`);
}

async function atomicWrite(filePath, value) {
  const tempPath = `${filePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await fs.rename(tempPath, filePath);
}

export async function getDraft(id) {
  await ensureStore();
  try {
    return JSON.parse(await fs.readFile(draftPath(id), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

export async function listDrafts() {
  await ensureStore();
  const files = (await fs.readdir(DRAFTS_ROOT)).filter((name) => name.endsWith(".json"));
  const drafts = await Promise.all(
    files.map((name) => fs.readFile(path.join(DRAFTS_ROOT, name), "utf8").then(JSON.parse)),
  );
  return drafts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function findActiveDraftForSource(sourcePath) {
  const drafts = await listDrafts();
  return drafts.find((draft) => draft.state === "draft" && draft.sourcePath === sourcePath) || null;
}

export async function createDraft({ article = null, restoredFrom = null } = {}) {
  await ensureStore();
  const now = new Date().toISOString();
  const draft = {
    id: crypto.randomUUID(),
    state: "draft",
    revision: 1,
    createdAt: now,
    updatedAt: now,
    sourcePath: article?.sourcePath || null,
    baseFileHash: article?.fileHash || null,
    baseCommit: article?.baseCommit || null,
    restoredFrom,
    metadata: normalizeMetadata(article?.metadata || newArticleDefaults()),
    frontMatterExtras: article?.frontMatterExtras || {},
    body: article?.body || "",
    lastPreviewRevision: null,
    publishedCommit: null,
    pushed: false,
  };
  await atomicWrite(draftPath(draft.id), draft);
  return draft;
}

export async function updateDraft(id, expectedRevision, { metadata, body }) {
  const draft = await getDraft(id);
  if (!draft) return { status: "missing" };
  if (draft.state !== "draft") return { status: "locked", draft };
  if (Number(expectedRevision) !== draft.revision) return { status: "conflict", draft };

  const updated = {
    ...draft,
    metadata: normalizeMetadata(metadata),
    body: String(body ?? ""),
    revision: draft.revision + 1,
    updatedAt: new Date().toISOString(),
  };
  await atomicWrite(draftPath(id), updated);
  return { status: "ok", draft: updated };
}

export async function markPreviewed(id, revision) {
  const draft = await getDraft(id);
  if (!draft || draft.revision !== revision) return draft;
  draft.lastPreviewRevision = revision;
  await atomicWrite(draftPath(id), draft);
  return draft;
}

export async function markPublished(id, { sourcePath, commit, pushed }) {
  const draft = await getDraft(id);
  if (!draft) return null;
  draft.state = "published";
  draft.sourcePath = sourcePath;
  draft.publishedCommit = commit;
  draft.pushed = Boolean(pushed);
  draft.publishedAt = new Date().toISOString();
  draft.updatedAt = draft.publishedAt;
  await atomicWrite(draftPath(id), draft);
  return draft;
}

export async function markPushed(id) {
  const draft = await getDraft(id);
  if (!draft || draft.state !== "published") return null;
  draft.pushed = true;
  draft.updatedAt = new Date().toISOString();
  await atomicWrite(draftPath(id), draft);
  return draft;
}

export async function removeDraft(id) {
  const draft = await getDraft(id);
  if (!draft) return false;
  if (draft.state !== "draft") throw new Error("已发布记录不能删除");
  await fs.unlink(draftPath(id));
  return true;
}
