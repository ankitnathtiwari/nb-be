const { post } = require("../../../models/post/index");
const { topicValidation } = require("../../../services/validation/index");

const allPost = (req, res) => {
  if (topicValidation(req.query.top)) {
    req.query.top === "all"
      ? post
          .find()
          .skip((req.query.page - 1) * 5)
          .limit(5)
          .then((post) => res.json(post))
      : post
          .find({ topic: req.query.top })
          .skip((req.query.page - 1) * 5)
          .limit(5)
          .then((post) => res.json(post));
  } else {
    res.json("invalid request");
  }
};
const myPost = (req, res) => {
  topicValidation(req.query.top)
    ? post
        .find({ author: req.session.user.id })
        .skip((req.query.page - 1) * 5)
        .limit(5)
        .then((post) => res.json(post))
    : res.json("invalid request");
};

module.exports = { allPost, myPost };
