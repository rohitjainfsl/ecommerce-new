import express from "express";
import { fetchCart, addToCart } from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.get("/", fetchCart);
cartRouter.post("/add", addToCart);

export default cartRouter;
