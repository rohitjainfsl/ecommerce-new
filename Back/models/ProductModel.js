import mongoose from "mongoose";

// Schema is a blueprint of how data will be stored in the database.
// Mongoose is a third party package that allows us to interact with MongoDB
// It is an object Data modeling (ODM) library for mongodb and nodejs.
// Model is a class with which we construct documents.

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    //type: either ObjectId or String
    type: {},
    required: true,
  },
  OriginalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
