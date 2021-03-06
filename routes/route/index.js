const express = require("express");

const router = express.Router();
const path = require("path");

router.use("/json_api", require("../json-api/index"));

//Development api for front end
router.use("/", express.static("public/dist"));
router.use("/login", express.static("public/dist"));
router.use("/register", express.static("public/dist"));
router.use("/passwordforgot", express.static("public/dist"));
router.use("/passwordChange", express.static("public/dist"));
router.use("/post/mypost", express.static("public/dist"));

router.use("/compressed-images", express.static("compressed-images"));

module.exports = router;
