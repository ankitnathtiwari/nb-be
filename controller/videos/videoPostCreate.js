const config = require("config");
const path = require("path");
const { uploadToS3 } = require("../../services/s3");
const { videoPostSave } = require("../../dao/index");
const fs = require("fs");

const uploadVideo = async (req) => {
  return await uploadToS3(
    req.files.video[0].path,
    req.files.video[0].filename,
    config.bucket.video
  );
};

const uploadThumbnail = async (req) => {
  return await uploadToS3(
    req.files.thumbnail[0].path,
    req.files.thumbnail[0].filename,
    config.bucket.thumbnail
  );
};

const unlinkFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        return reject({ status: false, message: err.message });
      } else {
        resolve({ status: true, message: "resolve succussfully" });
      }
    });
  });
};

const unlinkVideoAndThumbNail = async (req) => {
  if (req.files.thumbnail) {
    await unlinkFile(req.files.thumbnail[0].path);
  }
  if (req.files.video) {
    await unlinkFile(req.files.video[0].path);
  }
};

const videoPostCreate = async (req, res) => {
  // Check if the required field are present or not
  try {
    if (req.files.thumbnail && req.files.video) {
      let videoUploadDetail = await uploadVideo(req);
      let thumbnailUploadDetail = await uploadThumbnail(req);
      if (videoUploadDetail && thumbnailUploadDetail) {
        const videoSaveDetails = await videoPostSave(
          req,
          videoUploadDetail,
          thumbnailUploadDetail
        );

        if (videoSaveDetails) {
          console.log("after save success");
          res.json({ status: true, message: "video and thumbnail uploaded" });
          unlinkVideoAndThumbNail(req);
        }
      }
    } else {
      console.log("unlinking with success");
      unlinkVideoAndThumbNail(req);
      res.json({
        status: false,
        message: "Please Upload Video and Thumbnail Both",
      });
    }
  } catch (err) {
    console.log({ err });
    res.json({ status: false, message: err.message });
    unlinkVideoAndThumbNail(req);
  }
  // run a node cron for unused file
};
module.exports = { videoPostCreate };
