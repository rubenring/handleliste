import express from "express";
import Products from "../../database/schemas/product.js";
import { verifyToken } from "../../middlewares/authJwt.js";
import {
  deleteProduct,
  getProductById,
  getProductsWithUser,
  throwIfProductExists,
  updateProduct,
} from "../../services/productService.js";
const router = express.Router();

router.use(verifyToken);
router.get("/", async (req, res) => {
  try {
    const products = await getProductsWithUser();
    res.json(products);
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.json(product);
  } catch (e) {
    res.status(e.status || 500).json({ msg: `${e.message}` });
  }
});
router.post("/", async (req, res) => {
  const { id } = req.user;
  const { price, name } = req.body;
  try {
    const newProduct = createProduct(price, name, id);
    res.json(newProduct);
  } catch (e) {
    res.status(e.status || 500).json({ msg: `${e.message}` });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const newProduct = await updateProduct(name, price, id);
    return res.json(newProduct);
  } catch (e) {
    return res.status(e.status || 500).json({ msg: e.message });
  }
});
//TODO: add constraint on delete if exists in shoppinglistitem
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct({ _id: id });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(e.status || 500).json({ msg: e.message });
  }
});
export default router;
