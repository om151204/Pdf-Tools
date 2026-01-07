const path = require("path");
const fs = require("fs");
const pdf = require("pdf-poppler");

const outputDir = "output";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function pdfToImages(file) {
  const opts = {
    format: "png",
    out_dir: outputDir,
    out_prefix: `page-${Date.now()}`,
    page: null
  };

  await pdf.convert(file.path, opts);

  const images = fs
    .readdirSync(outputDir)
    .filter(f => f.endsWith(".png"))
    .map(f => path.join(outputDir, f));

  return images;
}

module.exports = { pdfToImages };
