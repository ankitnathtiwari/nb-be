const config = require("config");
const { query } = require("winston");
const { follow } = require("../../models/follow/index");

const followUser = async (req, res) => {
  //if user has not subscribed create a document and
  //if the

  const filter = {
    follower: req.session.user.id,
    followed: req.query.followed,
  };
  const update = {
    follower: req.session.user.id,
    followed: req.query.followed,
    pub_date: new Date(),
  };

  const followData = await follow.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  console.log(
    { update, followData },
    req.session,
    "followed..................."
  );
  res.json({
    status: true,
    data: followData,
    message: "follow successfull",
  });
};

const unFollowUser = async (req, res) => {
  //if user has not subscribed create a document and

  const query = {
    follower: req.session.user.id,
    followed: req.query.followed,
  };
  let followData = await follow.findOneAndDelete(query);

  console.log(query, followData, req.session, "unfollow user");

  res.json({
    status: true,
    data: followData,
    message: "unfollowed successfull",
  });
};

module.exports = { followUser, unFollowUser };
