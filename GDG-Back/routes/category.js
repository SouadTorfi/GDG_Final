const express = require("express");
const router = express.Router();
var controller = require("../controllers/categoryController");

router.get("/", controller.AllCategories);
router.post("/", controller.post);
router.get("/:id", controller.OneCategory);
router.put("/:id", controller.UpdateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;