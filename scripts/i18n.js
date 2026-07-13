function toArray(collection) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (typeof collection.toArray === "function") return collection.toArray();
  if (Array.isArray(collection.data)) return collection.data;
  return [];
}

function languageKey(document) {
  const value = String((document && (document.lang || document.language)) || "").toLowerCase();
  if (value.startsWith("zh")) return "zh";

  const path = String((document && document.path) || "").replace(/^\//, "");
  return path === "zh" || path.startsWith("zh/") ? "zh" : "en";
}

function languageCode(document) {
  return languageKey(document) === "zh" ? "zh-CN" : "en";
}

function normalizeBasePath(value) {
  const clean = String(value || "")
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^zh\//, "");
  return clean;
}

function languagePath(value, language) {
  const clean = normalizeBasePath(value);
  const prefix = languageKey({ lang: language }) === "zh" ? "zh/" : "";
  return `/${prefix}${clean}${clean ? "/" : ""}`;
}

function firstCategory(document) {
  const categories = toArray(document && document.categories);
  const category = categories[0];
  return category && (category.name || category.slug) ? category.name || category.slug : "";
}

function documentsFor(site) {
  return [...toArray(site && site.posts), ...toArray(site && site.pages)];
}

function tagSlug(tag) {
  if (!tag) return "";
  return String(tag.slug || tag.name || tag).replace(/^\/+|\/+$/g, "");
}

hexo.extend.helper.register("page_language", function pageLanguage(document) {
  return languageKey(document || this.page);
});

hexo.extend.helper.register("page_language_code", function pageLanguageCode(document) {
  return languageCode(document || this.page);
});

hexo.extend.helper.register("localized_url", function localizedUrl(value, language) {
  return this.url_for(languagePath(value, language || languageCode(this.page)));
});

hexo.extend.helper.register("localized_tag_url", function localizedTagUrl(tag, language) {
  const slug = tagSlug(tag);
  if (!slug) return this.url_for(languagePath("tags", language || languageCode(this.page)));
  return this.url_for(languagePath(`tags/${slug}`, language || languageCode(this.page)));
});

hexo.extend.helper.register("language_switch_url", function languageSwitchUrl(targetLanguage) {
  const page = this.page || {};
  const targetKey = languageKey({ lang: targetLanguage });
  const targetCode = targetKey === "zh" ? "zh-CN" : "en";
  const home = (typeof this.is_home === "function" && this.is_home()) || page.layout === "home" || page.translation_key === "home";

  if (home) return this.url_for(languagePath("", targetCode));

  const archive = (typeof this.is_archive === "function" && this.is_archive()) || page.layout === "archives" || page.translation_key === "archives";
  if (archive) return this.url_for(languagePath("archives", targetCode));

  const tagPage = (typeof this.is_tag === "function" && this.is_tag()) || page.layout === "tags" || page.type === "tags";
  if (tagPage) {
    if (page.tag) {
      const targetPosts = toArray(this.site && this.site.posts).filter((post) => languageKey(post) === targetKey);
      const hasMatchingTag = targetPosts.some((post) =>
        toArray(post.tags).some((tag) => String(tag.name || tag) === String(page.tag))
      );
      if (hasMatchingTag) return this.url_for(languagePath(`tags/${tagSlug(page.tag_slug || page.tag)}`, targetCode));
    }
    return this.url_for(languagePath("tags", targetCode));
  }

  if (page.translation_key) {
    const translation = documentsFor(this.site).find(
      (document) => document.translation_key === page.translation_key && languageKey(document) === targetKey
    );
    if (translation && translation.path) {
      const translationPath = String(translation.path)
        .replace(/^\//, "")
        .replace(/index\.html$/, "");
      return this.url_for(`/${translationPath}`);
    }
  }

  const section = page.section || firstCategory(page);
  if (section) return this.url_for(languagePath(section, targetCode));
  return this.url_for(languagePath("", targetCode));
});

hexo.extend.generator.register("tag", function bilingualTagGenerator(locals) {
  const routes = [];

  [
    { key: "en", code: "en", prefix: "" },
    { key: "zh", code: "zh-CN", prefix: "zh/" }
  ].forEach((language) => {
    const languagePosts = locals.posts
      .filter((post) => languageKey(post) === language.key)
      .sort("-date");
    const tags = new Map();

    languagePosts.forEach((post) => {
      toArray(post.tags).forEach((tag) => {
        if (!tag || !tag.name) return;
        const key = String(tag.slug || tag.name);
        if (!tags.has(key)) tags.set(key, { tag, posts: [] });
        tags.get(key).posts.push(post);
      });
    });

    Array.from(tags.values()).forEach(({ tag, posts }) => {
      routes.push({
        path: `${language.prefix}tags/${tag.slug || tag.name}/index.html`,
        layout: ["layout"],
        data: {
          title: `#${tag.name}`,
          layout: "tags",
          type: "tags",
          lang: language.code,
          tag: tag.name,
          tag_slug: tag.slug || tag.name,
          posts,
          translation_key: `tag:${tag.slug || tag.name}`
        }
      });
    });
  });

  return routes;
});
