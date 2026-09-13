# 私有文章工作台

这是现有 Hexo 网站旁边的一个独立编辑服务。它不替换公开站点，也不会把管理能力打包进 GitHub Pages。

## 状态模型

| 状态 | 保存位置 | 谁能看到 | 是否影响公开站点 |
| --- | --- | --- | --- |
| 草稿 | 服务端 `.content/drafts/` | 登录后的作者 | 否 |
| 私有预览 | 服务端 `.content/previews/` | 登录后的作者 | 否 |
| 已发布版本 | `source/_posts/` + 独立 Git commit | 所有访客（部署完成后） | 是 |

保存永远只更新草稿。预览用项目当前的 Hexo 配置、Pandoc 渲染器和 `particlex` 主题生成一个受认证保护的临时站点。发布必须通过单独的确认界面和服务端确认值；发布前还会检查公开源文件是否被其他设备或本地操作修改。

恢复历史版本会创建新草稿。它不会直接回滚公开站点，恢复后的内容仍需预览和再次确认发布。

## 本地运行

要求与正式网站构建相同：Node.js 20+、Pandoc，并已执行 `npm install`。

1. 生成密码哈希和会话密钥：

   ```bash
   npm run editor:credentials
   ```

2. 仅把输出保存到服务端环境变量。不要把它写入仓库或任何前端文件：

   ```bash
   export EDITOR_PASSWORD_HASH='scrypt$...'
   export EDITOR_SESSION_SECRET='...'
   ```

3. 启动：

   ```bash
   npm run editor
   ```

4. 在本机打开 `http://127.0.0.1:4173`。若要在同一局域网内用手机测试，可临时设置 `EDITOR_HOST=0.0.0.0`，但不要把无 HTTPS 的端口暴露到公网。

开发模式默认不会推送 Git。点击发布会创建一个只包含目标文章的 Git commit，界面会把它标为“等待推送”。设置 `EDITOR_AUTO_PUSH=true` 才会在确认发布后执行 `git push origin HEAD`。

## 生产部署要求

编辑服务可以运行在任何具备持久磁盘、Node、Pandoc 和 Git 的主机上。最低要求：

- 仓库检出目录可写，已配置 Git `user.name` / `user.email`，且服务端 Git 身份可以向远端推送；推荐使用只对本仓库有效的 deploy key；
- `.content/` 位于持久磁盘并定期备份；它已被 `.gitignore` 排除；
- 反向代理提供 HTTPS；设置 `NODE_ENV=production`，使会话 Cookie 强制 `Secure`；
- 若反向代理需要传递客户端 IP，按实际代理层数设置 `EDITOR_TRUST_PROXY`（例如单层代理设为 `1`）；服务直连公网时不要开启；
- 设置 `EDITOR_AUTO_PUSH=true`，让已确认版本进入现有 GitHub Actions / Pages 部署；
- 密码哈希、会话密钥和 SSH 私钥只能存在于服务端 secret / 环境变量中；
- 不要把编辑服务路径直接合并进公开 Pages 产物。

典型生产环境变量：

```text
NODE_ENV=production
EDITOR_HOST=127.0.0.1
EDITOR_PORT=4173
EDITOR_PASSWORD_HASH=<scrypt hash>
EDITOR_SESSION_SECRET=<至少 32 字符的随机值>
EDITOR_AUTO_PUSH=true
EDITOR_DATA_DIR=/var/lib/l2t2-editor
EDITOR_TRUST_PROXY=1
```

## 安全边界

- 客户端从不接收 GitHub token、deploy key、密码哈希或会话签名密钥。
- 登录有速率限制；会话使用 HttpOnly、SameSite=Strict Cookie，生产环境使用 Secure Cookie。
- 所有写操作还需要会话内的 CSRF token。
- 私有 API、草稿和预览都要求认证，并返回 `no-store`；预览页带 `noindex`。
- 草稿保存采用修订号乐观锁，多设备同时写入时返回冲突，不会静默覆盖。
- 编辑已发布文章时锁定语言和 Slug；发布时通过源文件哈希防止覆盖外部修改。
- 每次发布只暂存和提交一个文章文件，不会把工作区的其他修改带入版本。

第一版使用单实例内存登录限速和文件草稿存储，结构已把认证、草稿、渲染、Git 发布分开。未来可分别替换成 WebAuthn / OIDC、数据库草稿存储、对象存储媒体，而无需改变公开 Hexo 内容格式。

## 运维检查

```bash
npm test
npm run build
NODE_ENV=production EDITOR_AUTO_PUSH=false npm run editor
```

生产启动后，确认 HTTPS、登录、草稿保存、真实预览、发布后的 Git commit、推送失败重试，以及 GitHub Pages 部署结果。
