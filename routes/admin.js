var express = require("express");
var router = express.Router();
var multer = require("multer");

var {
  adminLoginRout,
  adminSignUpRout,
  addProductRout,
  getProductRout,
  getAllProductRout,
  deteteProductRout,
  editProductRout,
  deleteImageRoute
} = require("./adminControl");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/productImage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(`${file.originalname}-${uniqueSuffix}.jpeg`);
    cb(null, `${file.originalname}-${uniqueSuffix}.jpeg`);
  },
});
const productImage = multer({ storage: storage });
//POST REQUEST
router.post("/signup", adminSignUpRout);
router.post("/login", adminLoginRout);
router.post("/addProduct", productImage.array("images"), addProductRout);
router.post("/editProduct", productImage.array("images"), editProductRout);
router.post('/deleteImage',deleteImageRoute)


//GET REQUEST
router.get("/getProduct", getProductRout);
router.get("/deleteProduct", deteteProductRout);
router.get("/getAllProduct", getAllProductRout);
module.exports = router;
