import express from "express";
import Products from "./schema";

const router = express.Router();

/*
    id: firestoreId
    name: string,
    price: float/number

*/
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.send(product);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.post("/products", async (req, res) => {
  try {
    const product = new Products({
      name: req.body.name,
      price: req.body.price,
    });
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400);
    res.json({ msg: `${e.message}` });
  }
});
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    await product.save();
    res.json(product);
  } catch {
    res.status(404);
    res.json({ msg: `No product with id ${id}` });
  }
});
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Products.deleteOne({ _id: id });
    res.status(204);
  } catch {
    res.status(404).json({ msg: `No product with id ${id}` });
  }
});
export default router;
