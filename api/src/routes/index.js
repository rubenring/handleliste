import express from "express";
import products from "./products/products.js";

const router = express.Router();

router.use("/", products);

export default router;
