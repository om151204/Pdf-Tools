console.log("uploadImages:", uploadImages);
const express = require("express");
const router = express.Router();

const uploadPdf = require("../middlewares/uploadPdf");
const uploadImages = require("../middlewares/uploadimages");

const {
  mergePDF,
  splitPdfController,
  compressPdfController,
  pdfToImages,
  imagesToPdfController
} = require("../controllers/pdf.controller");

router.post("/merge", uploadPdf.array("files"), mergePDF);
router.post("/split", uploadPdf.array("files"), splitPdfController);
router.post("/compress", uploadPdf.array("files"), compressPdfController);
router.post("/to-images", uploadPdf.array("files"), pdfToImages);
router.post("/from-images", uploadImages.array("files"), imagesToPdfController);

module.exports = router;
