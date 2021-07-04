const { post } = require("../../../models/post/index");

const postDelete = (req, res) => {
  console.log(req.body, "delete route called");
  post.deleteOne({ _id: req.body.id }).then((data) =>
    data.n === 1
      ? res.json({
          deleteStatus: true,
          message: "Post Deleted",
          nModified: data.nModified,
        })
      : res.json({
          deleteStatus: false,
          message: "Post Already Deleted",
        })
  );
};

module.exports = { postDelete };
