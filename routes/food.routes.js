const Food = require("../models/Food.model");
const router = require("express").Router();

//ver alimentos en funcion del query
router.get("/query", async (req,res,next)=>{
  try {
    const resp = await Food.find(req.query)
    //console.log(req.query)
    //{"Alimento":{"$regex": "c","$options": "i"}}//-->Buscar alimento que tenga "c" y sin contar mayus/minus
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})

module.exports = router;