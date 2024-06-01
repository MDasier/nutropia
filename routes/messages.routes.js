const Mensajes = require("../models/Messages.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")

//GET "/api/mensajes/enviados" => todos los mensajes enviados si isTokenValid
router.get("/enviados", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Mensajes.find({
        emisor:req.payload._id
      })
      .populate("emisor")//.select("username")
      .populate("receptor")//.select("username")
      res.json(resp)      
    } catch (error) {
      next(error)
    }
})

//GET "/api/mensajes/recibidos" => todos los mensajes recibidos si isTokenValid
router.get("/recibidos", isTokenValid, async (req,res,next) => {
  try {
    const resp = await Mensajes.find({
      receptor:req.payload._id
    })
    .populate("emisor")//.select("username")
    .populate("receptor")//.select("username")
    res.json(resp)      
  } catch (error) {
    next(error)
  }
})

//GET "/api/mensajes/nuevos" => todos los mensajes nuevos recibidos si isTokenValid
router.get("/nuevos", isTokenValid, async (req,res,next) => {
  try {
    const resp = await Mensajes.find({
      receptor:req.payload._id,
      leido:false
    })
    //.select({emisor,receptor,texto})
    .populate("emisor")//.select("username")
    .populate("receptor")//.select("username")
    res.json(resp) 
     
  } catch (error) {
    next(error)
  }
})
module.exports = router;