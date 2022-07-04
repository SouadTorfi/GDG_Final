const express = require("express");
const router = express.Router();
var controller = require("../controllers/collectionController");

router.get("/", controller.AllCollection);
router.get("/some/:category_id", controller.getAllCollectionBypage);
router.post("/", controller.postCollection);
router.get("/:id", controller.OneCollection);
router.put("/:id", controller.UpdateCollection);
router.delete("/:id", controller.deleteCollection);

module.exports = router;