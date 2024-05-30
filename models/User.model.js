const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Campo Email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Campo Password es obligatorio.']
    },
    username: {
      type: String,
      required: [true, 'Campo Username es obligatorio.'],
      unique: true
    },
    role: {
      type: String,
      enum: ['paciente','nutri','admin'],
      lowercase: true,
      default: "paciente"
    },
    imageUrl: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
