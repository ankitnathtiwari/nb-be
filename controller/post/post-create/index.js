const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { uploadPost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");
const { uploadToS3 } = require("../../../services/s3/index");
const fs = require("fs");
const path = require("path");

const postCreate = (req, res) => {

  if (postValidation(req).status) {
    //create new post instance //save it to database // send the result to db
    resizedImage(req, res)
      .then((data) => {
        if (data.err) {
          res.json({ status: false, message: "Image Too Large" });
        } else {
          const filePath = path.join(
            `${__dirname}../../../../compressed-images`,
            `${req.file.filename}`
          );
          const fileName = req.file.filename;
          uploadToS3(filePath, fileName).then((postImage) => {
            new post(uploadPost(req, postImage)).save().then((data) => {
              return res.json({
                postCreated: true,
                message: "Post Saved SuccessFully",
                data:data
              });
            });
          });
        }
      })
      .catch((err) => {
        console.log({err}, "s3 error");
        res.json({
          postCreated: false,
          message: "Some Error Occured",
          err: err,
        });
      });
  } else {
    res.json({
      postCreated: false,
      message: postValidation(req, req.session.user).reason,
    });
  }
};
module.exports = { postCreate };
