import express from "express";
import moment from "moment";
import { verifyToken } from "../../middlewares/authJwt.js";
import {
  createShoppingList,
  deleteShoppinglistByFilter,
  findShoppinglistById,
  findShoppinglists,
  throwIfShoppinglistExists,
  updateShoppinglist,
} from "../../services/shoppinglistService.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const list = await findShoppinglists();
    res.json(list);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shoppinglist = await findShoppinglistById(id);
    res.json(shoppinglist);
  } catch (e) {
    res.status(400).json({ msg: `${e.message}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    await throwIfShoppinglistExists({
      name: name,
    });

    const shoppinglist = await createShoppingList(
      name,
      [],
      req.user.id,
      req.user.id,
      moment().utc()
    );

    res.json(shoppinglist);
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const newList = await updateShoppinglist(name, id);

    return res.json(newList);
  } catch (e) {
    return res.status(e.status || 500).json({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteShoppinglistByFilter({ _id: id });
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
