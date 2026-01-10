const { mergePDFs } = require("../services/pdfMerge.service");
const { splitPDF } = require("../services/pdfSplit.service");
const { compressPDF } = require("../services/pdfCompress.service");
const { imagesToPdf } = require("../services/imagesToPdf.service");
const cleanupFiles = require("../utils/fileCleanup");

const generateImagesFromPdf = require(
  "../services/pdfToImagesGenerator.service"
);
const sendImagesAsZip = require("../services/pdfToImages.service");

/* ========= MERGE ========= */
async function mergePDF(req, res) {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ message: "Upload at least 2 PDFs" });
  }
  const output = await mergePDFs(req.files);
  cleanupFiles(req.files);
  res.download(output);
}

/* ========= SPLIT ========= */
async function splitPdfController(req, res) {
  const { startPage, endPage } = req.body;
  if (!startPage || !endPage) {
    return res.status(400).json({ message: "Page range required" });
  }

  const output = await splitPDF(
    req.files[0],
    Number(startPage),
    Number(endPage)
  );
  cleanupFiles(req.files);
  res.download(output);
}

/* ========= COMPRESS ========= */
async function compressPdfController(req, res) {
  const output = await compressPDF(req.files[0]);
  cleanupFiles(req.files);
  res.download(output);
}

/* ========= PDF → IMAGES ========= */
// async function pdfToImages(req, res) {
//   try {
//     if (!req.files || !req.files.length) {
//       return res.status(400).json({ message: "PDF file required" });
//     }

//     const imagesDir = await generateImagesFromPdf(req.files[0]);
//     await sendImagesAsZip(res, imagesDir);

//   } catch (err) {
//     console.error("PDF → Images ERROR:", err);
//     res.status(500).json({ message: "Failed to convert PDF to images" });
//   }
// }

async function pdfToImages(req, res) {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "PDF file required" });
    }

    // 1️⃣ Generate images
    const imagesDir = await generateImagesFromPdf(req.files[0]);

    // 2️⃣ Stream ZIP (waits until response closes)
    await sendImagesAsZip(res, imagesDir);

    // ❗ DO NOT send anything after this
    // ❗ DO NOT cleanup here

  } catch (err) {
    console.error("PDF → Images ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to convert PDF to images" });
    }
  }
}

/* ========= IMAGES → PDF ========= */
async function imagesToPdfController(req, res) {
  const output = await imagesToPdf(req.files);
  res.download(output);
}

/* ========= EXPORTS (LOCKED) ========= */
module.exports = {
  mergePDF,
  splitPdfController,
  compressPdfController,
  pdfToImages,
  imagesToPdfController
};
