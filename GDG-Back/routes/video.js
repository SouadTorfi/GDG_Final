const express = require("express");
const router = express.Router();
var controller = require("../controllers/videosController");

router.get("/:name", controller.getAllVideosFacts);
router.get("/", controller.getAllVideos);
router.get("/last/:name", controller.getlastVideo);
router.post("/", controller.addVideo);
router.get("/by/:id", controller.getVideoById);
router.put("/:id", controller.updateVideo);
router.delete("/:id", controller.deleteVideo);

module.exports = router;