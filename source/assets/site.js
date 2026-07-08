document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("is-open", !expanded);
    });
  }

  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      window.hljs.highlightElement(block);
    });
  }

  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ]
    });
  }

  const tocLinks = [...document.querySelectorAll("[data-toc-link]")];
  const proseHeadings = [...document.querySelectorAll(".prose-essay h2[id], .prose-essay h3[id], .prose-essay h4[id]")];

  if (tocLinks.length && proseHeadings.length && "IntersectionObserver" in window) {
    const linkById = new Map(
      tocLinks.map((link) => [decodeURIComponent((link.getAttribute("href") || "").replace(/^#/, "")), link])
    );

    const setActiveTocLink = (id) => {
      tocLinks.forEach((link) => {
        const hrefId = decodeURIComponent((link.getAttribute("href") || "").replace(/^#/, ""));
        link.classList.toggle("is-active", hrefId === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.target.offsetTop - right.target.offsetTop)[0];

        if (visible) {
          setActiveTocLink(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 1]
      }
    );

    proseHeadings.forEach((heading) => observer.observe(heading));

    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (hash && linkById.has(hash)) {
      setActiveTocLink(hash);
    } else {
      setActiveTocLink(proseHeadings[0].id);
    }
  }

  const annotationRail = document.querySelector("[data-annotation-rail]");
  const entryBody = document.querySelector(".entry-body-essay");
  const proseEssay = document.querySelector(".prose-essay");
  const desktopEssayLayout = window.matchMedia("(min-width: 1101px)");

  const positionEssayAnnotations = () => {
    if (!annotationRail || !entryBody) return;

    const annotations = [...annotationRail.querySelectorAll(".essay-annotation[data-note-index]")];
    if (!annotations.length) return;

    if (!desktopEssayLayout.matches) {
      annotationRail.classList.remove("is-positioned");
      annotationRail.style.minHeight = "";
      annotations.forEach((annotation) => {
        annotation.style.top = "";
      });
      return;
    }

    annotationRail.classList.add("is-positioned");

    const railTop = annotationRail.getBoundingClientRect().top + window.scrollY;
    const proseTop = (proseEssay || entryBody).getBoundingClientRect().top + window.scrollY;
    const proseBottom =
      (proseEssay || entryBody).getBoundingClientRect().bottom + window.scrollY;
    const startOffset = Math.max(0, proseTop - railTop);
    let runningTop = 0;
    const minGap = 24;

    annotations.forEach((annotation) => {
      annotation.style.top = "0px";
    });

    annotations.forEach((annotation) => {
      const noteIndex = annotation.dataset.noteIndex;
      const marker = document.querySelector(`.essay-note-marker[data-note-index="${noteIndex}"]`);
      if (!marker) return;

      const markerRect = marker.getBoundingClientRect();
      const markerMidpoint = markerRect.top + window.scrollY + markerRect.height / 2;
      const markerOffset = Math.max(
        startOffset,
        markerMidpoint - railTop - Math.min(annotation.offsetHeight * 0.32, 28)
      );
      const nextTop = Math.max(markerOffset, runningTop);
      annotation.style.top = `${nextTop}px`;
      runningTop = nextTop + annotation.offsetHeight + minGap;
    });

    const proseHeight = Math.max(0, proseBottom - railTop);
    const requiredHeight = Math.max(proseHeight, runningTop);
    annotationRail.style.minHeight = `${requiredHeight}px`;
  };

  let annotationFrame = 0;
  const scheduleAnnotationPositioning = () => {
    window.cancelAnimationFrame(annotationFrame);
    annotationFrame = window.requestAnimationFrame(positionEssayAnnotations);
  };

  if (annotationRail && entryBody) {
    scheduleAnnotationPositioning();
    window.addEventListener("resize", scheduleAnnotationPositioning);
    window.addEventListener("load", scheduleAnnotationPositioning);
    window.addEventListener("orientationchange", scheduleAnnotationPositioning);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        scheduleAnnotationPositioning();
      });
    }

    if (proseEssay) {
      proseEssay.querySelectorAll("img").forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", scheduleAnnotationPositioning, { once: true });
        }
      });
    }

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => {
        scheduleAnnotationPositioning();
      });
      resizeObserver.observe(entryBody);
      resizeObserver.observe(annotationRail);
      if (proseEssay) {
        resizeObserver.observe(proseEssay);
      }
    }
  }
});
