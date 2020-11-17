import express from "express";
import Shoppinglists from "../../database/schemas/shoppinglist.js";
import Products from "../../database/schemas/product.js";
import ShoppinglistItem from "../../database/schemas/shoppingListItem.js";
const router = express.Router();
import { verifyToken } from "../../middlewares/authJwt.js";
import { findShoppinglistById } from "../utils/findUtls.js";
router.use(verifyToken);

router.get("/shoppinglists/:listid/product/", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid).populate({
      path: "items",
    });
    const allProductsInnList = list.items;
    res.json(allProductsInnList);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/shoppinglists/:listid/product/:itemid", async (req, res) => {
  const { listid, itemid } = req.params;
  try {
    const list = await Shoppinglists.findById(listid);
    if (!list)
      return res.status(404).json({ msg: `no list with id ${listid} found` });
    const product = list.items.filter((item) => item._id == itemid);
    if (product.length > 0) {
      return res.json(product[0]);
    } else {
      return res
        .status(404)
        .json({ msg: `no item with id: ${itemid} in list` });
    }
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.put("/shoppinglists/:listid/product/:productid", async (req, res) => {
  const { productid, listid } = req.params;
  try {
    const list = await Shoppinglists.findById(listid);
    if (!list)
      return res
        .status(404)
        .json({ msg: `no shoppinglist with id ${listid} found` });
    const listItem = new ShoppinglistItem({
      _id: productid,
      product: productid,
      qty: req.body.qty | 1,
    });
    await listItem.save();
    await list.items.addToSet(listItem._id);
    await list.save();
    const newList = await findShoppinglistById(listid);
    return res.json(newList);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.delete("/shoppinglists/:listid/product", async (req, res) => {
  const { listid } = req.params;
  try {
    const list = await findShoppinglistById(listid);
    if (!list)
      return res.status(404).json({ msg: `no shoppinglist with id ${listid}` });
    const listOfProductIds = list.items.map((item) => item._id);
    const delResult = await ShoppinglistItem.deleteMany({
      _id: {
        $in: listOfProductIds,
      },
    });
    list.items = [];
    await list.save();
    const response = await findShoppinglistById(listid);
    res.json({
      shoppinglist: response,
      deleteresult: delResult,
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.delete("/shoppinglists/:listid/product/:productid", async (req, res) => {
  const { productid, listid } = req.params;
  try {
    const product = await Products.findById(productid);
    const shoppinglist = await findShoppinglistById(listid);

    if (!shoppinglist)
      return res.status(404).json({ msg: `no shoppinglist with id ${listid}` });
    if (shoppinglist.items === 0)
      return res.status(404).json({ msg: `no items in shoppinglist` });
    // const excists = await ShoppinglistItem.exists({
    //   _id: productid,
    // });
    // if (!excists) {
    //   return res.status(409).json({
    //     msg: `no product with id ${productid} exists in list`,
    //   });
    // }

    list.products.pull(product);
    const newList = await list.save();
    const response = await findShoppinglistById(newList._id);
    res.json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

export default router;
