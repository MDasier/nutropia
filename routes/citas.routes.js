const Citas = require("../models/Citas.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js")
const { isNutriOrAdmin } = require("../middlewares/role.middleware.js")

//GET "/api/citas/:role"=> 
//*Listado de citas con parametro dinamico 'ROLE' y 'ESTADO'como parametro en el body
router.get("/:role", isTokenValid, async (req,res,next) => {
    try {
      if(req.params.role==="nutri"){
        const resp = await Citas.find({
          estado:'pendiente',        
          nutricionista:req.payload._id
        })
        //.select({})
        /*.populate("nutricionista").select("username")*/
        .populate("paciente","username")//!.select("username")//CONTROLAR LO QUE SE MUESTRA
        res.json(resp)   
      }else if(req.params.role==="paciente"){
        const resp = await Citas.find({
          estado:'pendiente',        
          paciente:req.payload._id
        })
        .populate("nutricionista","username")//!.select("username")//CONTROLAR LO QUE SE MUESTRA
        /*.populate("paciente")*/
        res.json(resp)   
      }
         
    } catch (error) {
      next(error)
      //res.status(500).json({ message: error.message })
    }
})

//GET "/api/citas/:role/:fecha"=> 
//*Listado de citas con parametros dinamicos de 'ROLE' y 'FECHA' también 'ESTADO' como parametro en el body
router.get("/:role/:fecha", isTokenValid, async (req,res,next) => {
  try {
    if(req.params.role==="nutri"){
      const resp = await Citas.find({
        estado:req.body.estado,        
        nutricionista:req.payload._id,
        fecha:req.params.fecha
      })
      /*.populate("nutricionista").select("username")*/
      .populate("paciente")//!.select("username")//CONTROLAR LO QUE SE MUESTRA
      res.json(resp)   
    }else if(req.params.role==="paciente"){
      const resp = await Citas.find({
        estado:req.body.estado,        
        paciente:req.payload._id,
        fecha:req.params.fecha
      })
      .populate("nutricionista")//!.select("username")//CONTROLAR LO QUE SE MUESTRA
      /*.populate("paciente")*/
      res.json(resp)   
    }
       
  } catch (error) {
    next(error)
    //res.status(500).json({ message: error.message })
  }
})

//POST "/api/citas/nueva-cita"=> Crear cita
//*Cita nueva creada solo por nutricionistas
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