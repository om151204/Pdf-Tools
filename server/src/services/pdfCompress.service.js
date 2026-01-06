const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = "output";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function compressPDF(file) {
  const pdfBytes = fs.readFileSync(file.path);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setProducer("");

  const compressedBytes = await pdfDoc.save({
    useObjectStreams: false
  });

  const outputPath = path.join(
    outputDir,
    `compressed-${Date.now()}.pdf`
  );

  fs.writeFileSync(outputPath, compressedBytes);
  return outputPath;
}

module.exports = { compressPDF };
