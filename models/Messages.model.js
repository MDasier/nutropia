const { Schema, model } = require("mongoose");

const mensajeSchema = new Schema(
  {
    emisor: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    receptor: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    text: {
      type: String
    },
    leido: {
      type: Boolean,
      default:false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Mensajes = model("Messages", mensajeSchema);

module.exports = Mensajes;