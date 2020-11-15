import express from "express";
import products from "./products/products.js";
import shoppinglists from "./shoppinglist/shoppinglist.js";
import shoppinglistsitem from "./shoppinglistItem/shoppinglistitem.js";
import user from "./users/users.js";
import auth from "./auth/auth.js";

const router = express.Router();
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.use("/", products);
router.use("/", shoppinglists);
router.use("/", shoppinglistsitem);
router.use("/", user);
router.use("/", auth);

export default router;
