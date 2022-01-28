const User = require("../../../models/user-reporter/index");
const { loginValidation } = require("../../../services/validation/index");
const { verifyGoogleToken } = require("../../../services/jwt-tokens/index");
const { logUser, logGoogleUser } = require("./login");
const axios = require("axios");

const login = (req, res) => {
  //Validate
  loginValidation(req) ? logUser(req, res) : res.json("invalid credentials");
};

const googleLogin = async (req, res) => {
  try {
    const data = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.query.token}`
    );
    let loginData = await logGoogleUser(data.data);
    if (loginData._id) {
      req.session.user = { id: loginData._id, name: loginData.name };
      console.log(req.session);
      res.json({
        status: true,
        user: { _id: loginData._id, username: loginData.name, auth: true },
        message: "User Login Successfull",
      });
    } else {
      res.json({ status: false, message: "Data was not saved" });
    }
  } catch (err) {
    res.json({ status: true, message: err.message });
  }
};
module.exports = { login, googleLogin };
