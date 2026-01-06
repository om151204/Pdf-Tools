const { mergePDFs } = require("../services/pdfMerge.service");
const { splitPDF } = require("../services/pdfSplit.service");
const { compressPDF } = require("../services/pdfCompress.service");
const cleanupFiles = require("../utils/fileCleanup");

async function mergePDF(req, res) {
  if (!req.files || req.files.length < 2)
    return res.status(400).json({ message: "Upload at least 2 PDFs" });

  const output = await mergePDFs(req.files);
  cleanupFiles(req.files);
  res.download(output);
}

async function splitPdfController(req, res) {
  const { startPage, endPage } = req.body;

  if (!startPage || !endPage)
    return res.status(400).json({ message: "Page range required" });

  const output = await splitPDF(
    req.files[0],
    Number(startPage),
    Number(endPage)
  );

  cleanupFiles(req.files);
  res.download(output);
}

async function compressPdfController(req, res) {
  const output = await compressPDF(req.files[0]);
  cleanupFiles(req.files);
  res.download(output);
}

module.exports = {
  mergePDF,
  splitPdfController,
  compressPdfController
};
