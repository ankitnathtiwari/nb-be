const mongoose = require("mongoose");

const schema = mongoose.Schema({
  follower: { type: String, required: true },
  followed: { type: String, required: true },
  pub_date: { type: Date },
});

const follow = mongoose.model("user_follow_relation", schema);

module.exports = { follow };
