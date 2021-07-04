const { user } = require("../../../models/user-reporter/index");
const { mailOptions, mailSent } = require("../../../services/email");
const { token, url } = require("../../../services/jwt-tokens");

const passwordForgot = (req, res) => {
  user.findOne({ email: req.body.email }).then((user) => {
    user
      ? mailSent(mailOptions(url(token(user)), user), req, res)
      : res.json({ mailSentStatus: false, message: "Invalid Credentials" });
  });
};

module.exports = { passwordForgot };

//
