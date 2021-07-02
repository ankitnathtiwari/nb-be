const { user } = require("../../../models/user-reporter/index");
const { hashPassword } = require("../../../services/bcrypt/index");
const { regObj } = require("../../../dao/index");

const createUser = (req, res) => {
  user.findOne({ email: req.body.email }).then((userData) => {
    if (userData) {
      res.json({ regStatus: false, message: "User Already Exist" });
    } else {
      const newUser = new user(regObj(req));
      console.log(newUser);
      hashPassword(newUser.password).then((pass) => {
        newUser.password = pass;
        newUser
          .save()
          .then(
            res.json({ regStatus: true, message: "Successfully Registered" })
          );
      });
    }
  });
};

module.exports = { createUser };
