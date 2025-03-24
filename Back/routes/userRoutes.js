import express from "express";
import {
  registerUser,
  loginUser,
  checkInWishlist,
} from "../controllers/user.js";
import { check } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/checkInWishlist/:productSlug", check, checkInWishlist);

export default userRouter;
