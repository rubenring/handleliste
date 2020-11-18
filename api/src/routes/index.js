import express from "express";
import healthCheck from "./healthCheck/healthCheck.js";
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
router.use("/health/", healthCheck);
router.use("/auth/", auth);
//Auth routes
router.use("/products", products);
router.use("/shoppinglist", shoppinglists);
router.use("/shoppinglistitems", shoppinglistsitem);
router.use("/user", user);

export default router;
