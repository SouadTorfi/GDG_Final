const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/",adminController.getAllAdmins);
router.post("/signup",adminController.signup);
router.post("/login",adminController.login);
router.get("/:id",adminController.getAdminById);
router.put("/:id",adminController.updateAdmin);
router.delete("/:id",adminController.deleteAdmin);

module.exports = router;