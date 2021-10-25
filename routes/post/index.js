const express = require("express");
const { allPost, myPost } = require("../../controller/post/post-read");
const { uploadLarge } = require("../../controller/post/post-large/index");
const { upload } = require("../../middleware/multer/index");
const { uploadS3 } = require('../../services/s3/index');
const { postUpdate } = require("../../controller/post/post-update");
const { postDelete } = require("../../controller/post/post-delete");
const router = express.Router();



router.get("/allpost", allPost);
router.get("/mypost", myPost);

router.post("/create", upload.single("image"), 
    uploadLarge   
//  postCreate
);

// TODO: check that the user is owner of posts (update and delete)
router.put("/update", upload.single("image"), postUpdate);
router.post("/delete", postDelete);


module.exports = router;
