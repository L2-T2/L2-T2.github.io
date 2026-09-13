import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { PROJECT_ROOT, SERVER } from "../config.mjs";

const runFile = promisify(execFile);

export async function git(args, options = {}) {
  const { stdout } = await runFile("git", args, {
    cwd: PROJECT_ROOT,
    maxBuffer: 8 * 1024 * 1024,
    ...options,
  });
  return stdout.trim();
}

export async function currentCommit() {
  return git(["rev-parse", "HEAD"]);
}

export async function fileAtCommit(commit, sourcePath) {
  if (!/^[a-f0-9]{7,40}$/i.test(commit)) throw new Error("版本号无效");
  return git(["show", `${commit}:${sourcePath}`]);
}

export async function versionsForFile(sourcePath) {
  const separator = "--EDITOR-FIELD--";
  const record = "--EDITOR-RECORD--";
  const output = await git([
    "log",
    "--follow",
    "-n",
    "50",
    `--format=${record}%H${separator}%aI${separator}%an${separator}%s`,
    "--",
    sourcePath,
  ]);
  return output
    .split(record)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [sha, date, author, subject] = item.split(separator);
      return { sha, shortSha: sha.slice(0, 8), date, author, subject };
    });
}

async function pushCurrentBranch() {
  await git(["push", "origin", "HEAD"]);
}

export async function retryPush() {
  await pushCurrentBranch();
  return true;
}

export async function commitPublishedFile({ sourcePath, content, title, category, draftId }) {
  const absolute = path.join(PROJECT_ROOT, sourcePath);
  const before = await fs.readFile(absolute, "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  const status = await git(["status", "--porcelain=v1", "--", sourcePath]);
  if (status) throw new Error("目标文章在编辑器之外已有未提交修改，请先处理后再发布");

  await fs.mkdir(path.dirname(absolute), { recursive: true });
  const temporary = `${absolute}.editor-tmp`;
  await fs.writeFile(temporary, content, "utf8");
  await fs.rename(temporary, absolute);

  try {
    await git(["add", "--", sourcePath]);
    await git([
      "commit",
      "-m",
      `publish(${category}): ${title}`,
      "-m",
      `Editor-Draft: ${draftId}`,
      "--",
      sourcePath,
    ]);
  } catch (error) {
    if (before === null) await fs.unlink(absolute).catch(() => {});
    else await fs.writeFile(absolute, before, "utf8");
    await git(["reset", "--", sourcePath]).catch(() => {});
    throw error;
  }

  const commit = await currentCommit();
  let pushed = false;
  let pushError = null;
  if (SERVER.autoPush) {
    try {
      await pushCurrentBranch();
      pushed = true;
    } catch (error) {
      pushError = error.stderr?.trim() || error.message;
    }
  }
  return { commit, pushed, pushError };
}
