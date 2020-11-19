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
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.json(product);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.post("/", async (req, res) => {
  const { price, name } = req.body;
  if (!price || !name)
    return res.status(404).json({
      msg: `price or name not set`,
    });
  try {
    await throwIfProductExists({
      name: name,
    });

    const product = new Products({
      name: name,
      price: price,
      createdBy: req.user.id,
    });
    await product.save();
    const newProduct = await Products.findById(id);

    res.json(newProduct);
  } catch (e) {
    res.status(500).json({ msg: `${e.message}` });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    if (!price && !name)
      return res.status(404).json({
        msg: "no fields to update",
      });
    const update = {
      updatedBy: req.user.id,
    };
    const filter = { _id: id };
    if (name) update.name = name;
    if (price) update.price = price;
    await updateProduct(filter, update);
    const newProduct = await getProductById(id);
    return res.json(newProduct);
  } catch {
    return res.status(404).json({ msg: `No product with id ${id}` });
  }
});
//TODO: add constraint on delete if exists in shoppinglistitem
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct({ _id: id });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});
export default router;
