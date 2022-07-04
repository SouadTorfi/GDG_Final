const express = require("express");
const router = express.Router();
const orderStatusController = require("../controllers/orderStatusController");

router.get("/", orderStatusController.getAllStatuses);
router.get("/:id", orderStatusController.getStatusById);
router.post("/", orderStatusController.addStatus);

module.exports = router;