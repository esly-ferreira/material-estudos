(function () {
  const EXIT_MS = 300;
  const ENTER_DELAY_MS = 120;
  const FALLBACK_MS = 2000;
  const root = document.documentElement;
  const startTime = performance.now();

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function isInternalNavigation(link) {
    if (link.target === "_blank" || link.hasAttribute("download")) return false;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return false;
    }

    try {
      const url = new URL(link.href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  function playEnterAnimation() {
    if (prefersReducedMotion()) {
      root.classList.remove("page-transition-pending", "page-transition-exit");
      root.classList.add("page-transition-ready");
      return;
    }

    root.classList.remove("page-transition-exit");

    const elapsed = performance.now() - startTime;
    const delay = Math.max(0, ENTER_DELAY_MS - elapsed);

    window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove("page-transition-pending");
          root.classList.add("page-transition-ready");
        });
      });
    }, delay);
  }

  function exitPage(url) {
    root.classList.remove("page-transition-ready");
    root.classList.add("page-transition-exit");

    window.setTimeout(() => {
      window.location.href = url;
    }, EXIT_MS);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !isInternalNavigation(link)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    exitPage(link.href);
  });

  if (document.readyState === "complete") {
    playEnterAnimation();
  } else {
    window.addEventListener("load", playEnterAnimation, { once: true });
  }

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    root.classList.remove("page-transition-ready");
    root.classList.add("page-transition-pending");
    playEnterAnimation();
  });

  window.setTimeout(() => {
    root.classList.add("page-transition-ready");
    root.classList.remove("page-transition-pending", "page-transition-exit");
  }, FALLBACK_MS);
})();
