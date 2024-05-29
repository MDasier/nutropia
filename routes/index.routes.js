const router = require("express").Router();
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const foodRouter = require("./food.routes.js")
router.use("/alimento", foodRouter)

const planesRouter = require("./planes.routes.js")
router.use("/plan-nutricional", planesRouter)

const messagesRouter = require("./messages.routes.js")
router.use("/mensajes", messagesRouter)

const dietasRouter = require("./diets.routes.js")
router.use("/dietas", dietasRouter)

const citasRouter = require("./citas.routes.js")
router.use("/citas", citasRouter)

module.exports = router;