const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  topic: { type: String },
  image: { type: String },
  pub_date: { type: Date },
  mod_date: { type: Date },
});

const post = mongoose.model("post", schema);

module.exports = { post };
