const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { mergePDF } = require("../controllers/pdf.controller");

const router = express.Router();

router.post("/merge", upload.array("files", 10), mergePDF);

module.exports = router;
