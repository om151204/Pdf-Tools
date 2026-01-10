const archiver = require("archiver");

function sendImagesAsZip(res, imagesDir) {
  return new Promise((resolve, reject) => {
    const zipName = `pdf-images-${Date.now()}.zip`;

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${zipName}"`
    );

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", err => reject(err));
    res.on("close", () => resolve());

    archive.pipe(res);
    archive.directory(imagesDir, false);

    // ❗ DO NOT await this
    archive.finalize();
  });
}

module.exports = sendImagesAsZip;