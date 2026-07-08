const fs = require("fs");
const path = require("path");

function copyDirectory(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) return;
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.name.endsWith(".html")) continue;
    fs.copyFileSync(sourcePath, targetPath);
  }
}

hexo.extend.filter.register("after_generate", () => {
  const sourceDir = path.join(hexo.base_dir, "homepage");
  const targetDir = path.join(hexo.public_dir, "homepage");
  copyDirectory(sourceDir, targetDir);
});

hexo.extend.helper.register("load_homepage_template", () => {
  const templatePath = path.join(hexo.base_dir, "homepage", "homepage.html");
  return fs.readFileSync(templatePath, "utf8");
});
