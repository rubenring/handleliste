import express from "express";
import products from "./products/products.js";
import shoppinglists from "./shoppinglist/shoppinglist.js";
import shoppinglistsitem from "./shoppinglist/shoppinglistitem.js";

const router = express.Router();

router.use("/", products);
router.use("/", shoppinglists);
router.use("/", shoppinglistsitem);

export default router;
