const script = `(() => {
  const targetTitle = "Toolontips Photo Studio | Free Browser Image Editor";
  const observedAttributes = ["aria-label", "title", "placeholder", "alt", "content", "data-os-theme"];
  let darkTheme = false;
  let applyingTheme = false;
  let originalSetTheme = null;

  const storedTheme = () => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  };
  const prefersDark = () => {
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches; } catch { return false; }
  };
  const resolveDark = () => {
    const value = storedTheme();
    if (value === "dark") return true;
    if (value === "light") return false;
    return prefersDark();
  };
  const osTheme = () => darkTheme ? "midnight" : "light";
  const themeColor = () => darkTheme ? "#0b1120" : "#ffffff";

  const syncTheme = (updateEditor = true) => {
    if (applyingTheme) return;
    applyingTheme = true;
    try {
      const nextDark = resolveDark();
      darkTheme = nextDark;
      const root = document.documentElement;
      root.classList.toggle("dark", nextDark);
      root.classList.remove("theme-light", "theme-midnight", "theme-oled");
      root.classList.add(nextDark ? "theme-midnight" : "theme-light");
      const dataTheme = osTheme();
      if (root.dataset.osTheme !== dataTheme) root.dataset.osTheme = dataTheme;
      const meta = document.getElementById("theme-color-meta");
      const color = themeColor();
      if (meta && meta.getAttribute("content") !== color) meta.setAttribute("content", color);
      if (updateEditor && originalSetTheme && typeof OS !== "undefined" && OS._currentTheme !== dataTheme) {
        originalSetTheme(dataTheme, { persist:false });
      }
    } finally {
      applyingTheme = false;
    }
  };

  syncTheme(false);

  const replaceInTextNode = (node) => {
    if (!node.nodeValue || !node.nodeValue.includes("OpenShop")) return;
    const parent = node.parentElement;
    if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) return;
    node.nodeValue = node.nodeValue.replaceAll("OpenShop", "Toolontips Photo Studio");
  };

  const replaceInElement = (element) => {
    if (element === document.documentElement) {
      syncTheme(false);
      return;
    }
    if (element.id === "theme-color-meta") {
      const color = themeColor();
      if (element.getAttribute("content") !== color) element.setAttribute("content", color);
      return;
    }
    if (element.tagName === "TITLE") {
      if (element.textContent.includes("OpenShop")) element.textContent = targetTitle;
      return;
    }
    for (const attribute of observedAttributes) {
      const value = element.getAttribute(attribute);
      if (value && value.includes("OpenShop")) {
        element.setAttribute(attribute, value.replaceAll("OpenShop", "Toolontips Photo Studio"));
      }
    }
  };

  const scan = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      replaceInTextNode(node);
      node = walker.nextNode();
    }
    if (root.nodeType === Node.ELEMENT_NODE) replaceInElement(root);
    root.querySelectorAll?.("*").forEach(replaceInElement);
  };

  scan(document.documentElement);

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "characterData") replaceInTextNode(record.target);
      if (record.type === "childList") {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) replaceInTextNode(node);
          else if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        });
      }
      if (record.type === "attributes" && record.target.nodeType === Node.ELEMENT_NODE) {
        replaceInElement(record.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: observedAttributes,
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "theme") syncTheme(true);
  });

  try {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => syncTheme(true));
  } catch {}

  const patchTheme = () => {
    if (typeof OS === "undefined" || !OS.setTheme || OS.__toolontipsThemePatched) return;
    originalSetTheme = OS.setTheme.bind(OS);
    OS.__toolontipsThemePatched = true;
    OS.setTheme = function() { syncTheme(true); };
    syncTheme(true);
  };

  const patchDiscardPrompt = () => {
    if (typeof OS === "undefined" || !OS._confirmDiscardUnsaved || OS.__toolontipsDiscardPatched) return;
    OS.__toolontipsDiscardPatched = true;
    const original = OS._confirmDiscardUnsaved.bind(OS);
    OS._confirmDiscardUnsaved = function(action, options) {
      const label = String(action || "");
      if (/^Opening an image$/i.test(label) || /^Opening a launched file$/i.test(label)) {
        return Promise.resolve(true);
      }
      return original(label, options);
    };
  };

  const bootObserver = new MutationObserver(() => {
    if (document.documentElement.dataset.osBoot === "ready") {
      patchTheme();
      patchDiscardPrompt();
      bootObserver.disconnect();
    }
  });
  bootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-os-boot"],
  });
  if (document.documentElement.dataset.osBoot === "ready") {
    patchTheme();
    patchDiscardPrompt();
    bootObserver.disconnect();
  }
})();`;

export async function GET() {
  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0",
    },
  });
}
