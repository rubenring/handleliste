import express from "express";
import Shoppinglists from "./schema";
import Products from "../products/schema";
const router = express.Router();

router.get("/shoppinglists/:listid/product/", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid);
    const allProductsInnList = list.products;
    res.json(allProductsInnList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
  }
});

router.get("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid);
    const product = list.products.filter(
      (item) => item._id == req.params.itemid
    );
    console.log(product);
    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ msg: `no item with id: ${req.params.itemid} in list` });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
  }
});

router.put("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  try {
    const product = await Products.findById(req.params.itemid);
    const list = await Shoppinglists.findById(req.params.listid);
    await list.products.addToSet(product);
    const newList = await list.save();
    res.json(newList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
  }
});

router.delete("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  try {
    const product = await Products.findById(req.params.itemid);
    const list = await Shoppinglists.findById(req.params.listid);
    const isInList = list.products.filter(
      (item) => item._id == req.params.itemid
    );
    if (isInList.length === 0) {
      return res.status(204).send();
    }
    list.products.pull(product);
    const newList = await list.save();
    res.json(newList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
  }
});

export default router;
