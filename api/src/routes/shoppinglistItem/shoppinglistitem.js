import express from "express";
import Shoppinglists from "../../database/schemas/shoppinglist.js";
import Products from "../../database/schemas/product.js";
import ShoppinglistItem from "../../database/schemas/shoppingListItem.js";
const router = express.Router();
import { verifyToken } from "../../middlewares/authJwt.js";
import { findShoppinglistById } from "../utils/findUtls.js";
router.use(verifyToken);

router.get("/:listid/product/", async (req, res) => {
  try {
    const list = await Shoppinglists.findById(req.params.listid).populate({
      path: "items",
      populate: {
        path: "product",
      },
    });
    res.json(list.items);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/:listid/product/:itemid", async (req, res) => {
  const { listid, itemid } = req.params;
  try {
    const list = await Shoppinglists.findById(listid);
    if (!list)
      return res.status(404).json({ msg: `no list with id ${listid} found` });
    const exists = await ShoppinglistItem.exists({
      _id: itemid,
    });
    if (exists) {
      const response = await ShoppinglistItem.findOne({ _id: itemid });
      res.json(response);
    } else {
      return res
        .status(404)
        .json({ msg: `no item with id: ${itemid} in list` });
    }
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.put("/:listid/product/:productid", async (req, res) => {
  const { productid, listid } = req.params;
  try {
    const list = await Shoppinglists.findById(listid).populate({
      path: "items",
      populate: {
        path: "product",
      },
    });
    if (!list)
      return res
        .status(404)
        .json({ msg: `no shoppinglist with id ${listid} found` });
    const excists = list.items.filter((listitems) => {
      return listitems.product._id.toString() === productid.toString();
    });
    if (excists.length > 0) {
      return res.status(409).json({
        msg: `product with id ${productid} exists in list`,
      });
    }
    const listItem = new ShoppinglistItem({
      product: productid,
      qty: req.body.qty | 1,
      createdBy: req.user.id,
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

router.delete("/:listid/product", async (req, res) => {
  const { listid } = req.params;
  try {
    const list = await findShoppinglistById(listid);
    if (!list)
      return res.status(404).json({ msg: `no shoppinglist with id ${listid}` });
    const shoppingListItemIds = list.items.map((item) => item._id);
    const delResult = await ShoppinglistItem.deleteMany({
      _id: {
        $in: shoppingListItemIds,
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

router.delete("/:listid/product/:productid", async (req, res) => {
  const { productid, listid } = req.params;
  try {
    const product = await Products.findById(productid);
    const shoppinglist = await findShoppinglistById(listid);

    if (!shoppinglist)
      return res.status(404).json({ msg: `no shoppinglist with id ${listid}` });
    if (shoppinglist.items === 0)
      return res.status(404).json({ msg: `no items in shoppinglist` });
    const excists = await ShoppinglistItem.exists({
      _id: productid,
    });
    if (!excists) {
      return res.status(409).json({
        msg: `no product with id ${productid} exists in list`,
      });
    }

    list.products.pull(product);
    await list.save();
    res.status(204);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

export default router;
