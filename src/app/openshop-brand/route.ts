const script = `(() => {
  const targetTitle = "Toolontips Photo Studio | Free Browser Image Editor";
  const observedAttributes = ["aria-label", "title", "placeholder", "alt", "content", "data-os-theme"];

  document.documentElement.dataset.osTheme = "light";

  const replaceInTextNode = (node) => {
    if (!node.nodeValue || !node.nodeValue.includes("OpenShop")) return;
    const parent = node.parentElement;
    if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) return;
    node.nodeValue = node.nodeValue.replaceAll("OpenShop", "Toolontips Photo Studio");
  };

  const replaceInElement = (element) => {
    if (element === document.documentElement && element.dataset.osTheme !== "light") {
      element.dataset.osTheme = "light";
    }
    if (element.id === "theme-color-meta") {
      if (element.getAttribute("content") !== "#ffffff") element.setAttribute("content", "#ffffff");
      return;
    }
    if (element.tagName === "TITLE") {
      if (element.textContent.includes("OpenShop")) element.textContent = targetTitle;
      return;
    }
    for (const attribute of observedAttributes) {
      if (attribute === "data-os-theme") continue;
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
      patchDiscardPrompt();
      bootObserver.disconnect();
    }
  });
  bootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-os-boot"],
  });
  if (document.documentElement.dataset.osBoot === "ready") {
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
