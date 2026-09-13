import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);

function b64(value) {
  return Buffer.from(value).toString("base64url");
}

export async function createPasswordHash(password) {
  if (String(password).length < 12) throw new Error("密码至少需要 12 个字符");
  if (String(password).length > 512) throw new Error("密码不能超过 512 个字符");
  const salt = crypto.randomBytes(16);
  const derived = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${Buffer.from(derived).toString("base64url")}`;
}

export async function verifyPassword(password, encoded) {
  if (typeof password !== "string" || password.length < 1 || password.length > 512) return false;
  const [kind, saltText, expectedText] = String(encoded || "").split("$");
  if (kind !== "scrypt" || !saltText || !expectedText) return false;
  const expected = Buffer.from(expectedText, "base64url");
  const actual = Buffer.from(await scrypt(String(password), Buffer.from(saltText, "base64url"), expected.length));
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export function createSession(secret, hours) {
  const csrf = crypto.randomBytes(24).toString("base64url");
  const payload = b64(
    JSON.stringify({
      exp: Date.now() + hours * 60 * 60 * 1000,
      csrf,
      nonce: crypto.randomBytes(12).toString("base64url"),
    }),
  );
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return { token: `${payload}.${signature}`, csrf };
}

export function readSession(token, secret) {
  try {
    const [payload, signature] = String(token || "").split(".");
    const expected = crypto.createHmac("sha256", secret).update(payload).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export function parseCookies(header) {
  return Object.fromEntries(
    String(header || "")
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key]) => key)
      .map(([key, ...value]) => [key, decodeURIComponent(value.join("="))]),
  );
}
