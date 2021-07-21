const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { uploadPost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");

const postCreate = (req, res) => {
  //get the post data and file from the request
  //validate
  if (postValidation(req).status) {
    //create new post instance //save it to database // send the result to db
    resizedImage(req, res)
      .then((data) => {
        new post(uploadPost(req)).save().then(() => {
          return res.json({
            postCreated: true,
            message: "Post Saved SuccessFully",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ postCreated: false, message: "Some Error Occured" });
      });
  } else {
    res.json({
      postCreated: false,
      message: postValidation(req, req.session.user).reason,
    });
  }
};
module.exports = { postCreate };
