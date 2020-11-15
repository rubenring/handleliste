import express from "express";
import Shoppinglists from "../../database/schemas/shoppinglist.js";
import StatusList, { singleStatus } from "../../database/schemas/status.js";
import moment from "moment";
import mongoose from "mongoose";
import { user } from "../../database/schemas/user.js";

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
    const temp_singleStatus = mongoose.model("singleStatus", singleStatus);
    const temp_user = mongoose.model("user", user);

    const statusList = new StatusList({
      updatedAt: new Date(),
      statusList: [
        new temp_singleStatus({
          name: "Active",
          createdAt: moment(),
        }),
      ],
      status: temp_singleStatus,
    });
    const shoppinglist = new Shoppinglists({
      name: req.body.name,
      items: [],
      statusList,
      createdBy: new temp_user({
        username: "reuben",
        email: "reuben@reuben.no",
        password: "pass",
      }),
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
