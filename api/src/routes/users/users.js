import express from "express";
import User from "../../database/schemas/User.js";
import { verifyToken } from "../../middlewares/authJwt";
const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id })
      .populate({
        path: "roles",
        select: "-_id -__v",
      })
      .select(["-password", "-__v", "-_id"]);
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/:username", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put("/:username", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/:username", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
