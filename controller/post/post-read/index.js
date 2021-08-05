const { post } = require("../../../models/post/index");
const { topicValidation } = require("../../../services/validation/index");

const allPost = (req, res) => {
  if (topicValidation(req.query.top)) {
    if (req.query.top === "all" || req.query.top.length === 0) {
      post
        .find()
        // .sort({ pub_date: -1 })
        // .skip((req.query.page - 1) * 5)
        // .limit(5)
        .exec()
        .then((post) => res.json(post));
    } else {
      post
        .find({ topic: req.query.top })
        // .sort({ pub_date: -1 })
        // .skip((req.query.page - 1) * 5)
        // .limit(5)
        .exec()
        .then((post) => res.json(post));
    }
  } else {
    res.json("invalid request");
  }
};
const myPost = (req, res) => {
  topicValidation(req.query.top)
    ? post
        .find({ author: req.session.user.id })
        .sort({ pub_date: -1 })
        .skip((req.query.page - 1) * 5)
        .limit(5)
        .then((post) => res.json(post))
    : res.json("invalid request");
};

module.exports = { allPost, myPost };
