const { user } = require("../../../models/user-reporter/index");
const { hashPassword, compareHash } = require("../../../services/bcrypt/index");
const { regObj } = require("../../../dao/index");

const logUser = (req, res) => {
  //Find
  user.findOne({ email: req.body.email }).then((userData) => {
    if (userData) {
      compareHash(req.body.password, userData.password).then((data) => {
        if (data) {
          //establish session set auth true
          req.session.user = { id: userData._id, name: userData.name };
          res.json({ auth: true, user: userData.name });
        } else {
          res.json({ auth: false, message: "Invalid Password" });
        }
      });
    } else {
      res.json({ auth: false, message: "Invalid User" });
    }
  });
};

module.exports = { logUser };
