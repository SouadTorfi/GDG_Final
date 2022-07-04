const express = require("express");
const router = express.Router();
var controller = require("../controllers/orderController");

router.get("/", controller.AllOrders);
router.post("/", controller.post);
router.get("/:id", controller.OneOrder);
router.put("/:id", controller.UpdateOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;