import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Product from "../models/ProductModel.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    res.status(201).send({ message: "User registered", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "User not registered", errorString: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "Email not found" });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(404).send({ message: "Invalid Crendentials" });

    const loginToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("LoginToken", loginToken, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .send({ message: "Login Successfull", user: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Admin not login", errorString: error.message });
  }
}

export async function checkInWishlist(req, res) {
  try {
    const { slug } = req.params;
    const { id } = req.user;

    const product = await Product.findOne({ slug: slug });

    const user = await User.findOne({
      _id: id,
      wishlist: { $in: [product._id] },
    });

    // console.log("user", user);

    if (user && user._id) {
      return res.send({ exists: true });
    }
    return res.send({ exists: false });
  } catch (error) {
    return res.status(500).send({
      errorString: error.message,
    });
  }
}

export async function addToWishlist(req, res) {
  // console.log("inside add to wishlist");
  try {
    const { productSlug } = req.body;
    const { id } = req.user;

    const product = await Product.findOne({ slug: productSlug });
    if (!product) return res.status(404).send({ message: "Product not found" });

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { wishlist: product._id } },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.send({
      message: "Product added to wishlist",
      user: user._id,
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res.status(500).send({
      errorString: error.message,
    });
  }
}

export async function getWishlist(req, res){
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.send({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).send({
      errorString: error.message,
    });
  }
}
