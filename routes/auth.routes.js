const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { isTokenValid } = require("../middlewares/auth.middlewares.js")

// POST "/api/auth/signup" =>
router.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    res.status(400).json({errorMessage: "Todos los campos son obligatorios"})
    return
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({errorMessage: "La contraseña require más de 8 caracteres, al menos una minúscula, una mayúscula y algún número"})
    return
  }

  try {
    const foundUser = await User.findOne({email: email})
    if (foundUser) {
      res.status(400).json({errorMessage: "Usuario ya registrado con ese correo electrónico"})
      return
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      email: email,
      username: username,
      password: hashPassword
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// POST "/api/auth/login" => 
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body

  if (!email  || !password) {
    res.status(400).json({errorMessage: "Todos los campos son obligatorios"})
    return
  }

  try {
    const foundUser = await User.findOne( {email: email} )
    if (!foundUser) {
      res.status(400).json({errorMessage: "Usuario no registrado"})
      return
    }
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({errorMessage: "Contraseña incorrecta"})
      return
    }
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username
    }
    const authToken = jwt.sign(
      payload, // CONTENIDO DEL TOKEN
      process.env.TOKEN_SECRET, // CLAVE PARA CIFRAR (ENV)
      { algorithm: "HS256", expiresIn: "7d" } // TOKEN CONFIG (7 DIAS)
    )
    res.status(200).json({ authToken: authToken })
  } catch (error) {
    next(error)
  }

})

// GET "/api/auth/verify" =>
router.get("/verify", isTokenValid, (req, res, next) => {
  //console.log(req.payload) // usuario
  res.status(200).json({payload: req.payload})
})

// GET "/api/auth/perfil" =>
router.get("/perfil", isTokenValid, async (req,res) => {
  try {
    const resp = await User.findById(req.payload._id)
    //console.log(resp)
    res.json(resp)
  } catch (error) {
    next(error)
  }
})

// GET "/api/auth/pacientes" =>
router.get("/pacientes", isTokenValid, async (req,res) => {
  try {
    const resp = await User.findById(req.payload._id)
    //console.log(resp)
    if(resp.role==="nutri"){
      //!CUANDO SEA NUTRI BUSCAR LOS PACIENTES ASOCIADOS
      //const resp2 = await User.find()
      //res.json(resp2)
    }
    
  } catch (error) {
    next(error)
  }
})
module.exports = router;