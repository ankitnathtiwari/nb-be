const { post } = require("../../../models/post/index");
const { topicValidation } = require("../../../services/validation/index");

const allPost = (req, res) => {
  
  if (topicValidation(req.query.top)) {
    if (req.query.top === "singlepost") {
      return post
        .find({ _id: req.query.id })
        .then((post) => res.json(post))
        .catch((err) =>
          res.json({ status: false, message: "some error occured" })
        );
    }
    if (req.query.top === "allpost" || req.query.top.length === 0) {
      return post
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
      return post
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
