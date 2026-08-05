(function () {
  function parseActive(token) {
    const colon = token.lastIndexOf(":");
    let cls = token;
    let dots;

    if (colon > 0 && !Number.isNaN(Number(token.slice(colon + 1)))) {
      dots = Number(token.slice(colon + 1));
      cls = token.slice(0, colon);
    }

    cls = cls.replace(/\+/g, " ");
    if (cls.startsWith("g-dots")) {
      cls = cls === "g-dots" ? "g-dots" : "g-dots " + cls;
    }

    const spec = { type: "active", class: cls };
    if (dots) spec.dots = dots;
    return spec;
  }

  function parseToken(token) {
    if (token === "c") return { type: "cell" };
    if (token === "m") return { type: "muted" };
    if (token.startsWith("a:")) return parseActive(token.slice(2));
    return { type: "cell" };
  }

  function addDots(span, count) {
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("i");
      dot.className = "g-dot";
      span.appendChild(dot);
    }
  }

  function appendCell(grid, spec, extra) {
    const span = document.createElement("span");

    if (spec.type === "muted") {
      span.className = "g-cell--muted";
    } else if (spec.type === "active") {
      span.className = "g-cell " + spec.class;
      if (spec.dots) addDots(span, spec.dots);
    } else {
      span.className = "g-cell" + (extra ? " " + extra : "");
    }

    grid.appendChild(span);
  }

  function fillGrid(grid, item) {
    const extra = item.dataset.cell || "";

    if (item.dataset.fill) {
      item.dataset.fill.split(",").forEach((token) => {
        appendCell(grid, parseToken(token.trim()), extra);
      });
      return;
    }

    const total = Number(item.dataset.n);
    if (!total) return;

    const [activeIndex, activeClass] = (item.dataset.active || "").split(":");
    const mutedAll = item.hasAttribute("data-muted-all");

    for (let i = 0; i < total; i++) {
      if (activeIndex && String(i) === activeIndex) {
        appendCell(
          grid,
          { type: "active", class: (activeClass || "").replace(/\+/g, " ") },
          ""
        );
      } else if (mutedAll) {
        appendCell(grid, { type: "muted" }, "");
      } else {
        appendCell(grid, { type: "cell" }, extra);
      }
    }
  }

  document.querySelectorAll(".g-item[data-label]").forEach((item) => {
    const label = document.createElement("p");
    label.className = "g-label";
    label.textContent = item.dataset.label;

    const grid = document.createElement("div");
    grid.className = "g-grid " + (item.dataset.grid || "");

    item.append(label, grid);
    fillGrid(grid, item);
  });
})();
