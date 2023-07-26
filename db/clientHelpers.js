const ObjectId = require("mongoose").Types.ObjectId;

const e = require("express");
var { User, Order } = require("./Scheme");
const { resolve } = require("path");
const { rejects } = require("assert");

module.exports = {
  signUpUser: (number) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userCheck = await User.findOne({ mobileNo: number });
        if (!number) return reject({ error: "number not get database" });
        if (!userCheck) {
          let user = new User({
            username: "",
            name: "",
            bio: "",
            mobileNo: number,
            companyName : '',
            designation : '',
            website: "",
            email: "",
            instagram: "",
            linkedin: "",
            facebook: "",
            behance: "",
            medium: "",
            spotify: "",
            youtube: "",
            vimeo: "",
            whatsapp: "",
            profileImage: "",
            coverImage: "",
            logo: "",
            instaCount: 0,
            linkedinCount: 0,
            facebookCount: 0,
            websiteCount: 0,
            behanceCount: 0,
            mediumCount: 0,
            spotifyCount: 0,
            youtubeCount: 0,
            vimeoCount: 0,
            whatsappCount: 0,
          });

          await user
            .save()
            .then((data) => {
              resolve(data);
            })
            .catch(() => {
              reject({ error: "database error geted" });
            });
        } else {
          reject({ status: "Already Account Created" });
        }
      } catch (err) {
        reject({ error: err });
      }
    });
  },
  loginUser: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userID) return reject({ error: "userID not get database" });
        if (!userCheck) {
          reject({ status: "User Not Found" });
        } else {
          resolve(userCheck);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getUserDetails: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or UserId" });
        await User.findOne({ _id: new ObjectId(userID) })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });
        await User.deleteOne({ _id: new ObjectId(userId) })
          .then(() => {
            resolve({ status: "user deleted" });
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDetails: (userID, userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });
        let myQuery = { _id: new ObjectId(userID) };

        let updateValues = {
          username: userData.username,
          name: userData.name ,
          bio: userData.bio,
          website: userData.website,
          email: userData.email ,
          instagram: userData.instagram ,
          linkedin: userData.linkedin ,
          facebook: userData.facebook ,
          companyName : userData.companyName  ,
          designation : userData.designation ,
          behance: userData.behance ,
          medium: userData.medium ,
          spotify: userData.spotify ,
          youtube: userData.youtube,
          vimeo: userData.vimeo,
          whatsapp: userData.whatsapp,
        };
        await User.updateOne(myQuery, {
          $set: updateValues,
        })
          .then(() => {
            resolve({ status: "updated succesfully" });
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
    /* coverImage: "-",
          instaCount: 0,
          linkedinCount: 0,
          facebookCount: 0,
          websiteCount: 0,*/
  },
  linkClickCount: (userID, link) => {
    return new Promise(async (resolve, reject) => {
      try {
        let myQuery = { _id: new ObjectId(userID) };
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });
        switch (link) {
          case "instagram":
            {
              await User.updateOne(myQuery, { $inc: { instaCount: 1 } })
                .then((response) => {
                  resolve({ status: "instgram clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "linkedin":
            {
              await User.updateOne(myQuery, { $inc: { linkedinCount: 1 } })
                .then((response) => {
                  resolve({ status: "linkedin clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "facebook":
            {
              await User.updateOne(myQuery, { $inc: { facebookCount: 1 } })
                .then((response) => {
                  resolve({ status: "facebook clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "website":
            {
              await User.updateOne(myQuery, { $inc: { websiteCount: 1 } })
                .then((response) => {
                  resolve({ status: "website clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "benance":
            {
              await User.updateOne(myQuery, { $inc: { behanceCount: 1 } })
                .then((response) => {
                  resolve({ status: "benance clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "medium":
            {
              await User.updateOne(myQuery, { $inc: { mediumCount: 1 } })
                .then((response) => {
                  resolve({ status: "medium clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "spotify":
            {
              await User.updateOne(myQuery, { $inc: { spotifyCount: 1 } })
                .then((response) => {
                  resolve({ status: "spotify clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "youtube":
            {
              await User.updateOne(myQuery, { $inc: { youtubeCount: 1 } })
                .then((response) => {
                  resolve({ status: "youtube clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "vimeo":
            {
              await User.updateOne(myQuery, { $inc: { vimeoCount: 1 } })
                .then((response) => {
                  resolve({ status: "vimeo clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          case "whatsapp":
            {
              await User.updateOne(myQuery, { $inc: { whatsappCount: 1 } })
                .then((response) => {
                  resolve({ status: "whatsapp clicked" });
                })
                .catch((err) => {
                  reject(err);
                });
            }
            break;
          default:
            resolve({ error: "bad click" });
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  addCoverImage: (userID, imageObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let myQuery = { _id: new ObjectId(userID) };
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });

        if (userCheck.coverImage) {
            await User.updateOne(myQuery, { $set: { coverImage: imageObj } })
            .then((response) => {
              resolve(userCheck.coverImage);
            })
            .catch((err) => {
              resolve(err);
            });
        } else {
          await User.updateOne(myQuery, { $set: { coverImage: imageObj } })
          .then((response) => {
            resolve({ status: "added" });
          })
          .catch((err) => {
            resolve(err);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  editProfileImage: (userID, imageObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let myQuery = { _id: new ObjectId(userID) };
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });
        
        console.log(userCheck.profileImage ? true : false);
        if (userCheck.profileImage) {
            await User.updateOne(myQuery, { $set: { profileImage: imageObj } })
            .then((response) => {
              resolve(userCheck.profileImage);
            })
            .catch((err) => {
              resolve(err);
            });
        } else {
          await User.updateOne(myQuery, { $set: { profileImage: imageObj } })
          .then((response) => {
            resolve({ status: "added" });
          })
          .catch((err) => {
            resolve(err);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  editLogoImage: (userID, imageObj) => {
    return new Promise(async (resolve, reject) => {

      try {
        let myQuery = { _id: new ObjectId(userID) };
        let userCheck = await User.findOne({ _id: new ObjectId(userID) });
        if (!userCheck) return reject({ error: "invalid user or Userid" });
        if (userCheck.logo) { 
            await User.updateOne(myQuery, { $set: { logo: imageObj } })
            .then((response) => {
              resolve(userCheck.logo);
            })
            .catch((err) => {
              resolve(err);
            });
        } else {
          await User.updateOne(myQuery, { $set: { logo: imageObj } })
          .then((response) => {
            resolve({ status: "added" });
          })
          .catch((err) => {
            resolve(err);
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  addOrder: (orderData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = new Order({
          customerName: orderData.customerName,
          phoneNumber: orderData.phoneNumber,
          address: orderData.address,
          userID: orderData.userID,
          productName : orderData.productName,
          quantity : orderData.quantity,
          price : orderData.price,
          companyName : orderData.companyName,
          designation : orderData.designation,
          logo : orderData.image
        });
        await order
          .save()
          .then(() => {
            resolve({ status: "order Placed" });
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllOrder: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await Order.find({})
          .then((orders) => {
            resolve(orders);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  userOrder: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Order.find({ userID: userID })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOrder: (orderID) => {
    return new Promise(async (resolve, rejects) => {
      try {
        await Order.findOne({ _id: new ObjectId(orderID) })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
};
