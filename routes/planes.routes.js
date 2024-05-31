const Plan = require("../models/Plan.model.js");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")
const { isNutriOrAdmin } = require("../middlewares/role.middleware.js")

//GET "/api/plan-nutricional"
router.get("/", isTokenValid, isNutriOrAdmin, async (req,res,next) => {
    try {
      const resp = await Plan.find()
      .populate("nutricionista")
      .populate("paciente")
      res.json(resp)
      
    } catch (error) {
      next(error)
    }
})

//POST "/api/plan-nutricional/new-plan"
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

//PATCH "/api/plan-nutricional/:planId"
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