const { mergePDFs } = require("../services/pdfMerge.service");
const cleanupFiles = require("../utils/fileCleanup");

async function mergePDF(req, res) {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: "Upload at least 2 PDFs" });
    }

    const outputPath = await mergePDFs(req.files);
    cleanupFiles(req.files);

    res.download(outputPath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { mergePDF };
