// const express = require("express");
// const router = express.Router();
// var controller = require("../controllers/productController");

// // router.get("/", controller.AllProducts);
// router.get("/",controller.getAllProducts);
// router.post("/", controller.post);
// router.get("/:id", controller.OneProduct);
// router.put("/:id", controller.UpdateProduct);
// router.delete("/:id", controller.deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
var controller = require("../controllers/productController");
(multer = require("multer")), (mongoose = require("mongoose"));
const { v4: uuidv4 } = require("uuid");
const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// router.get("/somee/:category_id", controller.AllProducts);
router.post("/", upload.array("image", 6), controller.post);
// router.post("/", controller.post);
router.get("/:id", controller.OneProduct);
router.get("/some/:category_id", controller.getAllproductByCategory);
router.get("/", controller.getAllProducts);
router.post("/ByCollecction", controller.AllProductsByCollection);
// router.get("/pagination", controller.getAllProductsPagination);
router.put("/:id", upload.array("image", 6), controller.UpdateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
