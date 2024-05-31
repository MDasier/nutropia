function isNutriOrAdmin (req,res,next) {

  if(req.payload.role==="admin" || req.payload.role==="nutri"){
    next()
  }else{
    res.status(401).json({errorMessage: "No tienes los permisos necesarios"})
  }

}
  
module.exports = {
  isNutriOrAdmin
}