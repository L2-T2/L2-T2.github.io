import path from "node:path";

export const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
export const PRIVATE_ROOT = path.resolve(
  process.env.EDITOR_DATA_DIR || path.join(PROJECT_ROOT, ".content"),
);

export const CONTENT_TYPES = Object.freeze({
  "learning-journals": {
    label: { zh: "学习札记", en: "Learning journal" },
    fields: ["course"],
  },
  essay: {
    label: { zh: "随笔", en: "Essay" },
    fields: ["subtitle", "byline"],
  },
  project: {
    label: { zh: "项目", en: "Project" },
    fields: ["status", "repo", "featured"],
  },
  "technical-notes": {
    label: { zh: "技术笔记", en: "Technical note" },
    fields: ["repo"],
  },
});

export const LANGUAGES = Object.freeze({
  en: { label: "English", directory: "en", langPath: "" },
  "zh-CN": { label: "中文", directory: "zh", langPath: "zh/" },
});

export const SERVER = Object.freeze({
  host: process.env.EDITOR_HOST || "127.0.0.1",
  port: Number(process.env.EDITOR_PORT || 4173),
  sessionHours: Number(process.env.EDITOR_SESSION_HOURS || 12),
  secureCookies:
    process.env.EDITOR_SECURE_COOKIES === "true" || process.env.NODE_ENV === "production",
  autoPush:
    process.env.EDITOR_AUTO_PUSH === "true" ||
    (process.env.NODE_ENV === "production" && process.env.EDITOR_AUTO_PUSH !== "false"),
});
