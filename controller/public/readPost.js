const { post } = require("../../models/post/index");
const { user } = require("../../models/user-reporter/index");
const { topicValidation } = require("../../services/validation/index");
const config = require("config");

const postFeedList = async (req, query) => {
  return await post
    .find(query)
    .sort({ pub_date: -1 })
    .skip((req.query.page - 1) * 5)
    .limit(5)
    .exec();
};

const postFeedWithAuthor = async (postList) => {
  const reporterIdList = postList
    .filter((item) => item.author !== "Anonymous")
    .map((item) => item.author);

  console.log(reporterIdList, "reporter id list");
  const reporterDetailList = await user.find({
    _id: { $in: reporterIdList },
  });

  return postList.map((item) => {
    for (let i = 0; i < reporterDetailList.length; i++) {
      const element = reporterDetailList[i];
      if (String(element._id) === item.author) {
        return {
          ...item._doc,
          authorName: element.name,
          url: config.url,
        };
      }
      return {
        ...item._doc,
        authorName: "",
        url: config.url,
      };
    }
  });
};

const publicPostFeed = async (req, res) => {
  try {
    if (topicValidation(req.query.top)) {
      if (req.query.top === "singlepost") {
        postFeed = await postFeedList(req, { _id: req.query.id });
        return res.json({ status: false, postFeed: postFeed });
      }
      if (req.query.top === "allpost" || req.query.top.length === 0) {
        const postFeed = await postFeedList(req, {});
        const postList = await postFeedWithAuthor(postFeed);
        return res.json({ status: true, postFeed: postList });
      } else {
        const postFeed = await postFeedList(req, { topic: req.query.top });
        const postList = await postFeedWithAuthor(postFeed);
        return res.json({ status: false, postFeed: postList });
      }
    } else {
      res.json({ status: false, message: "invalid request" });
    }
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

//{ _id: req.query.id }
module.exports = { publicPostFeed };
