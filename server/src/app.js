const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdf.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pdf", pdfRoutes);

module.exports = app;
