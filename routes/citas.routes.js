const Citas = require("../models/Citas.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")
const { isNutriOrAdmin } = require("../middlewares/role.middleware.js")

//GET "/api/citas"=> Listado de citas
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

//GET "/api/citas/nueva-cita"=> Listado de citas
router.post("/nueva-cita", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
  try {
    await Citas.create({
      /*
      parametros || req.body 
      */
    })
    res.status(201)      
  } catch (error) {
    next(error)
  }
})

module.exports = router;