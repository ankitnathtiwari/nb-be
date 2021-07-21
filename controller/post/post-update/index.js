const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { updatePost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");

const postUpdate = (req, res) => {
  //get the post data and file from the request
  //validate

  if (postValidation(req).status) {
    //Find the post //update the details to database // send the result to db
    post
      .findOne({ _id: req.body._id })
      .then((post) => {
        console.log(post, "updated post pre");
        resizedImage(req, res)
          .then(() => {
            console.log(post, "updated post");
            updatePost(post, req);
            post.save().then((post) =>
              res.json({
                post: post,
                updateStatus: true,
                message: "Updated SuccessFully",
              })
            );
          })
          .catch((err) =>
            res.json({
              updateStatus: false,
              message: "Some Error Occured",
            })
          );
      })
      .catch((err) =>
        res.json({
          updateStatus: false,
          message: "Post Not Found",
        })
      );
  } else {
    res.json({ updateStatus: false, message: postValidation(req).reason });
  }
};

module.exports = { postUpdate };
