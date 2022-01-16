const { videoUpdate } = require("../../dao/index");
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

const videoPostUpdate = async (req, res) => {
  // Check if the required field are present or not
  try {
    let thumbnailUploadDetail;
    let videoUploadDetail;
    if (req.files.thumbnail) {
      thumbnailUploadDetail = await uploadThumbnail(req);
    }
    if (req.files.video) {
      videoUploadDetail = await uploadVideo(req);
    }
    videoUpdateDetail = await videoUpdate(
      req,
      videoUploadDetail ? videoUploadDetail : null,
      thumbnailUploadDetail ? thumbnailUploadDetail : null
    );
    if (videoUpdateDetail) {
      res.json({ status: true, message: "video and thumbnail uploaded" });
      unlinkVideoAndThumbNail(req);
    }
  } catch (err) {
    res.json({ status: false, message: err.message });
    unlinkVideoAndThumbNail(req);
  }
  // run a node cron for unused file
};

//check if the session user and post user both are same
// check if which file exits
//if file exits you have to upload the new file to database
//based on that update the data base
//check which file existexits or not
//make two routes for the update video on for file update and another
//for without file upload
//get the current details
//check if files are
//get those details from the database.
//after that

module.exports = { videoPostUpdate };
