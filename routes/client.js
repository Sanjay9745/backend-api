var express = require("express");
var router = express.Router();
const multer = require("multer");
let {
  loginRoute,
  signUpRoute,
  getUserDetailsRoute,
  deleteUserRoute,
  editUserData,
  linkClickCountRoute,
  addCoverImageRoute,
  editProfileImageRoute,
  editLogoImageRoute,
  AddOrderRoute,
  BadRoute,
  getAllOrderRoute,
  userOrderRoute,
  getOrderRoute,
  getAllProductRout,
  getProductRout
} = require("./clientController");

//multer

const userImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, "./public/userImage");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file.
    const uniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
    console.log(`${uniqueSuffix}-${file.originalname}`);
    // console.log(file);
  },
});

// Configure storage engine instead of dest object.
const userImage = multer({ storage: userImageStorage });
//********************************* */
const coverImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, "./public/userCoverImage");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file. 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
    console.log(`${uniqueSuffix}-${file.originalname}`);
  },
});

// Configure storage engine instead of dest object.
const userCoverImage = multer({ storage: coverImageStorage });
//********************************* */
const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, "./public/logo");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file. 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
    console.log(`${uniqueSuffix}-${file.originalname}`);
  },
});

// Configure storage engine instead of dest object.
const logoImage = multer({ storage: logoStorage });
//********************************* */
const orderLogoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    cb(null, "./public/orderLogo");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file. 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
    console.log(`${uniqueSuffix}-${file.originalname}`);
  },
});

// Configure storage engine instead of dest object.
const orderlogoImage = multer({ storage: orderLogoStorage });
/* GET REQUEST */
router.get("/islogin", loginRoute);
router.get("/signup", signUpRoute);
router.get("/getUser", getUserDetailsRoute);
router.get("/deleteUser", deleteUserRoute);
router.get('/clickLink',linkClickCountRoute);
router.get('/getAllOrders',getAllOrderRoute)
router.get('/userOrder',userOrderRoute)
router.get('/getOrder',getOrderRoute)
router.get("/getAllProduct", getAllProductRout);
router.get("/getProduct", getProductRout);
router.get('*',BadRoute)
//POST REQUESTS
router.post('/editUser',editUserData)
router.post('/addCoverImage',userCoverImage.single('image'),addCoverImageRoute);
router.post('/editProfileImage',userImage.single('image'),editProfileImageRoute);
router.post('/editLogo',logoImage.single('image'),editLogoImageRoute);
router.post('/addOrder',orderlogoImage.single('image'),AddOrderRoute)
router.post('*',BadRoute)

module.exports = router;

// orderLogo