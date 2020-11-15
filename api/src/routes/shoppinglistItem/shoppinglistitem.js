import express from "express";
import Shoppinglists from "../../database/schemas/shoppinglist.js";
import Products from "../../database/schemas/product.js";
import ShoppinglistItem from "../../database/schemas/shoppingListItem.js";
import { Mongoose } from "mongoose";
const router = express.Router();

router.get("/shoppinglists/:listid/product/", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid);
    const allProductsInnList = list.items;
    res.json(allProductsInnList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

router.get("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid);
    const product = list.items.filter((item) => item._id == req.params.itemid);
    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ msg: `no item with id: ${req.params.itemid} in list` });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
    s;
  }
});

router.put("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  try {
    const product = await Products.findById(req.params.itemid);
    const list = await Shoppinglists.findById(req.params.listid);
    const listItem = new ShoppinglistItem({
      product: product,
      qty: req.body.qty | 1,
    });
    await listItem.save();
    await list.items.addToSet(listItem);
    const newList = await list.save();
    res.json(newList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
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
