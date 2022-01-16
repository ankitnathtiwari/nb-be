const { resolve } = require("path");

const checkFileExits = new Promise((resolve, reject) => {
  access(file, constants.F_OK, (err) => {
    if (err) {
      console.error(
        `${file} ${err.code === "ENOENT" ? "does not exist" : "is read-only"}`
      );
      reject({ status: false, message: err.message });
    } else {
      console.log(`${file} exists, and it is writable`);
      resolve({ status: true, message: "file exist" });
    }
  });
});

module.exports = { checkFileExits };
