const express = require("express");
const cors = require("cors");
const path = require("path");

const pdfRoutes = require("./routes/pdf.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/pdf", pdfRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// Fallback for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
