
const User = require("../models/User.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const forgetPassword = async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
  
      // If user not found, send error message
      if (!user) {
        return res.status(404).send({ message: "Usuario no registrado" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {expiresIn: "10m",});
  
      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_APP_EMAIL,
        },
      });
  
      // Email configuration
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reiniciar contraseña",
        html: `<h1>Reinicia la contraseña</h1>
      <p>Haz click en el siguiente enlace para reiniciar la contraseña:</p>
      <a href="${process.env.ORIGIN}/reset-password/${token}">${process.env.ORIGIN}/reset-password/${token}</a>
      <p>El enlace es válido durante 10 minutos.</p>
      <p>Si no has pedido reiniciar la contraseña, por favor ignora este email.</p>`,
      };//!FALTA MODIFICAR EL URL DEL LINK QUE MANDAMOS
  
      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email enviado" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

const resetPassword = async (req, res) => {
    try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
        req.params.token,
        process.env.TOKEN_SECRET
      );
  
      // If the token is invalid, return an error
      if (!decodedToken) {
        return res.status(401).send({ message: "Token no válido" });
      }
  
      // find the user with the id from the token
      const user = await User.findOne({ _id: decodedToken.userId });
      if (!user) {
        return res.status(401).send({ message: "usuario no encontrado" });
      }
      
      // Hash the new password
      const salt = await bcrypt.genSalt(12);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
  
      // Update user's password, clear reset token and expiration time
      user.password = req.body.newPassword;
      await user.save();
  
      // Send success response
      res.status(200).send({ message: "Contraseña actualizada" });
    } catch (err) {
      // Send error response if any error occurs
      res.status(500).send({ message: err.message });
    }
  };

  module.exports = {
    forgetPassword,
    resetPassword
  }