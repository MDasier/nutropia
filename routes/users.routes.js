const { isTokenValid } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const router = require("express").Router();

//GET "/api/usuarios" => lista de usuarios
router.get("/", async (req,res,next)=>{
  try {
    const resp = await User.find()
    res.status(200).json(resp)
  } catch (error) {
    next(error)
  }
})

//PATCH /api/usuarios/:userId/:newRole
router.patch("/:userId/:newRole", isTokenValid, async (req,res,next)=>{
  const {newRole} = req.params
  if(newRole!=="paciente" && newRole!=="invitado" && newRole!=="nutricionista"){
    res.status(400).json("Valor de role no aceptado")
  }
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      role: newRole,
      nutricionista: newRole==="paciente" ? req.payload._id : null
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
  
})

module.exports = router;