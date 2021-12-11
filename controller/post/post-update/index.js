const { upload } = require("../../../middleware/multer/index");
const { post } = require("../../../models/post/index");
const { updatePost } = require("../../../dao/index");
const { postValidation } = require("../../../services/validation/index");
const { resizedImage } = require("../../../services/image-processing/index");
const { uploadToS3 } = require("../../../services/s3/index");
const path = require('path');


const postUpdate = (req, res) => {
  if (postValidation(req).status) {
    post.findOne({_id:req.body._id}).then(post=>{
      resizedImage(req, res).then((data)=>{
        if (data.err) {
          res.json({ status: false, message: "Image Too Large" });
        } else{
          const filePath = path.join(
            `${__dirname}../../../../compressed-images`,
            `${req.file.filename}`
          );
          const fileName = req.file.filename;
          uploadToS3(filePath, fileName).then((postImage)=>{
            updatePost(post, req, postImage);
            post.save().then((post)=>{
              res.json({
                post: post,
                updateStatus: true,
                message: "Updated SuccessFully",
              })
            })
          }).catch((err)=>{
            return res.json({updateStatus:false, message:"Some Error Occured"})
          })
        }
      })
    }).catch((err)=>{
      return res.json({updateStatus:false, message:"Some Error Occured"})
    })
  }else {
    res.json({ updateStatus: false, message: postValidation(req).reason });
  }
}


module.exports = { postUpdate };
