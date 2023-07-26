const ObjectId = require("mongoose").Types.ObjectId;
var { Admin, Product } = require("./Scheme");
const bcrypt = require("bcrypt");
module.exports = {
  adminSignup: (adminData) => {
    return new Promise(async (resolve, reject) => {
      try {
        adminData.password = await bcrypt.hash(adminData.password, 12);
        let adminCheck = await Admin.findOne({});
        console.log(adminCheck);
        if (adminCheck == null) {
          let admin = new Admin({
            name: adminData.name,
            email: adminData.email,
            password: adminData.password,
          });
          await admin
            .save()
            .then((data) => resolve(data))
            .catch((err) =>
              reject({ status: "fetch error in admin creation" })
            );
        } else {
          reject({ status: "admin already created" });
        }
      } catch (error) {
        reject(error)
      }
    });
  },
  adminLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
     try {
       let adminCheck = await Admin.findOne({ email: adminData.email });
       if (adminCheck) {
         let password = await bcrypt.compare(
           adminData.password,
           adminCheck.password
         );
         if (password) {
           let adminOBJ = {
             _id: adminCheck._id,
             name: adminCheck.name,
             email: adminCheck.email,
           };
           resolve(adminOBJ);
         } else {
           resolve({ status: "incorrect password" });
         }
       } else {
         resolve({ status: "enter valid email" });
       }
     } catch (error) {
      reject(error)
     }
    });
  },
  addProduct: (productData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = new Product({
          //post collection il data veyknnu
          name: productData.name,
          price: productData.price,
          images: productData.images,
          bio : productData.bio
        });
        await product
          .save()
          .then((product) => resolve(product))
          .catch((err) => reject({ error: err }));
      } catch (error) {
        reject(error)
      }
    });
  },
  getProduct: (proID) => {
    console.log(proID);
    return new Promise(async (resolve, reject) => {
      try {
        await Product.findOne({ _id:new ObjectId(proID)})
          .then((product) => resolve(product))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProduct: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const AllProducts = await Product.find({}).limit(20);
        resolve(AllProducts);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProduct: (productID) => {
    return new Promise(async (resolve, reject) => {
      let productImg = await Product.findOne({ _id:new ObjectId(productID) }, { images: 1 });
      try {
        Product.deleteOne({ _id: productID })
          .then((data) => {
            resolve(productImg);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
       reject(error)
      }
    });
  },
  editProduct: (productID, productData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(productData.images);
        await Product.updateOne(
          { _id:new ObjectId(productID) },
          {
            $set: {
              name: productData.name,
              price: productData.price,
              bio : productData.bio
            },
          }
          
        );
        console.log(productData.bio);
        if (productData.images) {
        productData.images.forEach(async image => {
          await Product.updateOne(
            { _id:new ObjectId(productID)},
            { $push: { images:image} }
          );
          });
         
        } 
       
        resolve({ edit: 'Edited Succesfully' });
      } catch (error) {
        reject(error)
      }
    });
  },
  deleteImage :(productID,imageName)=>{
    return new Promise(async(resolve,reject)=>{
     
      try {
        Product.updateOne(
          { _id: new ObjectId(productID) },
          { $pull: {images:{filename: imageName} } }
        ).then((response)=>resolve({imageName :imageName,status : response})).catch((err)=>reject(err))
      } catch (error) {
        reject(error)
      }
    })
  }
};
