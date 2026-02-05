
const multer = require('multer');

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/profile_img/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

module.exports = upload;