const Dietas = require("../models/Diet.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")

router.get("/", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Dietas.find()
      .populate("nutricionista")
      .populate("planNutricional")
      res.json(resp)      
    } catch (error) {
      next(error)
    }
})
module.exports = router;