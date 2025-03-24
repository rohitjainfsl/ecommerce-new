import express from "express";
import {
  registerUser,
  loginUser,
  checkInWishlist,
  addToWishlist,
  getWishlist,
} from "../controllers/user.js";
import { check } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/checkInWishlist/:slug", check, checkInWishlist);
userRouter.get("/getWishlist", check, getWishlist);
userRouter.post("/addToWishlist/", check, addToWishlist);

export default userRouter;
