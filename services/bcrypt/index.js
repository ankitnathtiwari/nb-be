const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hash(password, 10).then((hash) => {
    return hash;
  });
};

const compareHash = (currPass, hashPass) => {
  return bcrypt.compare(currPass, hashPass).then((data) => {
    return data;
  });
};

module.exports = { hashPassword, compareHash };
