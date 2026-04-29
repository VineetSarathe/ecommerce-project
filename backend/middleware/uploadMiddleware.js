const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/";

// ✅ Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  // ✅ FIXED FILENAME
  filename: (req, file, cb) => {
    const cleanName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w.-]/g, "");

    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;
  const isValid = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValid) cb(null, true);
  else cb(new Error("Invalid image type"));
};

module.exports = multer({ storage, fileFilter });