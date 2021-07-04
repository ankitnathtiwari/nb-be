const express = require("express");
const router = express.Router();

router.use("/auth", require("../auth/index"));
router.use("/post", require("../post/index"));

module.exports = router;
