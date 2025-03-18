import uploadToCloudinary from "../middlewares/cloudinary.js";
import categoryModel from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";

export async function addProduct(req, res) {
  try {
    const file = req.file;
    // console.log(req.body);
    if (!file) return res.status(404).send({ message: "File Not Found" });
    const secure_url = await uploadToCloudinary(req);

    const newProduct = new Product({ ...req.body, image: secure_url });
    await newProduct.save();
    res.status(201).send("Product Added");
  } catch (error) {
    res
      .status(500)
      .send({ message: "Product not added", Error: error.message });
  }
}

export async function addCategory(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(404).send({ message: "File Not Found" });
    const secure_url = await uploadToCloudinary(req);

    const newCategory = new categoryModel({ ...req.body, image: secure_url });
    await newCategory.save();
    res.status(201).send({ message: "Category Added" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Category not added", Error: error.message });
  }
}

export async function fetchProduct(req, res) {
  try {
    let query = {};
    if (req.params.id) {
      query._id = req.params.id;
    }
    if (req.query.category) {
      const categoryId = await categoryModel.find({
        name: { $regex: new RegExp(`^${req.query.category}$`, "i") },
      });
      query.category = categoryId;
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate("category");

    const totalCount = await Product.countDocuments(query);

    if (!products)
      return res.status(400).send({ message: "No Products found" });

    res.send({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).send({
      message: "Couldn't fetch Product not added",
      Error: error.message,
    });
  }
}

export async function fetchHotDeals(req, res) {
  try {
    const hotDeals = await Product.find({
      discountedPrice: { $gte: 1000 },
    });
    res.status(200).json(hotDeals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchCategories(req, res) {
  try {
    let query = {};

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const category = await categoryModel.find(query).skip(skip).limit(limit);

    const totalCount = await categoryModel.countDocuments(query);

    if (!category)
      return res.status(400).send({ message: "No Categories found" });

    res.send({
      category,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function deleteProductOrCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: "No ID Found" });

    let whatToDelete;

    whatToDelete = await Product.findByIdAndDelete(id);

    if (!whatToDelete) {
      whatToDelete = await categoryModel.findById(id);

      const productsToModify = await Product.find({
        category: whatToDelete._id,
      });

      const modifiedProducts = productsToModify.forEach(async (product) => {
        await product.updateOne({ category: "" });
      });

      await whatToDelete.deleteOne();
    }

    if (!whatToDelete)
      return res
        .status(400)
        .send({ message: "Could not delete the selected resource" });

    return res.send({ message: "Resource Deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
}
