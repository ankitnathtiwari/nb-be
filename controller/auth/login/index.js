const User = require("../../../models/user-reporter/index");
const { loginValidation } = require("../../../services/validation/index");
const { logUser } = require("./login");
const login = (req, res) => {
  //Validate
  loginValidation(req) ? logUser(req, res) : res.json("invalid credentials");
};

module.exports = { login };
