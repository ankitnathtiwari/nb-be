const {
  copyToAnotherBucket,
  deleteFromS3Bucket,
} = require("../../services/s3/index");
const config = require("config");
const { deleteVideoPost } = require("../../dao/index");
const { videoPost } = require("../../models/video-post");

const videoPostDelete = async (req, res) => {
  // Check if the req.session.user === videoPost.user
  try {
    const videoDetails = await videoPost.findById({ _id: req.body.id });

    const videoCopyDetail = await copyToAnotherBucket(
      config.bucket.deletedVideo,
      config.bucket.video,
      videoDetails.video
    );
    const thumbnailCopyDetail = await copyToAnotherBucket(
      config.bucket.deletedThumbnail,
      config.bucket.thumbnail,
      videoDetails.thumbNail
    );

    if (videoCopyDetail && thumbnailCopyDetail) {
      deletePostData = await deleteVideoPost(req);
      if (deletePostData) {
        res.json({ status: true, message: "Post Delete" });

        const deletedVideoDetail = await deleteFromS3Bucket(
          config.bucket.video,
          req.body.video
        );
        const deletedThumbnailDetail = await deleteFromS3Bucket(
          config.bucket.thumbnail,
          req.body.thumbnail
        );
      } else {
        res.json({ status: false, message: "something wrong happend" });
      }
    }
  } catch (err) {
    console.log({ err });
    res.json({ status: false, message: err.message });
  }
};

module.exports = { videoPostDelete };
