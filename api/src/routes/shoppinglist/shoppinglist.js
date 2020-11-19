import express from "express";
import moment from "moment";
import { verifyToken } from "../../middlewares/authJwt.js";
import {
  deleteShoppinglistByFilter,
  findShoppinglistById,
  findShoppinglists,
  throwIfShoppinglistExists,
} from "../../services/shoppinglistService.js";
import {
  createSingleStatus,
  createStatusList,
} from "../../services/statusService.js";
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
    res.send(shoppinglist);
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
    const singleStatus = await createSingleStatus("Active", moment().utc());
    const statusList = await createStatusList(moment().utc(), [
      singleStatus._id,
    ]);

    await createShoppingList(
      name,
      [],
      singleStatus._id,
      statusList._id,
      req.user.id,
      req.user.id,
      moment().utc()
    );

    const responseModel = await findShoppinglistById(saved._id);
    res.json(responseModel);
  } catch (e) {
    res.status(500).json({ msg: `${e.message}` });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        msg: "param id not defined",
      });
    if (!name)
      return res.status(400).json({
        msg: "body param name not defined",
      });
    await throwIfShoppinglistExists({ name: name });

    const filter = { _id: id };
    const update = {
      name: name,
      lastUpdated: moment().utc(),
    };

    const newList = await updateShoppinglist(filter, update);

    return res.json(newList);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
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
