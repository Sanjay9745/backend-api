const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  name: String,
  bio: String,
  mobileNo : Number,
  companyName : String,
  designation : String,
  website: Schema.Types.Mixed,
  email: String,
  instagram: Schema.Types.Mixed,
  linkedin: Schema.Types.Mixed,
  facebook: Schema.Types.Mixed,
  behance: Schema.Types.Mixed,
  medium: Schema.Types.Mixed,
  spotify: Schema.Types.Mixed,
  youtube: Schema.Types.Mixed,
  vimeo: Schema.Types.Mixed,
  whatsapp: Schema.Types.Mixed,
  profileImage: Object,
  coverImage: Object,
  logo:Object,
  instaCount : Number,
  linkedinCount : Number,
  facebookCount : Number,
  websiteCount : Number,
  behanceCount: Number,
  mediumCount: Number,
  spotifyCount: Number,
  youtubeCount: Number,
  vimeoCount: Number,
  whatsappCount: Number,
});

// Compile model from schema
const User = mongoose.model("User", UserSchema);

const AdminSchema = new Schema({
  name: String,
  email: String,
  password :  Schema.Types.Mixed
});

// Compile model from schema
const Admin = mongoose.model("admin",AdminSchema);

const ProductSchema = new Schema({
  name: String,
  price: Number,
  images:Object,
  bio : String
});
const Product = mongoose.model("product",ProductSchema)

const OrderSchema = new Schema({
  price:Number,
  userID: Schema.Types.Mixed,
  customerName: String,
  phoneNumber: Number,
  address: String,
  userID: Schema.Types.Mixed,
  productName :String,
  quantity : Number,
  price : Number,
  companyName : String,
  designation : String,
  logo :Object
})
const Order = mongoose.model('orders',OrderSchema)

module.exports = { User,Admin,Product,Order };

