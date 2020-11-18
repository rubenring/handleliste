import express from "express";
import Shoppinglists from "../../database/schemas/shoppinglist.js";
import StatusList, {
  SingelStatusModel,
} from "../../database/schemas/status.js";
import moment from "moment";
import moongoose from "mongoose";
import { verifyToken } from "../../middlewares/authJwt.js";
import { findShoppinglistById, findShoppinglists } from "../utils/findUtls.js";
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
    const excists = await Shoppinglists.exists({
      name: name,
    });
    if (excists) {
      return res.status(409).json({
        msg: `Shoppinglist with name ${name} already exists`,
      });
    }
    const singleStatus = new SingelStatusModel({
      _id: new moongoose.Types.ObjectId(),
      name: "Active",
      createdAt: moment().utc(),
    });
    await singleStatus.save();
    const statusList = new StatusList({
      _id: new moongoose.Types.ObjectId(),
      updatedAt: new Date(),
      items: [singleStatus._id],
    });
    await statusList.save();

    const shoppinglist = new Shoppinglists({
      name: name,
      items: [],
      status: singleStatus._id,
      statusList: statusList._id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      lastUpdated: moment().utc(),
    });

    const saved = await shoppinglist.save();
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
    const excists = await Shoppinglists.exists({
      name: name,
    });
    if (excists) {
      return res.status(409).json({
        msg: `Shoppinglist with name ${name} already exists`,
      });
    }
    const filter = { _id: id };
    const update = {
      name: name,
      lastUpdated: moment().utc(),
    };

    await Shoppinglists.updateOne(filter, update);
    const newList = await findShoppinglistById(id);

    return res.json(newList);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const status = await Shoppinglists.deleteOne({ _id: id });
    if (status.deletedCount === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
