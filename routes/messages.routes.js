const Mensajes = require("../models/Messages.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")

router.get("/", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Mensajes.find()
      .populate("emisor")
      .populate("receptor")
      res.json(resp)      
    } catch (error) {
      next(error)
    }
})
module.exports = router;