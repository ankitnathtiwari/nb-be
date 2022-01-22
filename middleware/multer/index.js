var multer = require("multer");
const path = require("path");
const config = require("config");

var imageStorage = multer.diskStorage({
  //give destination folder
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, config.storage.image));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "image" + "-" + file.originalname);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, config.storage.videoStorage));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "video" + "-" + file.originalname);
  },
});

const mixStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === config.fieldname.video) {
      return cb(null, path.join(__dirname, config.storage.video));
    }
    return cb(null, path.join(__dirname, config.storage.thumbnail));
  },
  filename: (req, file, cb) => {
    if (file.fieldname === config.fieldname.video) {
      return cb(
        null,
        Date.now() + "-" + config.fieldname.video + "-" + file.originalname
      );
    }
    cb(
      null,
      Date.now() + "-" + config.fieldname.thumbnail + "-" + file.originalname
    );
  },
});

var imageUpload = multer({ storage: imageStorage });
var videoUpload = multer({ storage: videoStorage });
var mixTwoUpload = multer({ storage: mixStorage });

module.exports = { imageUpload, videoUpload, mixTwoUpload };
