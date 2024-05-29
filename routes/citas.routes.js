const Citas = require("../models/Citas.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")

router.get("/", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Citas.find()
      .populate("nutricionista")
      .populate("paciente")
      res.json(resp)      
    } catch (error) {
      next(error)
    }
})
module.exports = router;