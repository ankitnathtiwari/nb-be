const { videoPost } = require("../models/video-post/index");
const mongoose = require("mongoose");

const regObj = (req) => {
  return {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
};

const uploadPost = (req, postImage) => {
  return {
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
    image: postImage.key,
    author: req.session.user ? req.session.user.id : "Anonymous",
    pub_date: new Date(),
    mod_date: new Date(),
  };
};

const updatePost = (post, req, postImage) => {
  post.title = req.body.title;
  post.content = req.body.content;
  post.topic = req.body.topic;
  post.image = postImage.key;
  post.mod_date = new Date();
};

const videoPostSave = async (req, videoUploadDetail, thumbnailUploadDetail) => {
  console.log(req.body, "req body");
  const videoPostData = {
    title: req.body.title,
    description: req.body.description || "",
    user: req.session.user.id || "anonymous",
    topics: req.body.topics.split(","),
    video: videoUploadDetail.Key,
    pub_date: new Date(),
    modfied_date: new Date(),
    thumbNail: thumbnailUploadDetail.Key,
    savedToStorage: true,
    processed: false,
  };
  console.log({ videoPostData });
  const newVideoPost = new videoPost(videoPostData);
  return newVideoPost.save();
};

const updateData = (req, videoUploadDetail, thumbnailUploadDetail) => {
  let updatedData = {};
  req.body.title ? (updatedData.title = req.body.title) : null;
  req.body.description
    ? (updatedData.description = req.body.description)
    : null;
  req.body.topics ? (updatedData.topics = req.body.topics.split(",")) : null;
  videoUploadDetail ? (updatedData.video = videoUploadDetail.Key) : null;
  thumbnailUploadDetail
    ? (updatedData.thumbNail = thumbnailUploadDetail.Key)
    : null;
  return updatedData;
};

const videoUpdate = async (req, videoUploadDetail, thumbnailUploadDetail) => {
  const updatedData = updateData(req, videoUploadDetail, thumbnailUploadDetail);

  console.log({ updatedData });
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    throw new Error("Invalid Post Id");
  }
  let updatedResult = await videoPost.findOneAndUpdate(
    { _id: req.body._id },
    updatedData,
    {
      new: true,
    }
  );
  console.log({ updatedResult });
  return updatedResult;
};

const deleteVideoPost = async (req) => {
  return await videoPost.deleteOne({ _id: req.body.id });
};

module.exports = {
  regObj,
  uploadPost,
  updatePost,
  videoPostSave,
  videoUpdate,
  deleteVideoPost,
};
