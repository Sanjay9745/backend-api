var {
  loginUser,
  getUserDetails,
  deleteUser,
  updateDetails,
  linkClickCount,
  addCoverImage,
  editProfileImage,
  signUpUser,
  addOrder,
  getAllOrder,
  userOrder,
  getOrder,
  editLogoImage,
} = require("../db/clientHelpers");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var fs = require("fs");
const jwtPrivetKey = process.env.JWT_PRIVET_KEY;

const loginRoute = async (req, res) => {
  try {
    let userID = req.query.userID;
    if (!userID) return res.send({ error: "userID not send" });
    let decoded = jwt.verify(userID, jwtPrivetKey);
    loginUser(decoded._id)
      .then((response) => {
        let token = jwt.sign({ _id: response._id }, jwtPrivetKey);
        res.send({ userID: token });
      })
      .catch((err) => res.send(err));
  } catch (error) {
    res.send(error);
  }
};

const signUpRoute = async (req, res) => {
  try {
    if (!req.query.number)
      return res.send({ status: "Enter your Mobile Number" });
    signUpUser(req.query.number)
      .then((response) => {
        console.log(response);
        let token = jwt.sign({ _id: response._id }, jwtPrivetKey);
        res.send({ userID: token });
      })
      .catch((err) => res.send(err));
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserDetailsRoute = (req, res) => {
  try {
    let userID = req.query.userID;
    if (!userID) return res.send({ error: "userID not send" });
    let decoded = jwt.verify(userID, jwtPrivetKey);
    getUserDetails(decoded._id)
      .then((userData) => {
        res.send(userData);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const deleteUserRoute = (req, res) => {
  try {
    let userID = req.query.userID;
    console.log(userID);
    if (!userID) return res.send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    deleteUser(_id)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const editUserData = (req, res) => {
  try {
    // req.body.image = req.file;
    let userID = req.body.userID;
    if (!userID) return res.status(500).send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    updateDetails(_id, req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const linkClickCountRoute = (req, res) => {
  try {
    let link = req.query.link;
    let userID = req.query.userID;
    if (!userID) return res.send({ error: "userID not send" });
    if (!link) return res.send({ status: "send social media name" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    console.log(_id);

    linkClickCount(_id, link)
      .then((response) => res.send(response))
      .catch((err) => res.send(err));
  } catch (error) {
    res.send(error);
  }
};

const addCoverImageRoute = (req, res) => {
  try {
    req.body.image = req.file;
    let imageObj = req.body.image;
    if (!imageObj) return res.send({ err: "image not geted" });
    let userID = req.body.userID;
    if (!userID) {
      fs.unlink(`./public/logo/${imageObj.filename}`, function (err) {
        if (err) return console.log(err);
      });
    }
    if (!userID) return res.status(500).send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    addCoverImage(_id, imageObj)
      .then((response) => {
        if (response.status == "added") {
          res.send(response);
        } else {
          fs.unlink(
            `./public/userCoverImage/${response.filename}`,
            function (err) {
              if (err) return console.log(err);
              res.send({ status: "added" });
            }
          );
        }
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.send(error);
  }
};

const editProfileImageRoute = (req, res) => {
  try {
    req.body.image = req.file;
    let imageObj = req.body.image;
    if (!imageObj) return res.send({ err: "image not geted" });
    let userID = req.body.userID;
    if (!userID) {
      fs.unlink(`./public/logo/${imageObj.filename}`, function (err) {
        if (err) return console.log(err);
      });
    }
    if (!userID) return res.status(500).send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    editProfileImage(_id, imageObj)
      .then((response) => {
        if (response.status == "added") {
          res.send(response);
        } else {
          console.log("hello  " + response.filename);
          fs.unlink(`./public/userImage/${response.filename}`, function (err) {
            if (err) return console.log(err);
            res.send({ status: "added" });
          });
        }
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.send(error);
  }
};
const editLogoImageRoute = (req, res) => {
  try {
    req.body.image = req.file;
    let imageObj = req.body.image;
    if (!imageObj) return res.send({ error: "image not geted" });
    let userID = req.body.userID;
    if (!userID) {
      fs.unlink(`./public/logo/${imageObj.filename}`, function (err) {
        if (err) return console.log(err);
      });
    }
    if (!userID) return res.status(500).send({ error: "userID not send" });

    let { _id } = jwt.verify(userID, jwtPrivetKey);
    editLogoImage(_id, imageObj)
      .then((response) => {
        console.log(response);
        if (response.status == "added") {
          res.send(response);
        } else {
          // console.log(response.filename);
          fs.unlink(`./public/logo/${response.filename}`, function (err) {
            if (err) return console.log(err);
            res.send({ status: "added" });
          });
        }
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.send(error);
  }
};

const AddOrderRoute = (req, res) => {
  try {
    req.body.image = req.file;
    let imageObj = req.body.image;
    if (!imageObj) return res.send({ err: "image not geted" });
    let userID = req.body.userID;
    if (!userID) {
      fs.unlink(`./public/orderLogo/${imageObj.filename}`, function (err) {
        if (err) return console.log(err);
      });
    }
    if (!userID) return res.send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    req.body.userID = _id;
    addOrder(req.body)
      .then((response) => res.send(response))
      .catch((err) => res.send(err));
  } catch (error) {
    res.send(error);
  }
};

const getAllOrderRoute = (req, res) => {
  try {
    getAllOrder()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const userOrderRoute = (req, res) => {
  try {
    let userID = req.query.userID;
    if (!userID) return res.send({ error: "userID not send" });
    let { _id } = jwt.verify(userID, jwtPrivetKey);
    userOrder(_id)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
};
const getOrderRoute = (req, res) => {
  try {
    let orderID = req.query.orderID;
    if (!orderID) return res.send({ error: "orderID not send" });
    getOrder(orderID)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

// /********************************************* */
var { getProduct, getAllProduct } = require("../db/adminHelpers");

const getProductRout = (req, res) => {
  try {
    // console.log(req.query.ProductID);
    if (!req.query.ProductID)
      return res.send({ status: "product ID not send" });
    getProduct(req.query.ProductID)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => res.send({ error: err }));
  } catch (error) {
    res.send(error);
  }
};

const getAllProductRout = async (req, res) => {
  try {
    getAllProduct()
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.send({ error: err });
      });
  } catch (error) {
    res.send(error);
  }
};

const BadRoute = (req, res) => {
  res.send("This API is not defined");
};
module.exports = {
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
  getAllOrderRoute,
  userOrderRoute,
  getOrderRoute,
  getProductRout,
  getAllProductRout,
};
