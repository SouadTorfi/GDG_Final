const express = require("express");
const router = express.Router();
var controller = require("../controllers/currencyController");

router.get("/", controller.getAllCurrencies);
router.post("/", controller.addCurrency);
router.get("/:id", controller.getCurrencyById);
router.put("/:id", controller.updateCurrency);
router.delete("/:id", controller.deleteCurrency);

module.exports = router;