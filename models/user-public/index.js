const mongoose = require("mongoose");

const userPublicSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  oAuthId: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const userPublic = mongoose.model("user_public_profile", userPublicSchema);

module.exports = { userPublic };
