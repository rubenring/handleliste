import express from "express";
const router = express.Router();

router.get("/shoppinglist", (req, res) => {
  res.json([
    {
      Hello: "World",
    },
  ]);
});
router.get("/shoppinglist:id", (req, res) => {
  res.json({
    Hello: "World",
  });
});
router.post("/shoppinglist", (req, res) => {
  const body = req.body;
  res.json(body);
});
router.put("/shoppinglist", (req, res) => {
  const body = req.body;
  res.json(body);
});
export default router;
