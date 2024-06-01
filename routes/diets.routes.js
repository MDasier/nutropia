const Dietas = require("../models/Diet.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")


//GET "/api/dietas" //!BUSCAR POR NUTRICIONISTA PARA EL NUTRI
router.get("/", isTokenValid, async (req,res,next) => {
    try {
      const resp = await Dietas.find()
      .populate("nutricionista")
      .populate("planNutricional")
      res.json(resp)      
    } catch (error) {
      next(error)
    }
})

//GET "/api/dietas" //!BUSCAR POR PLAN PARA EL PACIENTE
/*router.get("/", isTokenValid, async (req,res,next) => {
  try {
    const resp = await Dietas.find()
    .populate("nutricionista")
    .populate("planNutricional")
    res.json(resp)      
  } catch (error) {
    next(error)
  }
})*/

//GET "/api/dietas/nueva-dieta"
router.post("/nueva-dieta", isTokenValid, async (req,res,next) => {
  try {
    await Dietas.create({
      tipo:req.body.tipo,
      /*foods:req.body.foods,*/ //!CAMBIAR CUANDO CONTROLE EL MODELO
      recomendaciones:req.body.recomendaciones,
      nutricionista:req.payload._id,
      planNutricional:req.body.planNutricional
    })
    res.sendStatus(201)    
  } catch (error) {
    next(error)
  }
})


module.exports = router;