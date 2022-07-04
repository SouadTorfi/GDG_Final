const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/",userController.getAllUsers);
router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.get("/getUser/:id",userController.getUserById);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);
// router.get("/:id",userController.getUserById);

module.exports = router;