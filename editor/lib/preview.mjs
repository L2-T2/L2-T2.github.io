import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { stringify as stringifyYaml } from "yaml";
import { PRIVATE_ROOT, PROJECT_ROOT } from "../config.mjs";
import { serializeArticle, targetSourcePath } from "./content.mjs";

const runFile = promisify(execFile);
const PREVIEWS_ROOT = path.join(PRIVATE_ROOT, "previews");
const previewCache = new Map();

function safePreviewPath(id, relativePath) {
  if (!/^[a-f0-9-]{36}$/.test(id)) return null;
  const root = path.join(PREVIEWS_ROOT, id, "public");
  const absolute = path.resolve(root, relativePath || "index.html");
  return absolute === root || absolute.startsWith(`${root}${path.sep}`) ? absolute : null;
}

export function previewFilePath(id, relativePath) {
  return safePreviewPath(id, relativePath);
}

export async function buildPreview(draft) {
  const cached = previewCache.get(draft.id);
  if (cached?.revision === draft.revision) return cached;

  const root = path.join(PREVIEWS_ROOT, draft.id);
  const source = path.join(root, "source");
  const output = path.join(root, "public");
  await fs.mkdir(PREVIEWS_ROOT, { recursive: true, mode: 0o700 });
  await fs.rm(root, { recursive: true, force: true });
  await fs.mkdir(root, { recursive: true, mode: 0o700 });
  await fs.cp(path.join(PROJECT_ROOT, "source"), source, { recursive: true });

  const target = targetSourcePath(draft.metadata);
  const absoluteTarget = path.join(root, target);
  await fs.mkdir(path.dirname(absoluteTarget), { recursive: true });
  await fs.writeFile(
    absoluteTarget,
    serializeArticle(draft.metadata, draft.body, draft.frontMatterExtras),
    "utf8",
  );

  if (draft.sourcePath && draft.sourcePath !== target) {
    await fs.unlink(path.join(root, draft.sourcePath)).catch(() => {});
  }

  const basePath = `/api/preview/${draft.id}/site/`;
  const configPath = path.join(root, "preview.yml");
  await fs.writeFile(
    configPath,
    stringifyYaml({
      source_dir: source,
      public_dir: output,
      url: `http://preview.invalid${basePath}`,
      root: basePath,
      render_drafts: false,
    }),
    "utf8",
  );

  const hexo = path.join(PROJECT_ROOT, "node_modules", ".bin", "hexo");
  await runFile(hexo, ["generate", "--config", `_config.yml,${configPath}`, "--output", root], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, NODE_ENV: "production" },
    maxBuffer: 16 * 1024 * 1024,
  });

  const languagePrefix = draft.metadata.lang === "zh-CN" ? "zh/" : "";
  const articleUrl = `${basePath}${languagePrefix}${draft.metadata.category}/${draft.metadata.slug}/`;
  const result = { revision: draft.revision, articleUrl, output, builtAt: new Date().toISOString() };
  previewCache.set(draft.id, result);
  return result;
}

export async function clearPreview(id) {
  previewCache.delete(id);
  await fs.rm(path.join(PREVIEWS_ROOT, id), { recursive: true, force: true });
}

export async function cleanupPreviews() {
  await fs.mkdir(PREVIEWS_ROOT, { recursive: true, mode: 0o700 });
  const entries = await fs.readdir(PREVIEWS_ROOT, { withFileTypes: true });
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const target = path.join(PREVIEWS_ROOT, entry.name);
        const stat = await fs.stat(target);
        if (stat.mtimeMs < cutoff) await fs.rm(target, { recursive: true, force: true });
      }),
  );
}
