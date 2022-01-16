const { videoPost } = require("../../models/video-post/index");
const { topicValidation } = require("../../services/validation/index");

const allVideoPost = (req, res) => {
  if (topicValidation(req.query.top)) {
    if (req.query.top === "singlepost") {
      return videoPost
        .find({ _id: req.query.id })
        .then((post) => res.json(post))
        .catch((err) =>
          res.json({ status: false, message: "some error occured" })
        );
    }
    if (req.query.top === "allpost" || req.query.top.length === 0) {
      return videoPost
        .find()
        .sort({ pub_date: -1 })
        .skip((req.query.page - 1) * 5)
        .limit(5)
        .exec()
        .then((post) => res.json(post))
        .catch((err) =>
          res.json({ status: false, message: "some error occured" })
        );
    } else {
      return videoPost
        .find({ topic: req.query.top })
        .sort({ pub_date: -1 })
        .skip((req.query.page - 1) * 5)
        .limit(5)
        .exec()
        .then((post) => res.json(post))
        .catch((err) =>
          res.json({ status: false, message: "some error occured" })
        );
    }
  } else {
    res.json({ status: false, message: "invalid request" });
  }
};

const myVideoPost = (req, res) => {
  console.log(req.session, req.session.user);
  topicValidation(req.query.top)
    ? videoPost
        .find({ user: req.session.user.id })
        .sort({ pub_date: -1 })
        .skip((req.query.page - 1) * 5)
        .limit(5)
        .then((post) => {
          console.log(post);
          res.json(post);
        })
        .catch((err) => res.json({ status: false, message: err.message }))
    : res.json("invalid request");
};

module.exports = { allVideoPost, myVideoPost };
