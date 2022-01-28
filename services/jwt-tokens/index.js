const jwt = require("jsonwebtoken");

const token = (user) => {
  return jwt.sign({ email: user.email }, "shhhhh", {
    expiresIn: "1200000",
  });
};

const url = (token) => {
  return `http://localhost:8000/json_api/auth/reset?tok=${token}`;
};

const verifyToken = async (token) => {
  return await jwt.verify(token, "shhhhh", function (err, decoded) {
    console.log(decoded);
    return err ? false : decoded; // bar
  });
};

const verifyGoogleToken = async (token) => {
  try {
    var decoded = jwt.verify(token, "wrong-secret");
    return decoded;
  } catch (err) {
    return err;
    // err
  }
};

module.exports = { token, url, verifyToken, verifyGoogleToken };
