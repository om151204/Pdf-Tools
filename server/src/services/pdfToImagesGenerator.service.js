const fs = require("fs");
const path = require("path");
const { fromPath } = require("pdf2pic");

async function generateImagesFromPdf(pdfFile) {
  const outputDir = path.join(
    __dirname,
    "..",
    "..",
    "output",
    "images",
    Date.now().toString()
  );

  fs.mkdirSync(outputDir, { recursive: true });

  const converter = fromPath(pdfFile.path, {
    density: 150,
    saveFilename: "page",
    savePath: outputDir,
    format: "png",
    width: 1200,
    height: 1600
  });

  await converter.bulk(-1); // convert all pages

  return outputDir;
}

module.exports = generateImagesFromPdf;