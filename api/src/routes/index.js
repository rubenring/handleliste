import express from "express";
import products from "./products/products.js";
import shoppinglists from "./shoppinglist/shoppinglist.js";
import shoppinglistsitem from "./shoppinglistItem/shoppinglistitem.js";
import user from "./users/users.js";

const router = express.Router();

router.use("/", products);
router.use("/", shoppinglists);
router.use("/", shoppinglistsitem);
router.use("/", user);

export default router;
