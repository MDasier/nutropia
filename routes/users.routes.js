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

//PATCH /api/usuarios/:userId
router.patch("/:userId", async (req,res,next)=>{
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      role: req.body.role,
      nutricionista: req.body.nutricionista
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router;