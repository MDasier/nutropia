const router = require("express").Router();
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const foodRouter = require("./food.routes.js")
router.use("/alimentos", foodRouter)

module.exports = router;