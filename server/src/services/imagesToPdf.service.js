const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const outputDir = "output";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function imagesToPdf(files) {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const imageBytes = fs.readFileSync(file.path);
    const image = file.mimetype === "image/png"
      ? await pdfDoc.embedPng(imageBytes)
      : await pdfDoc.embedJpg(imageBytes);

    const page = pdfDoc.addPage([
      image.width,
      image.height
    ]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
  }

  const outputPath = path.join(
    outputDir,
    `images-to-pdf-${Date.now()}.pdf`
  );

  fs.writeFileSync(outputPath, await pdfDoc.save());
  return outputPath;
}

module.exports = { imagesToPdf };
