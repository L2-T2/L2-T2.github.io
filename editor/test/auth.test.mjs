import test from "node:test";
import assert from "node:assert/strict";
import { createPasswordHash, createSession, readSession, verifyPassword } from "../lib/auth.mjs";

test("密码只以 scrypt 哈希校验", async () => {
  const hash = await createPasswordHash("correct horse battery staple");
  assert.equal(await verifyPassword("correct horse battery staple", hash), true);
  assert.equal(await verifyPassword("wrong password", hash), false);
  assert.equal(hash.includes("correct horse"), false);
});

test("会话签名不可伪造并包含 CSRF 令牌", () => {
  const secret = "a".repeat(48);
  const session = createSession(secret, 1);
  const parsed = readSession(session.token, secret);
  assert.equal(parsed.csrf, session.csrf);
  assert.equal(readSession(`${session.token}x`, secret), null);
  assert.equal(readSession(session.token, "b".repeat(48)), null);
});
