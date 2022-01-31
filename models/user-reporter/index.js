const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number},
  email: { type: String, required: true },
  password: { type: String, required: true },
  user_role:{ type:String},
  followers_count:{ type: Number},
});

const user = mongoose.model("user", schema);

module.exports = { user };
