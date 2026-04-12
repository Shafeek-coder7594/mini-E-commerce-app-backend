const express = require("express");
const router = express.Router();
const multer = require("multer");

const {addProduct, getProducts} = require("../Controller/productController");

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage});

router.get("/products",getProducts);

router.post("/products",upload.single("image"),addProduct);

module.exports = router;

