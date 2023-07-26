var jwt = require("jsonwebtoken");
require("dotenv").config();
var fs = require("fs");
const jwtPrivetKey = process.env.JWT_PRIVET_KEY;
var {
  adminSignup,
  adminLogin,
  addProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
  deleteImage,
} = require("../db/adminHelpers");

const adminLoginRout = (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.send({ status: "Enter emain & password" });
    adminLogin(req.body)
      .then((response) => res.send(response))
      .catch((err) => res.send(err));
  } catch (error) {
    res.send(error);
  }
};

const adminSignUpRout = (req, res) => {
  // console.log(req.body);
  try {
    if (!req.body.email || !req.body.password)
      return res.send({ status: "Enter emain & password" });
    adminSignup(req.body)
      .then((response) => res.send({status : 'admin created'}))
      .catch((err) => res.send(err));
  } catch (error) {
    res.send(error);
  }
};
const addProductRout = async (req, res) => {
  try {
    req.body.images = req.files;
    if (!req.body.name) return res.send({ status: "Data not send" });
    await addProduct(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        res.send({ error: true });
      });
  } catch (error) {
    res.send(error)
  }
};
const getProductRout = (req, res) => {
try {
    // console.log(req.query.ProductID);
    if (!req.query.ProductID) return res.send({ status: "product ID not send" });
    getProduct(req.query.ProductID)
      .then((product) => {
        res.send(product);
      })
      .catch((err) => res.send({ error: err }));
} catch (error) {
  res.send(error)
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
    res.send( error);
  }
};
const deteteProductRout = (req, res) => {
  try {
    if (!req.query.id) return res.send({ status: "id not sended" });
    deleteProduct(req.query.id)
      .then((data) => {
        for (let i = 0; i < data.images.length; i++) {
          fs.unlink("./public/images/" + data.images[i].filename, (err) => {
            if (err) {
              console.log(err);
            }
            console.log("Delete File successfully.");
          });
        }
        res.send({ delete: "delete succesfully" });
      })
      .catch((error) => {
        res.send({ error: true });
      });
  } catch (error) {
    res.send( error);
  }
};
const editProductRout = async (req, res) => {
  try {
    // console.log(req.body)
    req.body.images = req.files;
    console.log(req.body);
    let images = req.body.images;
    if (!req.body.id){
      images.map((img)=>{
        fs.unlink("./public/productImage/" +img.filename, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("Delete File successfully.");
        });
      })
    }
    if (!req.body.id) return res.send({ status: "id not sended" });
    editProduct(req.body.id, req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.send({ error: err }));
  } catch (error) {
    res.status(500).send(error)
  }
};

const deleteImageRoute = (req, res) => {
  try {
    let productID = req.body.productID;
    let filename = req.body.filename;
    if (!productID) return res.send({ error: "userID not sended" });
    if (!filename) return res.send({ error: "filename not sended" });
    deleteImage(productID, filename)
      .then((response) => {
        console.log(response);
        if (response.status.modifiedCount == 1 && response.imageName) {
          fs.unlink("./public/productImage/" + response.imageName, (err) => {
            if (err) {
              console.log(err);
            }
            console.log("Delete File successfully.");
          });
          res.send({ status: "Image deleted" });
        } else {
          res.send({ status: "image not deleted" });
        }
      })
      .catch((err) => res.send(err));
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  adminLoginRout,
  adminSignUpRout,
  addProductRout,
  getProductRout,
  getAllProductRout,
  deteteProductRout,
  editProductRout,
  deleteImageRoute,
};
