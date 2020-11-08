import express from "express";
import Shoppinglists from "./schema";
import Products from "../products/schema";
import ShoppinglistStatus from "../../database/schemas/Status";
import moment from "moment";
const router = express.Router();

router.get("/shoppinglists", async (req, res) => {
  try {
    const shoppinglists = await Shoppinglists.find();
    res.send(shoppinglists);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.get("/shoppinglists/:id", async (req, res) => {
  try {
    const shoppinglist = await Shoppinglists.findById(req.params.id);
    res.send(shoppinglist);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});
router.post("/shoppinglists/", async (req, res) => {
  try {
    const status = new ShoppinglistStatus({
      name: "Active",
      createdAt: moment().format(),
    });
    const shoppinglist = new Shoppinglists({
      name: req.body.name,
      products: [],
      status: [status],
    });
    await shoppinglist.save();
    res.send(shoppinglist);
  } catch (e) {
    res.status(400);
    res.json({ msg: `${e.message}` });
  }
});
router.put("/shoppinglists", (req, res) => {
  const body = req.body;
  res.json(body);
});

router.delete("/shoppinglists:id", (req, res) => {
  const id = req.params.id;
  res.json({ id });
});

export default router;
