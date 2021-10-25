const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { uploadPost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");
const { UploadS3, uploadS3 } = require("../../../services/s3/index");
const fs = require("fs");
const path = require("path");

const postCreate = (req, res) => {
  //get the post data and file from the request
  //validate
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

          uploadS3(filePath, fileName).then((postImage) => {
            new post(uploadPost(req, postImage)).save().then(() => {
              return res.json({
                postCreated: true,
                message: "Post Saved SuccessFully",
              });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
