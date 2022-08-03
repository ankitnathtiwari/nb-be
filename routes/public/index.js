const express = require("express");
const router = express.Router();
const { followUser, unFollowUser } = require("../../controller/public/index");
const { publicVideoFeed } = require("../../controller/public/readVideo");
const { publicPostFeed } = require("../../controller/public/readPost");
const { publicViewCount } = require("../../controller/public/index");
const { registerToken } = require("../../controller/public/registerToken");

router.post("/follow", followUser);
router.post("/unfollow", unFollowUser);
router.get("/video", publicVideoFeed);
router.get("/post", publicPostFeed);
router.post("/view_count", publicViewCount);
router.post("/register_token", registerToken);
module.exports = router;
