export async function docxToPdf(file: File): Promise<Uint8Array> {
  if (!/\.docx$/i.test(file.name) && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    throw new Error("UNSUPPORTED_DOCX");
  }

  const container = document.createElement("div");
  const styles = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  Object.assign(container.style, {
    position: "fixed",
    left: "-20000px",
    top: "0",
    width: "794px",
    minHeight: "1123px",
    background: "#ffffff",
    padding: "0",
    margin: "0",
    zIndex: "-1",
  });
  document.body.appendChild(container);
  document.body.appendChild(styles);

  try {
    const { renderAsync } = await import("docx-preview");
    await renderAsync(file, container, styles, {
      breakPages: true,
      ignoreLastRenderedPageBreak: false,
      useBase64URL: true,
    });

    const { default: html2pdf } = await import("html2pdf.js");
    const pdf = await html2pdf()
      .set({
        margin: 0,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowWidth: container.scrollWidth,
          windowHeight: container.scrollHeight,
        },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .from(container)
      .toPdf()
      .get("pdf");

    const output = await pdf.output("arraybuffer");
    return new Uint8Array(output as ArrayBuffer);
  } finally {
    container.remove();
    styles.remove();
  }
}
