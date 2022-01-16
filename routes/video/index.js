const express = require("express");
const {
  allVideoPost,
  myVideoPost,
} = require("../../controller/videos/videoPostGet");

const { videoUpload, mixTwoUpload } = require("../../middleware/multer/index");
const { videoPostUpdate } = require("../../controller/videos/videoPostUpdate");
const { videoPostDelete } = require("../../controller/videos/videoPostDelete");
const { videoPostCreate } = require("../../controller/videos/videoPostCreate");
const router = express.Router();
const config = require("config");

router.get("/allvideo", allVideoPost);
router.get("/myvideo", myVideoPost);

router.post(
  "/create",
  mixTwoUpload.fields([
    { name: config.fieldname.video, maxCount: 1 },
    { name: config.fieldname.thumbnail, maxCount: 1 },
  ]),
  videoPostCreate
);

router.put(
  "/update",
  mixTwoUpload.fields([
    { name: config.fieldname.video, maxCount: 1 },
    { name: config.fieldname.thumbnail, maxCount: 1 },
  ]),
  videoPostUpdate
);

router.post("/delete", videoPostDelete);

module.exports = router;
