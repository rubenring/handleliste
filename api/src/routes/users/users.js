import express from "express";
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/user/:identifyer", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put("/user/:identifyer", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/user/:identifyer", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
