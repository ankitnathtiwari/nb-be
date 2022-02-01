const { videoPost } = require("../../models/video-post/index");
const { follow } = require("../../models/follow/index");
const { user } = require("../../models/user-reporter/index");
const config = require("config");

const { topicValidation } = require("../../services/validation/index");

const publicVideoFeed = async (req, res) => {
  try {
    if (topicValidation(req.query.top)) {
      if (req.query.top === "singlepost") {
        const videoPostList = await videoPost.find({ _id: req.query.id });
        const reporterIdList = videoPostList.map((item) => item.user);
        const reporterDetailList = await user.find({
          _id: { $in: reporterIdList },
        });

        const videoListWithAuthor = videoPostList.map((item) => {
          for (let i = 0; i < reporterDetailList.length; i++) {
            const element = reporterDetailList[i];
            if (String(element._id) === item.user) {
              return {
                ...item._doc,
                authorName: element.name,
                url: config.url,
              };
            }
          }
        });

        if (req.session.user) {
          const followList = await follow.find({
            follower: req.session.user.id,
          });
          const followedList = followList.map((item) => item.followed);

          if (followedList.length && videoPostList) {
            let videoPostWithFollow = videoListWithAuthor.map((item) => {
              if (followedList.includes(item.user)) {
                return { ...item, followStatus: true };
              }
              return item;
            });
            res.json({ status: true, videoPosts: videoPostWithFollow });
          } else {
            res.json({ status: true, videoPosts: videoListWithAuthor });
          }
        } else {
          return res.json({ status: true, videoPosts: videoListWithAuthor });
        }

        return res.json({ status: true, videoPosts: videoListWithAuthor });
      }

      if (req.query.top === "allpost" || req.query.top.length === 0) {
        const videoPostList = await videoPost
          .find()
          .sort({ pub_date: -1 })
          .skip((req.query.page - 1) * 5)
          .limit(5)
          .exec();
        const reporterIdList = videoPostList.map((item) => item.user);
        const reporterDetailList = await user.find({
          _id: { $in: reporterIdList },
        });

        const videoListWithAuthor = videoPostList.map((item) => {
          for (let i = 0; i < reporterDetailList.length; i++) {
            const element = reporterDetailList[i];
            if (String(element._id) === item.user) {
              return {
                ...item._doc,
                authorName: element.name,
                followers_count: element.followers_count,
                url: config.url,
              };
            }
          }
        });

        if (req.session.user) {
          const followList = await follow.find({
            follower: req.session.user.id,
          });
          const followedList = followList.map((item) => item.followed);

          if (followedList.length && videoPostList) {
            let videoPostWithFollow = videoListWithAuthor.map((item) => {
              if (followedList.includes(item.user)) {
                return { ...item, followStatus: true };
              }
              return item;
            });
            res.json({ status: true, videoPosts: videoPostWithFollow });
          } else {
            res.json({ status: true, videoPosts: videoListWithAuthor });
          }
        } else {
          res.json({ status: true, videoPosts: videoListWithAuthor });
        }
      } else {
        const videoPostList = await videoPost
          .find({ topics: req.query.top })
          .sort({ pub_date: -1 })
          .skip((req.query.page - 1) * 5)
          .limit(5)
          .exec();
        const reporterIdList = videoPostList.map((item) => item.user);
        const reporterDetailList = await user.find({
          _id: { $in: reporterIdList },
        });

        const videoListWithAuthor = videoPostList.map((item) => {
          for (let i = 0; i < reporterDetailList.length; i++) {
            const element = reporterDetailList[i];
            //change here also
            if (String(element._id) === item.user) {
              return {
                ...item._doc,
                authorName: element.name,
                followers_count: element.followers_count,
                url: config.url,
              };
            }
          }
        });

        if (req.session.user) {
          const followList = await follow.find({
            follower: req.session.user.id,
          });
          const followedList = followList.map((item) => item.followed);

          if (followedList.length && videoPostList) {
            let videoPostWithFollow = videoListWithAuthor.map((item) => {
              if (followedList.includes(item.user)) {
                return { ...item, followStatus: true };
              }
              return item;
            });
            res.json({ status: true, videoPosts: videoPostWithFollow });
          } else {
            res.json({ status: true, videoPosts: videoListWithAuthor });
          }
        } else {
          res.json({ status: true, videoPosts: videoListWithAuthor });
        }
      }
    } else {
      res.json({ status: false, message: "invalid request" });
    }
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

// { topics: req.query.top }
module.exports = { publicVideoFeed };
