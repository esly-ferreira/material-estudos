document.addEventListener("DOMContentLoaded", () => {
  if (window.hljs) {
    hljs.highlightAll();
  }

  document.querySelectorAll(".code-block").forEach((block) => {
    const header = block.querySelector(".code-block__header");
    const code = block.querySelector("code");
    if (!header || !code || header.querySelector(".code-block__copy")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-block__copy";
    button.textContent = "Copiar";
    button.setAttribute("aria-label", "Copiar código");

    button.addEventListener("click", async () => {
      const text = code.textContent.trim();

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }

      button.textContent = "Copiado!";
      button.classList.add("is-copied");

      setTimeout(() => {
        button.textContent = "Copiar";
        button.classList.remove("is-copied");
      }, 1600);
    });

    header.appendChild(button);
  });
});
