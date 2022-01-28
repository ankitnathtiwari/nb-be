const { user } = require("../../../models/user-reporter/index");
const { userPublic } = require("../../../models/user-public/index");
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

const logGoogleUser = async (userDetail) => {
  const filter = { email: userDetail.email };
  const update = {
    name: userDetail.name,
    email: userDetail.email,
    role: "public",
    oAuthId: userDetail.sub,
  };

  return await userPublic.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true, // Make this update into an upsert
  });
};

module.exports = { logUser, logGoogleUser };
