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

const upload = multer({storage,
  
  limits:{fileSize:2*1024*1024},

  fileFilter: (req, file, cb)=>{
    if(file.mimetype.startsWith("image/")){
      cb(null, true);
    }else{
      cb(new Error("only image files allowed"),false);
    }
  },
});

router.get("/products",getProducts);

router.post("/products", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, addProduct);

module.exports = router;

