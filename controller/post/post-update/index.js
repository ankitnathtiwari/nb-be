const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { updatePost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");

const postUpdate = (req, res) => {
  //get the post data and file from the request
  //validate

  // if (postValidation(req).status) {
  //   //Find the post //update the details to database // send the result to db
  //   post
  //     .findOne({ _id: req.body._id })
  //     .then((post) => {
  //       console.log(post, "updated post pre");
  //       resizedImage(req, res)
  //         .then((data) => {
  //         //   if (data.err) {
  //         //     res.json({ status: false, message: "Image Too Large" });
  //         //   } else {
  //         //     const filePath = path.join(
  //         //       `${__dirname}../../../../compressed-images`,
  //         //       `${req.file.filename}`
  //         //     );
  //         //     const fileName = req.file.filename;
  //         //     uploadS3(filePath, fileName).then((postImage) => {
  //         //     updatePost(post, req);
  //         //     post.save().then((post) =>
  //         //         res.json({
  //         //     post: post,
  //         //     updateStatus: true,
  //         //     message: "Updated SuccessFully",
  //         //   })
  //         // );
  //         //     });
  //         //   }

     
  //     })
  // } else {
  //   res.json({ updateStatus: false, message: postValidation(req).reason });
  // }
};

module.exports = { postUpdate };
