const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: String },
  topics: { type: Array },
  video: { type: String },
  pub_date: { type: Date },
  mod_date: { type: Date },
  thumbNail: { type: String },
  savedToStorage: { type: Boolean },
  processed: { type: Boolean },
  hashTags: { type: Array },
  reportFlags: { type: Array },
  videoLength: { type: String, enum: ["long", "short", "medium"] },
  view_count: { type: Number },
});

const videoPost = mongoose.model("videoPost", schema);

module.exports = { videoPost };
