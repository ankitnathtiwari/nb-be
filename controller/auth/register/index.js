const { createUser } = require("./register");
const { regValidation } = require("../../../services/validation/index");

const register = (req, res) => {
  regValidation(req).status
    ? createUser(req, res)
    : res.json(regValidation(req));
};

module.exports = { register };
