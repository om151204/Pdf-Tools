const express = require("express");
const upload = require("../middlewares/upload.middleware");
const {
  mergePDF,
  splitPdfController,
  compressPdfController
} = require("../controllers/pdf.controller");

const router = express.Router();

router.post("/merge", upload.array("files", 10), mergePDF);
router.post("/split", upload.array("files", 1), splitPdfController);
router.post("/compress", upload.array("files", 1), compressPdfController);

module.exports = router;

router.get("/test", (req, res) => {
  res.json({ status: "PDF routes working" });
});
