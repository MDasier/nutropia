const User = require("../models/User.model");
const router = require("express").Router();

const { isTokenValid } = require("../middlewares/auth.middlewares.js")

// GET "/api/perfil" => Obtener los datos del perfil
router.get("/:userId", isTokenValid, async (req,res,next) => {
    try {
      const resp = await User.findById(req.payload._id)
      //console.log(resp)
      res.json(resp)
    } catch (error) {
      next(error)
    }
  })
  
  // PATCH "/api/perfil/:userId" => cambiar nombre de perfil
  router.patch("/:userId", isTokenValid, async (req,res,next) => {
    try {
      await User.findByIdAndUpdate(req.payload._id, {
        email: req.body.email,
        username: req.body.username
        /*password: req.body.password*/
      })
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })
  
  // PATCH "/api/perfil/foto-perfil" => cambiar foto de perfil
  router.patch("/:userId/foto-perfil", isTokenValid, async (req,res,next) => {
    try {
      await User.findByIdAndUpdate(req.payload._id, {
        imageUrl: req.body.imageUrl
      })
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })
  module.exports = router;