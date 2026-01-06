const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = "output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function mergePDFs(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }

  const outputPath = path.join(outputDir, `merged-${Date.now()}.pdf`);
  const mergedBytes = await mergedPdf.save();

  fs.writeFileSync(outputPath, mergedBytes);

  return outputPath;
}

module.exports = { mergePDFs };
