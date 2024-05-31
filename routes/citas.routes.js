const Citas = require("../models/Citas.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")
const { isNutriOrAdmin } = require("../middlewares/role.middleware.js")

//GET "/api/citas"=> Listado de citas
router.get("/", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
    try {
      const resp = await Citas.find({
        estado:req.body.estado,
        nutricionista:req.payload._id
      })
      .populate("nutricionista")
      .populate("paciente")
      res.json(resp)      
    } catch (error) {
      next(error)
      //res.status(500).json({ message: error.message })
    }
})

//GET "/api/citas/nueva-cita"=> Listado de citas
router.post("/nueva-cita", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
  try {
    await Citas.create({
      nutricionista:req.payload._id,
      paciente:req.body.paciente,
      fecha:req.body.fecha
    })
    res.sendStatus(201)      
  } catch (error) {
    next(error)
  }
})

module.exports = router;