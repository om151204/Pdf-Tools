const fs = require("fs");

function cleanupFiles(files) {
  files.forEach(file => {
    fs.unlink(file.path, err => {
      if (err) console.error("Cleanup error:", err.message);
    });
  });
}

module.exports = cleanupFiles;
