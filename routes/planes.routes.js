const Plan = require("../models/PlanNutricional.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")


router.get("/", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Plan.find()
      .populate("nutricionista")
      .populate("paciente")
      //console.log(resp)
      res.json(resp)
      
    } catch (error) {
      next(error)
    }
})
  
  module.exports = router;