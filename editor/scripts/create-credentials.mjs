import crypto from "node:crypto";
import { stdin, stdout } from "node:process";
import { createPasswordHash } from "../lib/auth.mjs";

function hiddenQuestion(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error("请在交互式终端中运行此命令");
  }
  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  let value = "";
  return new Promise((resolve, reject) => {
    function finish() {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
    }
    function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          finish();
          reject(new Error("已取消"));
          return;
        }
        if (character === "\r" || character === "\n") {
          finish();
          resolve(value);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          if (value.length) {
            value = [...value].slice(0, -1).join("");
            stdout.write("\b \b");
          }
          continue;
        }
        value += character;
        stdout.write("•");
      }
    }
    stdin.on("data", onData);
  });
}

const first = await hiddenQuestion("设置编辑器密码（至少 12 个字符）：");
const second = await hiddenQuestion("再次输入密码：");
if (first !== second) throw new Error("两次输入的密码不一致");
const passwordHash = await createPasswordHash(first);
const sessionSecret = crypto.randomBytes(48).toString("base64url");
stdout.write("\n请把下面两项放入服务端环境变量。不要写入仓库或浏览器代码：\n\n");
stdout.write(`EDITOR_PASSWORD_HASH='${passwordHash}'\n`);
stdout.write(`EDITOR_SESSION_SECRET='${sessionSecret}'\n`);
