function parseFlexibleDate(value) {
  if (!value) return Number.NEGATIVE_INFINITY;
  if (typeof value === "number") return value;
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function normalizeTag(tag) {
  if (!tag) return null;

  if (typeof tag === "string") {
    return { name: tag, path: "" };
  }

  if (typeof tag === "object") {
    const name = typeof tag.name === "string" ? tag.name : "";
    if (!name) return null;
    return {
      name,
      path: typeof tag.path === "string" ? tag.path : ""
    };
  }

  return null;
}

function uniqueTags(tags) {
  const seen = new Set();
  const results = [];

  tags.forEach((tag) => {
    const normalized = normalizeTag(tag);
    if (!normalized) return;
    const key = normalized.name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    results.push(normalized);
  });

  return results;
}

function getLatestTags(items) {
  const sorted = [...items].sort((a, b) => parseFlexibleDate(b.date) - parseFlexibleDate(a.date));
  for (const item of sorted) {
    const tags = uniqueTags(Array.isArray(item.tags) ? item.tags : []);
    if (tags.length) return tags.slice(0, 3);
  }
  return [];
}

function getRandomTags(items, count = 3) {
  const pool = uniqueTags(
    items.flatMap((item) => (Array.isArray(item.tags) ? item.tags : []))
  );

  if (!pool.length) return [];

  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

function getTopTags(items, count = 3) {
  const counts = new Map();

  items.forEach((item) => {
    uniqueTags(Array.isArray(item.tags) ? item.tags : []).forEach((tag) => {
      const key = tag.name.toLowerCase();
      const current = counts.get(key) || { name: tag.name, path: tag.path || "", count: 0 };
      current.count += 1;
      if (!current.path && tag.path) current.path = tag.path;
      counts.set(key, current);
    });
  });

  return Array.from(counts.values())
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
    .slice(0, count)
    .map(({ name, path }) => ({ name, path }));
}

function renderTagSlots(container, tags) {
  const slots = [...container.querySelectorAll("[data-tag-slot]")];

  slots.forEach((slot, index) => {
    const tag = tags[index];
    const textNode = slot.querySelector(".tag-slot-text");

    if (!tag) {
      slot.classList.add("is-empty");
      slot.removeAttribute("href");
      slot.setAttribute("aria-disabled", "true");
      if (textNode) textNode.textContent = "";
      return;
    }

    slot.classList.remove("is-empty");
    slot.removeAttribute("aria-disabled");
    if (textNode) textNode.textContent = tag.name;

    if (tag.path) {
      slot.setAttribute("href", tag.path);
    } else {
      slot.removeAttribute("href");
    }
  });
}

function setActiveMode(moduleElement, mode) {
  moduleElement.dataset.activeMode = mode;
  moduleElement.querySelectorAll(".tag-light").forEach((light) => {
    light.classList.toggle("is-active", light.dataset.mode === mode);
    light.setAttribute("aria-pressed", String(light.dataset.mode === mode));
  });
}

function parseTagItems(moduleElement) {
  const raw = moduleElement.dataset.tagItems || "[]";
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createTagModuleController(moduleElement) {
  const items = parseTagItems(moduleElement);
  const computeTags = (mode) => {
    if (mode === "random") return getRandomTags(items);
    if (mode === "top") return getTopTags(items);
    return getLatestTags(items);
  };

  const update = (mode) => {
    const tags = computeTags(mode);
    setActiveMode(moduleElement, mode);
    renderTagSlots(moduleElement, tags);
  };

  moduleElement.querySelectorAll(".tag-light").forEach((light) => {
    light.addEventListener("click", () => {
      update(light.dataset.mode || "latest");
    });
  });

  update("latest");
}

async function copyTextToClipboard(text) {
  if (!text) return false;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path below.
    }
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  helper.style.pointerEvents = "none";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(helper);
  return copied;
}

function createCopyToastController() {
  const toast = document.querySelector("[data-copy-toast]");
  if (!toast) {
    return { show() {} };
  }

  let hideTimer = 0;

  return {
    show(message) {
      window.clearTimeout(hideTimer);
      toast.textContent = message;
      toast.classList.add("is-visible");
      hideTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 1800);
    }
  };
}

function initEmailCopyButtons() {
  const toast = createCopyToastController();
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail || "";
      const copied = await copyTextToClipboard(email);
      if (copied) {
        toast.show(`${button.dataset.copySuccess || "Email copied:"} ${email}`);
        return;
      }
      toast.show(`${button.dataset.copyError || "Copy failed:"} ${email}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tag-module]").forEach((moduleElement) => {
    createTagModuleController(moduleElement);
  });
  initEmailCopyButtons();
});
