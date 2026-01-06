const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = "output";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function splitPDF(file, startPage, endPage) {
  const pdfBytes = fs.readFileSync(file.path);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    pdfDoc,
    Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage - 1 + i
    )
  );

  pages.forEach(page => newPdf.addPage(page));

  const outputPath = path.join(
    outputDir,
    `split-${Date.now()}.pdf`
  );

  fs.writeFileSync(outputPath, await newPdf.save());
  return outputPath;
}

module.exports = { splitPDF };
