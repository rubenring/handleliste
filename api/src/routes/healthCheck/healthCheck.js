import express from "express";
import mongoose from "mongoose";
import constants from "./constants.js";

const router = express.Router();

router.get("/ping/", (req, res) => {
  res.status(200).send("pong");
});
router.get("/health/", (req, res) => {
  const readyState = mongoose.connection.readyState;
  res.contentType("application/health+json").send({
    API: constants.PASS,
    Database: readyState === 1 ? constants.PASS : constants.FAIL,
  });
});

export default router;
