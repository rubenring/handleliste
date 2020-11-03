import express from "express";
const router = express.Router();

router.get("/users", (req, res) => {
  res.json([
    {
      Hello: "World",
    },
  ]);
});
router.get("/users:id", (req, res) => {
  res.json({
    Hello: "World",
  });
});
router.post("/users", (req, res) => {
  const body = req.body;
  res.json(body);
});
router.put("/users", (req, res) => {
  const body = req.body;
  res.json(body);
});
export default router;
