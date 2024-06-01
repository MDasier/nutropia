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

//GET "/api/alimentos/:nombre" => lista de alimentos (filtrar en FE)
router.get("/:nombre", async (req,res,next)=>{
  try {
    const resp = await Alimentos.find({ nombre: { $regex: req.params.nombre, $options: 'i' } })
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})
//GET "/api/alimentos/categoria/:categoria" => lista de alimentos por categoria
router.get("/categoria/:categoria", async (req,res,next)=>{
  try {
    const resp = await Alimentos.find({categoria:req.params.categoria})
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})

module.exports = router;