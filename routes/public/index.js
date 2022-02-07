const express = require("express");
const router = express.Router();
const { followUser, unFollowUser } = require("../../controller/public/index");
const { publicVideoFeed } = require("../../controller/public/readVideo");
const { publicPostFeed } = require("../../controller/public/readPost");
const { publicViewCount } = require("../../controller/public/index");

router.post("/follow", followUser);
router.post("/unfollow", unFollowUser);
router.get("/video", publicVideoFeed);
router.get("/post", publicPostFeed);
router.post("/view_count", publicViewCount);

module.exports = router;
