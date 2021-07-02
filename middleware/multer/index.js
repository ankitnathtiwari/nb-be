var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  //give destination folder
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage });

module.exports = { upload };
