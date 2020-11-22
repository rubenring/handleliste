import express from "express";
import { getStatus } from "../../services/healthCheck.js";
import constants from "./constants.js";

const router = express.Router();

router.get("/ping/", (req, res) => {
  try {
    res.status(200).send("pong");
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});
router.get("/health/", (req, res) => {
  try {
    const readyState = getStatus();
    res.contentType("application/health+json").send({
      API: constants.PASS,
      Database: readyState === 1 ? constants.PASS : constants.FAIL,
    });
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});

export default router;
