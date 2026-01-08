const express = require("express");
const upload = require("../middlewares/upload.middleware");
const {
  mergePDF,
  splitPdfController,
  compressPdfController,
  imagesToPdfController,
  pdfToImagesController
} = require("../controllers/pdf.controller");

const router = express.Router();

router.post("/merge", upload.array("files", 10), mergePDF);
router.post("/split", upload.array("files", 1), splitPdfController);
router.post("/compress", upload.array("files", 1), compressPdfController);
router.post("/to-images", upload.array("files",1),pdfToImagesController);
router.post("/from-images",upload.array("files",10),imagesToPdfController)

const fs = require("fs");
const path = require("path");

router.get("/files", (req, res) => {
  const dir = path.join(__dirname, "../../output");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  res.json(files);
});


module.exports = router;

router.get("/test", (req, res) => {
  res.json({ status: "PDF routes working" });
});
