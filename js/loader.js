(() => {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  document.body.classList.add("is-loading");

  const MIN_MS = 700;
  const startedAt = performance.now();
  let finished = false;

  const fadeMs = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 550;

  const hide = () => {
    if (finished) return;
    finished = true;

    const wait = Math.max(0, MIN_MS - (performance.now() - startedAt));

    window.setTimeout(() => {
      loader.setAttribute("aria-busy", "false");
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");

      window.setTimeout(() => {
        document.body.classList.add("is-ready");
        loader.remove();
      }, fadeMs());
    }, wait);
  };

  const waitForWindow = new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });

  const waitForFonts =
    document.fonts && document.fonts.ready
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();

  const waitForImages = () => {
    const images = Array.from(document.images || []);
    if (!images.length) return Promise.resolve();

    return Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      })
    );
  };

  Promise.all([waitForWindow, waitForFonts, waitForImages()]).then(hide);

  window.setTimeout(hide, 10000);
})();
