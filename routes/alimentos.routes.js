const Alimentos = require("../models/Alimento.model");
const router = require("express").Router();

//GET "/api/alimentos" => lista de alimentos (filtrar en FE)
router.get("/", async (req,res,next)=>{
  try {
    const resp = await Alimentos.find()
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})

module.exports = router;