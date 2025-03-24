import express from "express";
import {
  registerUser,
  loginUser,
  checkInWishlist,
  addToWishlist
} from "../controllers/user.js";
import { check } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/checkInWishlist/:slug", check, checkInWishlist);
userRouter.post("/addToWishlist/", check, addToWishlist);

export default userRouter;
