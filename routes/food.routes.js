const Food = require("../models/Food.model");
const router = require("express").Router();

//ver todos los alimentos
router.get("/", async (req,res,next)=>{
  try {
    const resp = await Food.find(req.query)
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})
//ver detalle de alimento

module.exports = router;