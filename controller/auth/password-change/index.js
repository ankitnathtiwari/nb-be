const { user } = require("../../../models/user-reporter/index");
const { hashPassword } = require("../../../services/bcrypt");
const { verifyToken } = require("../../../services/jwt-tokens/index");

const tokenVerification = (req, res) => {
  verifyToken(req.query.tok).then((data) => {
    if (data) {
      req.session.changeUser = data.email;
      console.log(req.session, "token verification", req.sessionID);
      res.redirect("http://localhost:8080/password_change");
    } else {
      res.json({ tokenVerified: false, message: "invalid token" });
    }
  });
};

const passwordChange = (req, res) => {
  console.log(req.session, "password change", req.sessionID);
  hashPassword(req.body.password).then((newHashPass) => {
    user
      .updateOne(
        { email: req.session.changeUser },
        { $set: { password: newHashPass } }
      )
      .then((data) => {
        data.nModified === 1
          ? res.json({
              passwordChangeStatus: true,
              message: "Password Changed Successfully",
            })
          : res.json({
              passwordChangeStatus: false,
              message: "Invalid Request",
            });
      });
  });
};

module.exports = { passwordChange, tokenVerification };
