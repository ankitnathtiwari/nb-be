const express = require("express");
const router = express.Router();
const { followUser, unFollowUser } = require("../../controller/public/index");
const { publicVideoFeed } = require("../../controller/public/readVideo");
const { publicPostFeed } = require("../../controller/public/readPost");

router.post("/follow", followUser);
router.post("/unfollow", unFollowUser);
router.get("/video", publicVideoFeed);
router.get("/post", publicPostFeed);
module.exports = router;
