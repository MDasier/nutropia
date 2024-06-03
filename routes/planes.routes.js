const Plan = require("../models/Plan.model.js");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")
const { isNutriOrAdmin } = require("../middlewares/role.middleware.js")


//GET "/api/plan-nutricional/all"
router.get("/all", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
  try {
    const resp = await Plan.find()
    .populate("nutricionista")//.select("username")
    .populate("paciente")//.select("username")
    res.json(resp)
    
  } catch (error) {
    next(error)
  }
})

//GET "/api/plan-nutricional" => NUTRICIONISTA BUSCANDO TODOS LOS PLANES CON SU ID
router.get("/", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
    try {
      const resp = await Plan.find({nutricionista:req.payload._id})
      .populate("nutricionista","username")//.select("username")
      .populate("paciente","username")//.select("username")
      res.json(resp)
      
    } catch (error) {
      next(error)
    }
})

//POST "/api/plan-nutricional/new-plan"  => crea un plan nuevo
router.post("/nuevo-plan", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
  try {
      await Plan.create({
      nutricionista:req.payload._id,
      paciente:req.body.paciente
    })
    res.status(201).json({data:"Nuevo plan nutricional creado"})    
  } catch (error) {
    next(error)
  }
})

//PATCH "/api/plan-nutricional/:planId" => asigna una dieta al plan
router.patch("/:planId", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
  try {
      await Plan.findByIdAndUpdate(req.params.planId, {
        dieta: req.body.dieta
      })
    res.status(201).json({data:"Dieta añadida al plan"})    
  } catch (error) {
    next(error)
  }
})
module.exports = router;